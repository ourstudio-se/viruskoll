package services_test

import (
	"testing"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/stretchr/testify/assert"
)

const testJson = "../../geojson/sweden-county.json"

func Test_Can_Load_Geo_Json_File(t *testing.T) {
	col, err := services.LoadGeoJSONFile(testJson)
	assert.NoError(t, err)
	assert.GreaterOrEqual(t, len(col.Features), 1)
}

func Test_Can_Get_Id_For_Precision(t *testing.T) {
	var precisionFileMap = map[int][]string{
		10: []string{"../../geojson/sweden-county.json"},
		11: []string{"../../geojson/sweden-municipality.json"},
	}
	g := services.NewGeoJson(precisionFileMap)
	precision, ids := g.GetFeatureIdsFor(5, &model.GeoLocation{
		Latitude:  57.656908,
		Longitude: 12.021749,
	})

	assert.NotEmpty(t, ids)
}
