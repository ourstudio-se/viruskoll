package logging

import "github.com/ourstudio-se/viruskoll/internal/model"

// IDResponse only contains an id
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

// RequestBody with geo bounds
type RequestBody struct {
	Precision int               `json:"precision"`
	Sw        model.GeoLocation `json:"sw"`
	Ne        model.GeoLocation `json:"ne"`
}
