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
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/sirupsen/logrus"
)

func main() {
	_ = godotenv.Load()

	nodes := os.Getenv("ELASTIC_NODES")
	user := os.Getenv("ELASTIC_USER")
	pass := os.Getenv("ELASTIC_PASSWORD")
	port := os.Getenv("PORT")

	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)

	es, err := persistence.New(user, pass, nodes, "viruskoll", log)

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

	log.Infof("Server started on port %s", port)
	log.Fatal(api.ListenAndServe(fmt.Sprintf(":%s", port)))
}

func serveStatic(api *rest.API) {
	api.Router.GET("/", func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		file, err := ioutil.ReadFile("web/public/index.html")
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		w.Write(file)
	})

	api.Router.ServeFiles("/build/*filepath", http.Dir("web/public/build/"))
}
