package locations

import (
	"net/http"
	"strconv"
	"time"

	"github.com/julienschmidt/httprouter"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/services"
)

const timeout = 15 * time.Second

type geojsonAPI struct {
	gs  *services.GeoJsonService
	api *rest.API
}

// Setup ...
func Setup(api *rest.API, gs *services.GeoJsonService) {
	logsAPI := geojsonAPI{
		gs:  gs,
		api: api,
	}
	api.Router.GET("/api/geojsons/:precision", logsAPI.Get)
}

func (gapi *geojsonAPI) Get(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	type geojsonGetRequest struct {
		Precision int `json:"precision"`
	}
	precision, err := strconv.Atoi(ps.ByName("precision"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	features := gapi.gs.GetGeoJsonByPrecision(precision)

	gapi.api.WriteJSONResponse(w, http.StatusOK, GetFeaturesResponse{Features: features})
}
