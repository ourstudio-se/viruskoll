package services

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/mmcloughlin/geohash"
	"github.com/olivere/elastic/v7"
	"github.com/sirupsen/logrus"
	log "vcs-git.ourstudio.dev/vcs-libraries/sdk-go-logging"

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

		symptomsAgg := elastic.NewTermsAggregation().Field("symptoms.keyword").Size(10)
		workSituationsAgg := elastic.NewTermsAggregation().Field("workSituation.keyword").Size(10)
		geohashAgg := elastic.NewGeoHashGridAggregation().Precision("100m").Field("locations.geolocation").SubAggregation("symptoms", symptomsAgg).SubAggregation("worksituations", workSituationsAgg)

		return s.Query(boolQuery).Aggregation("geoHash", geohashAgg).Aggregation("symptomsAgg", symptomsAgg).Aggregation("workingSituationsAgg", workSituationsAgg)
	})

	if err != nil {
		return nil, err
	}

	geohashAgg, found := result.Aggregations.Terms("geoHash")
	if !found {
		return nil, fmt.Errorf("geoAgg not found")
	}

	results := &model.LogSearchResults{
		Count:          result.TotalHits(),
		GeoLocations:   []*model.GeoAggBucket{},
		Healthy:        []*model.SymptomBucket{},
		Unhealthy:      []*model.SymptomBucket{},
		WorkSituations: []*model.SymptomBucket{},
	}

	if results.Count <= minHits {
		return results, nil
	}

	symptomsAgg, found := result.Aggregations.Terms("symptomsAgg")
	if found {
		for _, bucket := range symptomsAgg.Buckets {
			if bucket.Key.(string) == model.HEALTHY {
				results.Healthy = append(results.Healthy, &model.SymptomBucket{
					Count:   bucket.DocCount,
					Symptom: bucket.Key.(string),
				})
			} else {
				results.Unhealthy = append(results.Unhealthy, &model.SymptomBucket{
					Count:   bucket.DocCount,
					Symptom: bucket.Key.(string),
				})
			}
		}
	}
	workSituationsAgg, found := result.Aggregations.Terms("workingSituationsAgg")
	if found {
		for _, bucket := range workSituationsAgg.Buckets {
			results.WorkSituations = append(results.WorkSituations, &model.SymptomBucket{
				Count:   bucket.DocCount,
				Symptom: bucket.Key.(string),
			})
		}
	}
	log.Debugf("bucketslength %d", len(geohashAgg.Buckets))
	log.Debugf("First hash %s", geohashAgg.Buckets[0].Key.(string))

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
				Healthy: &model.SymptomsAgg{
					Buckets: []*model.SymptomBucket{},
					Count:   0,
				},
				Unhealthy: &model.SymptomsAgg{
					Buckets: []*model.SymptomBucket{},
					Count:   0,
				},
				WorkSituation: &model.SymptomsAgg{
					Buckets: []*model.SymptomBucket{},
					Count:   0,
				},
			}
		}

		m := reduced[id]

		symptomsAgg, found := bucket.Aggregations.Terms("symptoms")
		if found {
			for _, bucket := range symptomsAgg.Buckets {
				if bucket.Key.(string) == model.HEALTHY {
					m.Healthy.Buckets = append(m.Healthy.Buckets, &model.SymptomBucket{
						Count:   bucket.DocCount,
						Symptom: model.HEALTHY,
					})
				} else {
					m.Unhealthy.Buckets = append(m.Unhealthy.Buckets, &model.SymptomBucket{
						Count:   bucket.DocCount,
						Symptom: bucket.Key.(string),
					})
				}
			}
		}
		workSituationsAgg, found := bucket.Aggregations.Terms("worksituations")
		if found {
			for _, bucket := range workSituationsAgg.Buckets {
				m.WorkSituation.Buckets = append(m.WorkSituation.Buckets, &model.SymptomBucket{
					Count:   bucket.DocCount,
					Symptom: bucket.Key.(string),
				})
			}
		}

	}

	for _, v := range reduced {

		v.Healthy = reduceAgg(v.Healthy)
		v.Unhealthy = reduceAgg(v.Unhealthy)
		v.WorkSituation = reduceAgg(v.WorkSituation)

		v.Count = v.Healthy.Count + v.Unhealthy.Count + v.WorkSituation.Count
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
