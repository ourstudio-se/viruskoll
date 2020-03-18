package main

import (
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/julienschmidt/httprouter"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/rest/organizations"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/sirupsen/logrus"
)

func main() {
	_ = godotenv.Load()

	nodes := os.Getenv("ELASTIC_NODES")
	user := os.Getenv("ELASTIC_USER")
	pass := os.Getenv("ELASTIC_PASSWORD")

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
	os := services.NewOrganizationService(es)

	organizations.Setup(api, os)

	log.Fatal(http.ListenAndServe(":80", api.Router))
}

func serveStatic(api *rest.API) {
	api.Router.ServeFiles("/*", http.Dir("web/public"))
}

func serveSwagger(api *rest.API) {
	api.Router.ServeFiles("/swagger/swagger.json", http.Dir("swagger/swagger"))
}
