package logging

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

type logsAPI struct {
	ls  *services.LogsService
	api *rest.API
	gs  *services.GeoJsonService
}

// Setup ...
func Setup(api *rest.API, logsService *services.LogsService) {
	logsAPI := logsAPI{
		ls:  logsService,
		api: api,
	}
	api.Router.POST("/api/logs/search", logsAPI.postSearch)
	api.Router.POST("/api/users/:id/logs", logsAPI.postForUser)
}

// swagger:route POST /logs/search public latLonBounds
// Searches for logs
// responses:
//   200: symptomsAggResponse

// ...
// swagger:response symptomsAggResponse
func (logsApi *logsAPI) postSearch(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters latLonBounds
	type latLonBounds struct {
		// in: body
		Body *RequestBody `json:"requestBody"`
	}

	var bounds RequestBody
	err := json.NewDecoder(r.Body).Decode(&bounds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	result, err := logsApi.ls.GetAggregatedSymptoms(ctx, bounds.Precision, bounds.Sw, bounds.Ne)

	if err != nil {
		logsApi.api.Log.Errorf("Error while agg %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	logsApi.api.WriteJSONResponse(w, http.StatusOK, result)
}

// swagger:route POST /users/{id}/logs public createlogsParams
// Creates a new log
// responses:
//   201: emptyResponse
// ...
// swagger:response emptyResponse
func (logsApi *logsAPI) postForUser(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// swagger:parameters createlogsParams
	type createParams struct {
		// in: path
		ID string `json:"id"`
		// in: body
		Logg *model.Logg `json:"logg"`
	}
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	uid := ps.ByName("id")
	var logg model.Logg
	err := json.NewDecoder(r.Body).Decode(&logg)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err = logsApi.ls.CreateForUser(ctx, uid, &logg)
	if err != nil {
		logsApi.api.Log.Errorf("Error while creating log %v", err)

		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}
