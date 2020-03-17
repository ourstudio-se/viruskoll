package loggs

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
	api.Get("/api/organizations/:oid/loggs", get)
	api.Post("/api/organizations/:oid/loggs", post)
	api.Put("/api/organizations/:oid/loggs/:lid", put)
}
func get(r render.Render, ls *services.LoggsService, params martini.Params, logger *logrus.Logger) {
}
func post(r render.Render, req *http.Request, ls *services.LoggsService, params martini.Params, logger *logrus.Logger) {
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

func put(r render.Render, req *http.Request, ls *services.LoggsService, params martini.Params, logger *logrus.Logger) {
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
