package services_test

import (
	"testing"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/stretchr/testify/assert"
)

func TestCanLoadGeoJsonFile(t *testing.T) {
	col, err := services.LoadGeoJSONFile("../../geojson/sweden-county-test.json")
	assert.NoError(t, err)
	assert.GreaterOrEqual(t, len(col.Features), 1)
}

func TestCanGetIdForPrecision(t *testing.T) {
	var precisionFileMap = map[int][]string{
		10: []string{"../../geojson/sweden-county-test.json"},
	}
	g := services.NewGeoJson(precisionFileMap)
	id := g.GetFeatureIdsFor(10, &model.GeoLocation{
		Latitude:  57.656908,
		Longitude: 12.021749,
	})

	assert.NotEqual(t, "", id)
}

func TestCanFindNearestFeature(t *testing.T) {
	var precisionFileMap = map[int][]string{
		10: []string{"../../geojson/sweden-county-test.json"},
	}
	g := services.NewGeoJson(precisionFileMap)
	id := g.GetFeatureIdsFor(10, &model.GeoLocation{
		//somewhere in skagerak
		Latitude:  57.914412,
		Longitude: 9.628522,
	})

	assert.Equal(t, "14", id)
}
