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
	fromEmail := os.Getenv("FROM_EMAIL")

	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)

	es, err := persistence.New(user, pass, nodes, "viruskoll", log)
	sg := sendgrid.NewSendClient(sendgridAPIKey)
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
	users.Setup(api, services.NewUserService(es, services.NewEmailService(sg, fromEmail, log)))
	log.Infof("Server started on port %s", port)
	log.Fatal(api.ListenAndServe(fmt.Sprintf(":%s", port)))
}

func serveStatic(api *rest.API) {
	indexHandler := func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		file, err := ioutil.ReadFile("web/public/index.html")
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}
		w.Write(file)
	}

	for _, r := range []string{"/", "/about"} {
		api.Router.GET(r, indexHandler)
	}

	api.Router.ServeFiles("/build/*filepath", http.Dir("web/public/build/"))
	api.Router.GlobalOPTIONS = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Access-Control-Request-Method") != "" {
			// Set CORS headers
			header := w.Header()
			header.Set("Access-Control-Allow-Methods", r.Header.Get("Allow"))
			header.Set("Access-Control-Allow-Origin", "*")
		}

		// Adjust status code to 204
		w.WriteHeader(http.StatusNoContent)
	})
}
