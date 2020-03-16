package locations

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

// Setup ...
func Setup(api *martini.ClassicMartini) {
	api.Get("/api/locations/:id", get)
	api.Post("/api/locations/:id", post)
	api.Put("/api/locations/:id", put)
	api.Delete("/api/locations/:id", delete)
}

func get(r render.Render) {
	r.JSON(200, nil)
}

func post(r render.Render) {
}

func put(r render.Render) {
}

func delete(r render.Render) {
}
