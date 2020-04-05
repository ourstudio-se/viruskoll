package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/rest/locations"
	"github.com/ourstudio-se/viruskoll/internal/rest/logging"
	"github.com/ourstudio-se/viruskoll/internal/rest/users"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sirupsen/logrus"
)

var precisionFileMap = map[int][]string{
	6:  []string{"geojson/sweden-county.json"},
	22: []string{"geojson/sweden-municipality.json"},
}

func main() {
	_ = godotenv.Load()

	nodes := os.Getenv("ELASTIC_NODES")
	user := os.Getenv("ELASTIC_USER")
	pass := os.Getenv("ELASTIC_PASSWORD")
	port := os.Getenv("PORT")
	storageIndex := os.Getenv("ELASTIC_STORAGE_INDEX")
	logIndex := os.Getenv("ELASTIC_LOG_INDEX")

	sendgridAPIKey := os.Getenv("SENDGRID_API_KEY")
	userPendingListID := os.Getenv("SENDGRID_USER_PENDING_LIST")
	userListID := os.Getenv("SENDGRID_USER_LIST")

	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)

	es, err := persistence.New(user, pass, nodes, storageIndex, log)
	if err != nil {
		log.Fatalf("Could not init elastic %v", err)
		panic(err)
	}

	esFresh, err := persistence.New(user, pass, nodes, logIndex, log)
	if err != nil {
		log.Fatalf("Could not init elastic %v", err)
		panic(err)
	}

	sg := sendgrid.NewSendClient(sendgridAPIKey)
	ems := services.NewEmailService(sg, sendgridAPIKey, userPendingListID, userListID, log)
	gs := services.NewGeoJson(precisionFileMap)
	logService := services.NewlogsService(es, esFresh, log, gs)
	if os.Getenv("REINDEX") != "" {
		ctx, cancel := context.WithTimeout(context.Background(), time.Minute*5)
		defer cancel()
		logService.Reindex(ctx)
	}
	router := httprouter.New()
	api := rest.NewAPI(router, log)
	serveStatic(api)
	logging.Setup(api, logService)
	users.Setup(api, services.NewUserService(es, ems))

	locations.Setup(api, gs)

	log.Infof("Server started on port %s", port)
	log.Fatal(api.ListenAndServe(fmt.Sprintf(":%s", port)))
}

type staticFileHandler struct {
	filePath string
}

func (sfh *staticFileHandler) handler(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	file, err := ioutil.ReadFile(sfh.filePath)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	w.Write(file)
}

func serveStatic(api *rest.API) {

	indexFileHandler := &staticFileHandler{
		filePath: "web/public/index.html",
	}

	swaggerFileHandler := &staticFileHandler{
		filePath: "web/public/swagger.html",
	}

	for _, r := range []string{"/", "/about", "/gdpr", "/join", "/user/*id"} {
		api.Router.GET(r, indexFileHandler.handler)
	}

	var dir string

	flag.StringVar(&dir, "dir", "./web/public/build/", "")
	flag.Parse()
	api.Router.GET("/swagger", swaggerFileHandler.handler)

	fileServer := http.FileServer(FileSystem{http.Dir(dir)})
	api.Router.Handler("GET", "/build/*filepath", http.StripPrefix(strings.TrimRight("/build/", "/"), fileServer))
}

// FileSystem custom file system handler
type FileSystem struct {
	fs http.FileSystem
}

// Open opens file
func (fs FileSystem) Open(path string) (http.File, error) {
	f, err := fs.fs.Open(path)
	if err != nil {
		return nil, err
	}

	s, err := f.Stat()
	if s.IsDir() {
		index := strings.TrimSuffix(path, "/") + "/index.html"
		if _, err := fs.fs.Open(index); err != nil {
			return nil, err
		}
	}

	return f, nil
}
