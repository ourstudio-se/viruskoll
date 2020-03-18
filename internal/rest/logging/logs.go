package logging

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
	api.Post("/api/logs/search", postSearch)
	api.Post("/api/organizations/:oid/logs", post)
	api.Put("/api/organizations/:oid/logs/:lid", put)
}

// swagger:route POST /logs/search public latLonBounds
// Searches for logs rthatss
// responses:
//   200: geoAggResponse

// ...
// swagger:response geoAggResponse
func postSearch(r render.Render, req *http.Request, ls *services.LogsService, logger *logrus.Logger) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters latLonBounds
	type latLonBounds struct {
		// in: body
		Precision int `json:"precision"`
		// in: body
		Sw model.GeoLocation `json:"sw"`
		// in: body
		Ne model.GeoLocation `json:"new"`
	}

	var bounds latLonBounds
	err := json.NewDecoder(req.Body).Decode(&bounds)
	if err != nil {
		r.Status(http.StatusBadRequest)
		return
	}

	result, err := ls.GetAggregatedLogs(ctx, bounds.Sw, bounds.Ne, bounds.Precision)
	if err != nil {
		logger.Errorf("Error while agg %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	r.JSON(http.StatusOK, result)
}

// swagger:route POST /organizations/{oid}/logs public createlogsParams
// Creates a new organization
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func post(r render.Render, req *http.Request, ls *services.LogsService, params martini.Params, logger *logrus.Logger) {
	// swagger:parameters createlogsParams
	type createParams struct {
		// in: path
		ID string `json:"oid"`
		// in: body
		Logg *model.Logg `json:"logg"`
	}
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	oid := params["oid"]
	var logg model.Logg
	err := json.NewDecoder(req.Body).Decode(&logg)
	if err != nil {
		r.Status(http.StatusBadRequest)
		return
	}

	id, err := ls.Create(ctx, oid, &logg)
	if err != nil {
		logger.Errorf("Error while creating log %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	r.JSON(http.StatusOK, map[string]string{
		"id": id,
	})
}

// swagger:route PUT /organizations/{oid}/logs/{lid} public updatelogsParams
// Creates a new organization
// responses:
//   200: emptyResponse

// ...
// swagger:response emptyResponse
func put(r render.Render, req *http.Request, ls *services.LogsService, params martini.Params, logger *logrus.Logger) {
	// swagger:parameters updatelogsParams
	type createParams struct {
		// in: path
		ID string `json:"oid"`
		// in: path
		LID string `json:"lid"`
		// in: body
		Logg *model.Logg `json:"logg"`
	}
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	var logg model.Logg

	err := json.NewDecoder(req.Body).Decode(&logg)
	if err != nil {
		logger.Errorf("Error while deserializing model %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	err = ls.Update(ctx, params["lid"], &logg)
	if err != nil {
		logger.Errorf("Error while updating model %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	r.Status(http.StatusAccepted)
}
