package locations

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
	"github.com/sirupsen/logrus"
)

type locations struct {
	api *martini.ClassicMartini
}

// Setup ...
func Setup(api *martini.ClassicMartini) {

	api.Get("/api/locations/:id", get)
	api.Post("/api/locations/:id", post)
	api.Put("/api/locations/:id", put)
	api.Delete("/api/locations/:id", delete)
}

func get(r render.Render, log *logrus.Logger, es *persistence.Es) {
	log.Debug("Test")
	r.JSON(200, map[string]interface{}{
		"test": "test",
	})
}

func post(r render.Render) {
}

func put(r render.Render) {
}

func delete(r render.Render) {
}
