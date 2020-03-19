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
	sendgridAPIKey := os.Getenv("SENDGRID_API_KEY")
	listID := os.Getenv("SEND_GRID_LIST_ID")

	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)

	es, err := persistence.New(user, pass, nodes, "viruskoll", log)
	sg := sendgrid.NewSendClient(sendgridAPIKey)
	ems := services.NewEmailService(sg, sendgridAPIKey, listID, log)
	if err != nil {
		log.Fatalf("Could not init elastic %v", err)
		panic(err)
	}

	// ls := services.NewlogsService(es)
	router := httprouter.New()
	api := rest.NewAPI(router, log)
	serveStatic(api)
	organizations.Setup(api, services.NewOrganizationService(es))
	logging.Setup(api, services.NewlogsService(es))
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

	for _, r := range []string{"/", "/about", "/join"} {
		api.Router.GET(r, indexFileHandler.handler)
	}

	api.Router.GET("/swagger", swaggerFileHandler.handler)

	api.Router.ServeFiles("/build/*filepath", http.Dir("web/public/build/"))
}
