package rest

import "github.com/martini-contrib/render"

// SetupLocations ...
func SetupLocations(api *API) {
	api.m.Use(render.Renderer(render.Options{
		Charset: "UTF-8",
	}))
	api.m.Get("/api/locations", get)
}

func get(r render.Render) {
	mockLocation := Location{
		Green:     10,
		Yellow:    5,
		Red:       2,
		Latitude:  50.2,
		Longitude: 21.5,
		Radius:    10,
	}
	data := Locations{
		All: []Location{mockLocation},
	}
	r.JSON(200, data)
}
