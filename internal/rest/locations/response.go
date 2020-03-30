package locations

import "github.com/paulmach/orb/geojson"

// swagger:response GetFeaturesResponse
type GetFeaturesResponse struct {
	Features *geojson.FeatureCollection `json:"featuers"`
}
