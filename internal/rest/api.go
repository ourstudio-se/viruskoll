package rest

import "github.com/go-martini/martini"

// API ...
type API struct {
	m *martini.ClassicMartini
}

// New ...
func New() *API {
	api := &API{
		m: martini.Classic(),
	}

	SetupLocations(api)
	return api
}

func (api *API) RunOnAddr(addr string) {
	api.m.RunOnAddr(addr)
}
