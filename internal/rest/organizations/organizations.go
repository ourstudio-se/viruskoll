package organizations

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/julienschmidt/httprouter"
	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/services"
)

const timeout = 15 * time.Second

type organizationAPI struct {
	os  *services.OrganizationService
	api *rest.API
}

// Setup ...
func Setup(api *rest.API, os *services.OrganizationService) {
	orgApi := organizationAPI{
		os:  os,
		api: api,
	}
	api.Router.GET("/api/organizations/:id", orgApi.get)
	api.Router.POST("/api/organizations", orgApi.post)
	api.Router.PUT("/api/organizations/:id", orgApi.put)
	api.Router.POST("/api/organizations/:id/verifyemail", orgApi.verifyemail)
}

// swagger:route GET /organizations/{id} public getOrganization
// Gets an organization
// responses:
//   200: organizationResponse

// ...
// swagger:response organizationResponse
func (orgAPI *organizationAPI) get(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	// swagger:parameters getOrganization
	type getOrganization struct {
		// in: path
		ID string `json:"id"`
	}
	org, err := orgAPI.os.Get(ctx, ps.ByName("id"))
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	orgAPI.api.WriteJSONResponse(w, http.StatusOK, org)
}

// swagger:route POST /organizations public createOrganizationParams
// Creates a new organization
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func (orgAPI *organizationAPI) post(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters createOrganizationParams
	type createParams struct {
		// in: body
		Organization *model.Organization
	}
	var org model.Organization
	err := json.NewDecoder(r.Body).Decode(&org)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err = orgAPI.os.Create(ctx, &org)
	if err != nil {
		orgAPI.api.Log.Errorf("Error while creating entity %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

// swagger:route PUT /organizations/{id} public updateOrganizationParams
// Updates an exsting organization
// responses:
//   202: emptyResponse
// .
// swagger:response emptyResponse
func (orgAPI *organizationAPI) put(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
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
	err := json.NewDecoder(r.Body).Decode(&org)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = orgAPI.os.Update(ctx, ps.ByName("id"), &org)

	if err != nil {
		orgAPI.api.Log.Errorf("Failed to update org, %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}

// swagger:route POST /organizations/{id}/verifyemail public verifyOrgParams
// Verify user email
// responses:
//   200: emailOrgVerifiedResponse

// ...
// swagger:response emailOrgVerifiedResponse
func (orgAPI *organizationAPI) verifyemail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	// swagger:parameters verifyOrgParams
	type verifyOrgParams struct {
		// in: path
		ID string `json:"id"`
	}

	id := ps.ByName("id")

	_, err := orgAPI.os.Get(ctx, id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err = orgAPI.os.VerifyEmail(ctx, id)

	if err != nil {
		orgAPI.api.Log.Errorf("Could not verify email %v", err)
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	// swagger:response emailOrgVerifiedResponse
	type emailOrgVerifiedResponse struct {
		Verified bool `json:"verified"`
	}

	orgAPI.api.WriteJSONResponse(w, http.StatusOK, emailOrgVerifiedResponse{
		Verified: true,
	})
}
