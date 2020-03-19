package services

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/mmcloughlin/geohash"
	"github.com/olivere/elastic/v7"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// LogsService ...
type LogsService struct {
	es      *persistence.Es
	freshEs *persistence.Es
	typ     string
}

// NewlogsService ...
func NewlogsService(es *persistence.Es, freshEs *persistence.Es) *LogsService {
	return &LogsService{
		es:      es,
		freshEs: freshEs,
	}
}

const HEALTHY = "healthy"

// GetAggregatedSymptoms ...
func (ls *LogsService) GetAggregatedSymptoms(ctx context.Context, orgId string, sw model.GeoLocation, ne model.GeoLocation) (*model.SymptomsAgg, error) {

	result, err := ls.freshEs.Search(ctx, func(s *elastic.SearchService) *elastic.SearchService {
		boundsQuery := elastic.NewGeoBoundingBoxQuery("location.geolocation").BottomLeftFromGeoPoint(&elastic.GeoPoint{
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

		if orgId != "" {
			orgQuery := elastic.NewTermQuery("organization._id", orgId)
			boolQuery.Must(orgQuery)
		}

		geohashAgg := elastic.NewGeoHashGridAggregation().Field("location.geolocation").Precision("1km")
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

	for _, bucket := range symptomsAgg.Buckets {
		if bucket.Key.(string) == HEALTHY {
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

	for _, bucket := range geohashAgg.Buckets {
		lat, lng := geohash.DecodeCenter(bucket.Key.(string))
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

// CreateForOrg a new log
func (ls *LogsService) CreateForOrg(ctx context.Context, orgID string, logg *model.Logg) (string, error) {

	org, err := ls.es.Get(ctx, orgID)
	if err != nil {
		return "", fmt.Errorf("Organization not found")
	}

	user, err := ls.es.Get(ctx, logg.User.ID)
	if err != nil {
		return "", fmt.Errorf("User not found")
	}

	var orgModel model.Organization

	err = json.Unmarshal(org, &orgModel)
	if err != nil {
		return "", err
	}

	var userModel model.User

	err = json.Unmarshal(user, &userModel)
	if err != nil {
		return "", err
	}
	orgModel.ID = orgID
	logg.User = userModel
	logg.Organization = orgModel

	err = logg.PrepareLog()

	if err != nil {
		return "", err
	}

	id, err := ls.es.Add(ctx, logg)

	if err != nil {
		return "", err
	}

	err = ls.freshEs.Update(ctx, logg.User.ID, logg)

	if err != nil {
		return "", err
	}

	return id, nil
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

	logg.User = userModel
	logg.User.ID = uID
	logg.ID = uID
	err = logg.PrepareLog()

	if err != nil {
		return "", err
	}

	id, err := ls.es.Add(ctx, logg)

	if err != nil {
		return "", err
	}

	return id, nil
}

// Update logg
func (ls *LogsService) Update(ctx context.Context, ID string, log *model.Logg) error {
	err := ls.es.Update(ctx, ID, log)

	if err != nil {
		return err
	}

	return nil
}

func filter(ss []string, test func(string) bool) (ret []string) {
	for _, s := range ss {
		if test(s) {
			ret = append(ret, s)
		}
	}
	return
}

func validateModel(logg *model.Logg) bool {
	if logg.Symptoms == nil {
		logg.Symptoms = []string{}
	}

	logg.Symptoms = filter(logg.Symptoms, func(symptom string) bool {
		for _, validSymptom := range model.ValidSymptoms {
			if validSymptom == symptom {
				return true
			}
		}
		return false
	})

	isValidWorkSituation := false
	for _, v := range model.ValidWorkSituations {
		if v == logg.WorkSituation {
			isValidWorkSituation = true
			break
		}
	}
	if !isValidWorkSituation {
		return false
	}
	logg.User.Email = ""
	logg.CreatedAt = time.Now().UTC().Format(time.RFC3339)
	return true
}
