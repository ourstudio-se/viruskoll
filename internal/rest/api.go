package rest

import (
	"encoding/json"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/sirupsen/logrus"
)

// API def
type API struct {
	Router *httprouter.Router
	Log    *logrus.Logger
}

// NewAPI ...
func NewAPI(router *httprouter.Router, logger *logrus.Logger) *API {
	return &API{
		Log:    logger,
		Router: router,
	}
}

// WriteJSONResponse to response writer
func (*API) WriteJSONResponse(w http.ResponseWriter, status int, response interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		panic(err)
	}
}
