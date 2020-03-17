package rest

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/ourstudio-se/viruskoll/internal/rest/locations"
	"github.com/ourstudio-se/viruskoll/internal/rest/loggs"
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

	api.m.Get("/", func(r render.Render) {
		r.JSON(200, map[string]interface{}{
			"status": "ok",
		})
	})
	for _, dep := range deps {
		api.m.Map(dep)
	}

	organizations.Setup(api.m)
	locations.Setup(api.m)
	loggs.Setup(api.m)
	return api
}

func (api *API) RunOnAddr(addr string) {
	api.m.RunOnAddr(addr)
}
