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

// swagger:route GET /organizations/{id} public organizationGetEndpoint
// Gets an organization
// responses:
//   200: organizationResponse

// ...
// swagger:response organizationResponse
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

// swagger:route POST /organizations public createOrganizationParams
// Creates a new organization
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func post(r render.Render, req *http.Request, os *services.OrganizationService, log *logrus.Logger) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	// swagger:parameters createOrganizationParams
	type createParams struct {
		// in: body
		Organization *model.Organization `json:"organization"`
	}
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

// swagger:route PUT /organizations/{id} public updateOrganizationParams
// Updates an exsting organization
// responses:
//   202: emptyResponse
// .
// swagger:response emptyResponse
func put(r render.Render, req *http.Request, params martini.Params, os *services.OrganizationService, log *logrus.Logger) {
	// swagger:parameters updateOrganizationParams
	type updateParams struct {
		// in: path
		ID string `json:"id"`
		// in: body
		Organization *model.Organization `json:"organization"`
	}

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
