package organizations

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

// Setup ...
func Setup(api *martini.ClassicMartini) {
	api.Get("/api/organizations/:id", get)
	api.Post("/api/organizations/:id", post)
	api.Put("/api/organizations/:id", put)
	api.Delete("/api/organizations/:id", delete)
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
