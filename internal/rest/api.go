package rest

import (
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
)

// API ...
type API struct {
	m *martini.ClassicMartini
}

// New ...
func New() *API {
	api := &API{
		m: martini.Classic(),
	}
	api.m.Get("/", func(r render.Render) {
		r.JSON(200, map[string]interface{}{
			"status": "ok",
		})
	})
	SetupLocations(api)
	return api
}

func (api *API) RunOnAddr(addr string) {
	api.m.RunOnAddr(addr)
}
