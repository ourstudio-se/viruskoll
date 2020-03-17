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
	api.Post("/api/organizations/:id/loggs")
	api.Put("/api/organizations/:id/loggs/:id")

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

func post(r render.Render, req *http.Request, os *services.OrganizationService, log *logrus.Logger) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	var org model.Organization
	err := json.NewDecoder(req.Body).Decode(&org)
	if err != nil {
		r.Status(http.StatusBadRequest)
		return
	}

	if org.Locations == nil {
		org.Locations = make([]model.Location, 0)
	}

	id, err := os.Create(ctx, &org)
	if err != nil {
		log.Errorf("Error while creating entity %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	r.JSON(http.StatusCreated, map[string]string{
		"id": id,
	})
}

func put(r render.Render, req *http.Request, params martini.Params, os *services.OrganizationService, log *logrus.Logger) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	var org model.Organization
	err := json.NewDecoder(req.Body).Decode(&org)

	if err != nil {
		r.Status(http.StatusBadRequest)
		return
	}

	err = os.Update(ctx, params["id"], &org)

	if err != nil {
		log.Errorf("Failed to update org, %v", err)
		r.Error(http.StatusBadRequest)
		return
	}

	r.Status(http.StatusAccepted)
}

func delete(r render.Render) {
}
