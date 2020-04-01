package services

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/mmcloughlin/geohash"
	"github.com/olivere/elastic/v7"
	"github.com/sirupsen/logrus"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

const minHits = 3

// LogsService ...
type LogsService struct {
	es      *persistence.Es
	freshEs *persistence.Es
	typ     string
	log     *logrus.Logger
	gs      *GeoJsonService
}

// NewlogsService ...
func NewlogsService(es *persistence.Es, freshEs *persistence.Es, logger *logrus.Logger, gs *GeoJsonService) *LogsService {
	return &LogsService{
		es:      es,
		freshEs: freshEs,
		log:     logger,
		gs:      gs,
	}
}

// GetAggregatedSymptoms ...
func (ls *LogsService) GetAggregatedSymptoms(ctx context.Context, precision int, sw model.GeoLocation, ne model.GeoLocation) (*model.LogSearchResults, error) {
	result, err := ls.freshEs.Search(ctx, func(s *elastic.SearchService) *elastic.SearchService {
		boundsQuery := elastic.NewGeoBoundingBoxQuery("locations.geolocation").BottomLeftFromGeoPoint(&elastic.GeoPoint{
			Lat: sw.Latitude,
			Lon: sw.Longitude,
		}).TopRightFromGeoPoint(&elastic.GeoPoint{
			Lat: ne.Latitude,
			Lon: ne.Longitude,
		})

		boolQuery := elastic.NewBoolQuery().Must(
			boundsQuery,
			elastic.NewRangeQuery("createdat").Gte("now-2d/d"),
		)

		healthySymptomsAgg := elastic.NewTermsAggregation().Include(model.HEALTHY).Field("symptoms.keyword").Size(10)
		unhealthySymptomsAgg := elastic.NewTermsAggregation().Exclude(model.HEALTHY).Field("symptoms.keyword").Size(10)
		dailySituationsAgg := elastic.NewTermsAggregation().Field("dailySituation.keyword").Size(10)
		workSituationsAgg := elastic.NewTermsAggregation().Field("workSituation.keyword").Size(10)

		geohashAgg := elastic.NewGeoHashGridAggregation().Precision("100m").Field("locations.geolocation").
			SubAggregation("healthySymptomsAgg", healthySymptomsAgg).
			SubAggregation("unhealthySymptomsAgg", unhealthySymptomsAgg).
			SubAggregation("dailysituations", dailySituationsAgg).
			SubAggregation("workSituationsAgg", workSituationsAgg)

		return s.Query(boolQuery).Aggregation("geoHash", geohashAgg).
			Aggregation("healthySymptomsAgg", healthySymptomsAgg).
			Aggregation("unhealthySymptomsAgg", unhealthySymptomsAgg).
			Aggregation("dailySituationsAgg", dailySituationsAgg).
			Aggregation("workSituationsAgg", workSituationsAgg)
	})

	if err != nil {
		return nil, err
	}

	geohashAgg, found := result.Aggregations.Terms("geoHash")
	if !found {
		return nil, fmt.Errorf("geoAgg not found")
	}

	results := &model.LogSearchResults{
		Count:        result.TotalHits(),
		GeoLocations: []*model.GeoAggBucket{},
		Symptoms: model.Symptoms{
			DailySituations: &model.SymptomsAgg{},
			Healthy:         &model.SymptomsAgg{},
			Unhealthy:       &model.SymptomsAgg{},
		},
	}

	if results.Count <= minHits {
		return results, nil
	}

	results.Symptoms.SetupSymptomsByAgg(&result.Aggregations)

	reduced := map[string]*model.GeoAggBucket{}

	for _, bucket := range geohashAgg.Buckets {
		lat, lng := geohash.Decode(bucket.Key.(string))

		id := ls.gs.GetFeatureIdsFor(precision, &model.GeoLocation{
			Latitude:  lat,
			Longitude: lng,
		})

		if _, ok := reduced[id]; !ok {
			reduced[id] = &model.GeoAggBucket{
				ID:    id,
				Count: 0,
				Symptoms: model.Symptoms{
					DailySituations: &model.SymptomsAgg{},
					Healthy:         &model.SymptomsAgg{},
					Unhealthy:       &model.SymptomsAgg{},
				},
			}
		}

		m := reduced[id]
		m.Count += bucket.DocCount
		m.Symptoms.SetupSymptomsByAgg(&bucket.Aggregations)
	}

	for _, v := range reduced {

		v.Healthy = reduceAgg(v.Healthy)
		v.Unhealthy = reduceAgg(v.Unhealthy)
		v.DailySituations = reduceAgg(v.DailySituations)
		results.GeoLocations = append(results.GeoLocations, v)
	}

	return results, nil
}

func reduceAgg(arr *model.SymptomsAgg) *model.SymptomsAgg {
	reducer := map[string]*model.SymptomBucket{}

	for _, elm := range arr.Buckets {
		if _, ok := reducer[elm.Symptom.(string)]; !ok {
			reducer[elm.Symptom.(string)] = &model.SymptomBucket{
				Count:   0,
				Symptom: elm.Symptom,
			}
		}
		v := reducer[elm.Symptom.(string)]
		v.Count += elm.Count
	}

	newArr := &model.SymptomsAgg{
		Count:   0,
		Buckets: []*model.SymptomBucket{},
	}

	for _, v := range reducer {
		newArr.Count += v.Count
		newArr.Buckets = append(newArr.Buckets, v)
	}

	return newArr
}

// CreateForUser a new log
func (ls *LogsService) CreateForUser(ctx context.Context, uID string, logg *model.Logg) (string, error) {
	user, err := ls.es.Get(ctx, uID)
	if err != nil {
		return "", fmt.Errorf("User not found")
	}

	var userModel model.User

	err = json.Unmarshal(user, &userModel)
	if err != nil {
		return "", err
	}

	if !userModel.EmailVerified {
		return "", fmt.Errorf("EMAIL_NOT_VERIFIED")
	}

	logg.User = &model.LogUser{
		Locations: userModel.Locations,
	}
	logg.User.ID = uID
	logg.Locations = append([]*model.Location{}, userModel.Locations...)

	err = logg.PrepareLog()

	if err != nil {
		return "", err
	}

	err = ls.freshEs.Update(ctx, uID, logg)
	err = ls.es.Update(ctx, uID, logg)

	if err != nil {
		return "", err
	}

	return uID, nil
}

// Update logg
func (ls *LogsService) Update(ctx context.Context, ID string, log *model.Logg) error {
	err := ls.es.Update(ctx, ID, log)

	if err != nil {
		return err
	}

	return nil
}
