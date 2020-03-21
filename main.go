package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/rest/logging"
	"github.com/ourstudio-se/viruskoll/internal/rest/organizations"
	"github.com/ourstudio-se/viruskoll/internal/rest/users"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sirupsen/logrus"
)

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
	orgPendingListID := os.Getenv("SENDGRID_ORG_PENDING_LIST")
	orgListID := os.Getenv("SENDGRID_ORG_LIST")

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
	ems := services.NewEmailService(sg, sendgridAPIKey, userPendingListID, userListID, orgListID, orgPendingListID, log)

	router := httprouter.New()
	api := rest.NewAPI(router, log)
	serveStatic(api)
	organizations.Setup(api, services.NewOrganizationService(es, ems))
	logging.Setup(api, services.NewlogsService(es, esFresh, log))
	users.Setup(api, services.NewUserService(es, ems))

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

	for _, r := range []string{"/", "/about", "/gdpr", "/join", "/organization/*id", "/user/*id"} {
		api.Router.GET(r, indexFileHandler.handler)
	}

	api.Router.GET("/swagger", swaggerFileHandler.handler)

	api.Router.ServeFiles("/build/*filepath", http.Dir("web/public/build/"))
}
