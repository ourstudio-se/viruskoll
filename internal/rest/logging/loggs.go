package logging

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"
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
	api.Get("/api/loggs/:precision", get)
	api.Post("/api/organizations/:oid/loggs", post)
	api.Put("/api/organizations/:oid/loggs/:lid", put)
}

// swagger:route POST /organizations/{oid}/loggs public createLoggsParams
func get(r render.Render, ls *services.LoggsService, params martini.Params, logger *logrus.Logger) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	precision, err := strconv.Atoi(params["precision"])

	if err != nil {
		logger.Errorf("Error while parsing precision %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	result, err := ls.GetAggregatedLogs(ctx, precision)
	if err != nil {
		logger.Errorf("Error while agg %v", err)
		r.Status(http.StatusBadRequest)
		return
	}

	r.JSON(http.StatusOK, result)
}

// swagger:route POST /organizations/{oid}/loggs public createLoggsParams
// Creates a new organization
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func post(r render.Render, req *http.Request, ls *services.LoggsService, params martini.Params, logger *logrus.Logger) {
	// swagger:parameters createLoggsParams
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

// swagger:route PUT /organizations/{oid}/loggs/{lid} public updateLoggsParams
// Creates a new organization
// responses:
//   200: emptyResponse

// ...
// swagger:response emptyResponse
func put(r render.Render, req *http.Request, ls *services.LoggsService, params martini.Params, logger *logrus.Logger) {
	// swagger:parameters updateLoggsParams
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
