package rest

import "github.com/martini-contrib/render"

// SetupLocations ...
func SetupLocations(api *API) {
	api.m.Use(render.Renderer(render.Options{
		Charset: "UTF-8",
	}))

}
