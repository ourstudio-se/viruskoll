package logging

import "github.com/ourstudio-se/viruskoll/internal/model"

// swagger:response IDResponse
type IDResponse struct {
	ID string `json:"id"`
}

// swagger:response loggsResponse
type loggsResponse struct {
	model.Logg
}

// swagger:response emptyResponse
type empty struct{}
