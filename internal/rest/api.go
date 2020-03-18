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

// ListenAndServe always returns a non-nil error.
func (api *API) ListenAndServe(addr string) error {
	m := NewMiddleware(api.Router, api.Log, "Log requests")

	return http.ListenAndServe(addr, m)
}

// The type of our middleware consists of the original handler we want to wrap and a message
type Middleware struct {
	next    http.Handler
	message string
	log     *logrus.Logger
}

// Make a constructor for our middleware type since its fields are not exported (in lowercase)
func NewMiddleware(next http.Handler, logger *logrus.Logger, message string) *Middleware {
	return &Middleware{next: next, message: message, log: logger}
}

// Our middleware handler
func (m *Middleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// We can modify the request here; for simplicity, we will just log a message
	m.log.Debugf("msg: %s, Method: %s, URI: %s\n", m.message, r.Method, r.RequestURI)
	m.next.ServeHTTP(w, r)
	// We can modify the response here
}

// WriteJSONResponse to response writer
func (*API) WriteJSONResponse(w http.ResponseWriter, status int, response interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		panic(err)
	}
}
