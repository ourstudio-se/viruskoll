package services

import (
	"context"
	"encoding/json"
	"fmt"

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

		featureAgg := elastic.NewTermsAggregation().Field("features.id.keyword").Size(1000)

		healthySymptomsAgg := elastic.NewTermsAggregation().Include(model.HEALTHY).Field("symptoms.keyword").Size(10)
		unhealthySymptomsAgg := elastic.NewTermsAggregation().Exclude(model.HEALTHY).Field("symptoms.keyword").Size(10)
		dailySituationsAgg := elastic.NewTermsAggregation().Field("dailySituation.keyword").Size(20)

		precisionAgg := elastic.NewTermsAggregation().Field("features.precision").Size(10).
			SubAggregation("featureAgg", featureAgg.
				SubAggregation("healthySymptomsAgg", healthySymptomsAgg).
				SubAggregation("unhealthySymptomsAgg", unhealthySymptomsAgg).
				SubAggregation("dailySituationsAgg", dailySituationsAgg))

		return s.Query(boolQuery).Aggregation("precisionAgg", precisionAgg).
			Aggregation("healthySymptomsAgg", healthySymptomsAgg).
			Aggregation("unhealthySymptomsAgg", unhealthySymptomsAgg).
			Aggregation("dailySituationsAgg", dailySituationsAgg)
	})

	if err != nil {
		return nil, err
	}

	precisionAgg, found := result.Aggregations.Terms("precisionAgg")
	if !found {
		return nil, fmt.Errorf("precisionAgg not found")
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
	results.Unhealthy.Count = results.Count - results.Healthy.Count
	for _, bucket := range precisionAgg.Buckets {

		key := bucket.Key.(float64)
		if key != float64(precision) {
			continue
		}

		idbuckets, found := bucket.Aggregations.Terms("featureAgg")
		if !found {
			continue
		}

		for _, idbucket := range idbuckets.Buckets {
			model := &model.GeoAggBucket{
				ID:    idbucket.Key.(string),
				Count: idbucket.DocCount,
				Symptoms: model.Symptoms{
					DailySituations: &model.SymptomsAgg{
						Buckets: []*model.SymptomBucket{},
					},
					Healthy: &model.SymptomsAgg{
						Buckets: []*model.SymptomBucket{},
					},
					Unhealthy: &model.SymptomsAgg{
						Buckets: []*model.SymptomBucket{},
					},
				},
			}
			model.Symptoms.SetupSymptomsByAgg(&idbucket.Aggregations)
			model.Unhealthy.Count = model.Count - model.Healthy.Count
			results.GeoLocations = append(results.GeoLocations, model)
		}

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

	logg.Features = ls.gs.GetAllFeaturesFor(logg.Locations...)

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

func (ls *LogsService) Reindex(ctx context.Context) error {
	ls.log.Info("starting reindexing ...")
	results, err := ls.freshEs.Search(ctx, func(ss *elastic.SearchService) *elastic.SearchService {
		ss.Size(10000)
		return ss
	})

	if err != nil {
		return err
	}

	for _, hit := range results.Hits.Hits {
		var m model.Logg
		err := json.Unmarshal(hit.Source, &m)
		if err != nil {
			ls.log.Errorf("ereror reindexing %v", err)
		}

		m.Features = ls.gs.GetAllFeaturesFor(m.Locations...)
		err = ls.freshEs.Update(ctx, hit.Id, m)
		if err != nil {
			ls.log.Errorf("Error updating doc with id %v, error: %v", hit.Id, err)
		}
	}
	ls.log.Info("Reindexing done")
	return nil
}
