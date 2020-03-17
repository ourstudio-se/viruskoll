package rest

// Package api doc.
//
// Documentation of our awesome API.
//
//     Schemes: http
//     BasePath: /api
//     Version: 1.0.0
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Security:
//     - basic
//
//    SecurityDefinitions:
//    basic:
//      type: basic
//
// swagger:meta
import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/ourstudio-se/viruskoll/internal/rest/locations"
	"github.com/ourstudio-se/viruskoll/internal/rest/logging"
	"github.com/ourstudio-se/viruskoll/internal/rest/organizations"
)

// API ...
type API struct {
	m *martini.ClassicMartini
}

// New ...
func New(deps ...interface{}) *API {
	api := &API{
		m: martini.Classic(),
	}
	api.m.Use(render.Renderer(render.Options{
		Charset: "UTF-8",
	}))

	// api.m.Get("/", func(r render.Render) {
	// 	r.JSON(200, map[string]interface{}{
	// 		"status": "ok",
	// 	})
	// })

	for _, dep := range deps {
		api.m.Map(dep)
	}

	organizations.Setup(api.m)
	locations.Setup(api.m)
	logging.Setup(api.m)
	return api
}

//Use ...
func (api *API) Use(handler martini.Handler) {
	api.m.Use(handler)
}

//RunOnAddr ...
func (api *API) RunOnAddr(addr string) {
	api.m.RunOnAddr(addr)
}
