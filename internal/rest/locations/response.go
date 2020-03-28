package locations

import "github.com/paulmach/orb/geojson"

type GetFeaturesResponse struct {
	Features *geojson.FeatureCollection `json:"featuers"`
}
