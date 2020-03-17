package organizations

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/sirupsen/logrus"
)

const timeout = 15 * time.Second

// Setup ...
func Setup(api *martini.ClassicMartini) {
	api.Get("/api/organizations/:id", get)
	api.Post("/api/organizations", post)
	api.Put("/api/organizations/:id", put)
	api.Delete("/api/organizations/:id", delete)
}

func get(r render.Render, o *services.OrganizationService, params martini.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	org, err := o.Get(ctx, params["id"])
	if err != nil {
		r.Status(http.StatusNotFound)
		return
	}

	r.JSON(200, org)
}

func post(r render.Render, req *http.Request, o *services.OrganizationService, log *logrus.Logger) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	var org model.Organization
	err := json.NewDecoder(req.Body).Decode(&org)
	if err != nil {
		r.Status(http.StatusBadRequest)
		return
	}

	id, err := o.Create(ctx, &org)
	if err != nil {
		log.Errorf("Error while creating entity %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	r.JSON(http.StatusCreated, map[string]string{
		"id": id,
	})
}

func put(r render.Render) {
}

func delete(r render.Render) {
}
