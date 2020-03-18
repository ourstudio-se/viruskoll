package logging

import "github.com/ourstudio-se/viruskoll/internal/model"

// swagger:response IDResponse
type IDResponse struct {
	ID string `json:"id"`
}

// swagger:response logsResponse
type logsResponse struct {
	model.Logg
}

// swagger:response emptyResponse
type empty struct{}

// swagger:response geoAggResponse
type geoAggResponse struct {
	model.GeoAgg
}

// swagger:response symptomsAggResponse
type symptomsAggResponse struct {
	*model.SymptomsAgg
}

type RequestBody struct {
	Sw model.GeoLocation `json:"sw"`
	Ne model.GeoLocation `json:"ne"`
}
