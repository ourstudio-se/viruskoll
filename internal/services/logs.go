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
}

// NewlogsService ...
func NewlogsService(es *persistence.Es, freshEs *persistence.Es, logger *logrus.Logger) *LogsService {
	return &LogsService{
		es:      es,
		freshEs: freshEs,
		log:     logger,
	}
}

// GetAggregatedSymptoms ...
func (ls *LogsService) GetAggregatedSymptoms(ctx context.Context, orgID string, precision int, sw model.GeoLocation, ne model.GeoLocation) (*model.SymptomsAgg, error) {

	normalize := func(val, min, max int) int {
		val = val - min
		if val < min {
			return min
		}
		if val > max {
			return max
		}
		return val
	}

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

		if orgID != "" {
			ls.log.Debugf("orgid %s", orgID)
			orgQuery := elastic.NewTermQuery("organizations._id.keyword", orgID)
			boolQuery.Must(orgQuery)
		}

		precisionStr := normalize(precision, 4, 5)
		ls.log.Debugf("testing with precision %d from %d", precisionStr, precision)
		geohashAgg := elastic.NewGeoHashGridAggregation().Field("locations.geolocation").Precision(precisionStr)
		symptomsAgg := elastic.NewTermsAggregation().Field("symptoms.keyword").Size(10)
		workSituationsAgg := elastic.NewTermsAggregation().Field("workSituation.keyword").Size(10)

		return s.Query(boolQuery).Aggregation("symptoms", symptomsAgg).Aggregation("workSituations", workSituationsAgg).Aggregation("geoHash", geohashAgg)
	})

	if err != nil {
		return nil, err
	}

	symptomsAgg, found := result.Aggregations.Terms("symptoms")
	if !found {
		return nil, fmt.Errorf("Agg not found")
	}

	workSituationsAgg, found := result.Aggregations.Terms("workSituations")
	if !found {
		return nil, fmt.Errorf("Agg not found")
	}

	geohashAgg, found := result.Aggregations.Terms("geoHash")
	if !found {
		return nil, fmt.Errorf("geoAgg not found")
	}

	m := &model.SymptomsAgg{
		Count:          result.TotalHits(),
		Healthy:        []model.SymptomBucket{},
		Unhealthy:      []model.SymptomBucket{},
		WorkSituations: []model.SymptomBucket{},
		GeoLocations:   []model.GeoAggBucket{},
	}

	if m.Count <= minHits {
		return m, nil
	}

	for _, bucket := range symptomsAgg.Buckets {
		if bucket.Key.(string) == model.HEALTHY {
			m.Healthy = append(m.Healthy, model.SymptomBucket{
				Symptom: bucket.Key,
				Count:   bucket.DocCount,
			})
		} else {
			m.Unhealthy = append(m.Unhealthy, model.SymptomBucket{
				Symptom: bucket.Key,
				Count:   bucket.DocCount,
			})
		}
	}

	for _, bucket := range workSituationsAgg.Buckets {
		m.WorkSituations = append(m.WorkSituations, model.SymptomBucket{
			Symptom: bucket.Key,
			Count:   bucket.DocCount,
		})
	}
	log.Debugf("bucketslength %d", len(geohashAgg.Buckets))
	log.Debugf("First hash %s", geohashAgg.Buckets[0].Key.(string))
	for _, bucket := range geohashAgg.Buckets {
		// ls.log.Debugf("bucket %v", bucket.Key.(string))
		lat, lng := geohash.Decode(bucket.Key.(string))
		m.GeoLocations = append(m.GeoLocations, model.GeoAggBucket{
			GeoLocation: model.GeoLocation{
				Latitude:  lat,
				Longitude: lng,
			},
			DocCount: bucket.DocCount,
		})
	}

	return m, nil
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

	logg.User = userModel
	logg.User.ID = uID
	logg.Locations = append([]*model.Location{}, userModel.Locations...)

	for _, userOrg := range userModel.Organizations {
		logg.Locations = append([]*model.Location{}, userOrg.Locations...)
	}

	logg.Organizations = userModel.Organizations

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
