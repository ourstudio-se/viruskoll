package services

import (
	"io/ioutil"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/paulmach/orb"
	"github.com/paulmach/orb/geojson"
	"github.com/paulmach/orb/planar"
)

type GeoJsonService struct {
	datas map[int][]*geojson.FeatureCollection
}

func NewGeoJson(mappings map[int][]string) *GeoJsonService {
	service := &GeoJsonService{
		datas: make(map[int][]*geojson.FeatureCollection),
	}
	for precision, fileNames := range mappings {
		for _, fileName := range fileNames {
			data, err := LoadGeoJSONFile(fileName)
			if err != nil {
				continue
			}
			service.datas[precision] = append(service.datas[precision], data)
		}
	}

	return service
}

func LoadGeoJSONFile(fileName string) (*geojson.FeatureCollection, error) {
	file, err := ioutil.ReadFile(fileName)
	if err != nil {
		return nil, err
	}
	return geojson.UnmarshalFeatureCollection(file)
}

func (g *GeoJsonService) GetGeoJsonByPrecision(currentPrecision int) *geojson.FeatureCollection {

	collection := geojson.NewFeatureCollection()

	if data, ok := g.datas[currentPrecision]; ok {
		for _, fc := range data {
			for _, f := range fc.Features {
				collection.Append(f)
			}
		}
	}

	return collection
}

func (g *GeoJsonService) GetAllFeaturesFor(points ...*model.Location) []*model.Feature {

	results := []*model.Feature{}

	precisionFeatures := make(map[int]map[string]*model.Feature)

	for p := range g.datas {
		for _, point := range points {
			feature := &model.Feature{
				Precision: p,
				Id: g.GetFeatureIdsFor(p, &model.GeoLocation{
					Latitude:  point.Location.Latitude,
					Longitude: point.Location.Longitude,
				}),
			}

			_, ok := precisionFeatures[feature.Precision]
			if !ok {
				precisionFeatures[feature.Precision] = make(map[string]*model.Feature)
			}

			_, ok = precisionFeatures[feature.Precision][feature.Id]
			if !ok {
				precisionFeatures[feature.Precision][feature.Id] = feature
			}
		}
	}

	for _, features := range precisionFeatures {
		for _, feature := range features {
			results = append(results, feature)
		}
	}

	return results
}

func (g *GeoJsonService) GetFeatureIdsFor(precision int, point *model.GeoLocation) string {
	featureCollections := g.GetGeoJsonByPrecision(precision)
	if len(featureCollections.Features) == 0 {
		return ""
	}

	p := orb.Point{
		point.Longitude,
		point.Latitude,
	}
	for _, feature := range featureCollections.Features {
		inside := featureContains(feature, p)
		if inside {
			return feature.ID.(string)
		}
	}
	minDist := float64(1000000)
	var minDistFeature *geojson.Feature
	for _, feature := range featureCollections.Features {
		dist := planar.Distance(feature.Point(), p)
		if dist < minDist {
			minDist = dist
			minDistFeature = feature
		}
	}
	return minDistFeature.ID.(string)
}

func featureContains(feature *geojson.Feature, point orb.Point) bool {
	// Try on a MultiPolygon to begin
	multiPoly, isMulti := feature.Geometry.(orb.MultiPolygon)
	if isMulti {
		if planar.MultiPolygonContains(multiPoly, point) {
			return true
		}
	} else {
		// Fallback to Polygon
		polygon, isPoly := feature.Geometry.(orb.Polygon)
		if isPoly {
			if planar.PolygonContains(polygon, point) {
				return true
			}
		}
	}
	return false
}
