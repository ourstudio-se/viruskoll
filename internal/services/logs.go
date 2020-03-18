package services

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/olivere/elastic/v7"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// LogsService ...
type LogsService struct {
	es  *persistence.Es
	typ string
}

// NewlogsService ...
func NewlogsService(es *persistence.Es) *LogsService {
	return &LogsService{
		es: es,
	}
}

// GetAggregatedSymptoms ...
func (ls *LogsService) GetAggregatedSymptoms(ctx context.Context, sw model.GeoLocation, ne model.GeoLocation) (*model.SymptomsAgg, error) {

	result, err := ls.es.Search(ctx, func(s *elastic.SearchService) *elastic.SearchService {
		query := elastic.NewGeoBoundingBoxQuery("location.geolocation").BottomLeftFromGeoPoint(&elastic.GeoPoint{
			Lat: sw.Latitude,
			Lon: sw.Longitude,
		}).TopRightFromGeoPoint(&elastic.GeoPoint{
			Lat: ne.Latitude,
			Lon: ne.Longitude,
		})
		agg := elastic.NewTermsAggregation().Field("symptoms.keyword").Size(10)

		return s.Query(query).Aggregation("symptoms", agg)
	})

	if err != nil {
		return nil, err
	}

	symptomsAgg, found := result.Aggregations.Terms("symptoms")
	if !found {
		return nil, fmt.Errorf("Agg not found")
	}

	m := &model.SymptomsAgg{
		Count:        result.TotalHits(),
		WithSymptoms: 100,
		Nosymptoms:   100,
		Symptoms:     []model.SymptomBucket{},
	}

	for _, bucket := range symptomsAgg.Buckets {
		m.Symptoms = append(m.Symptoms, model.SymptomBucket{
			Symptom: bucket.Key,
			Count:   bucket.DocCount,
		})
	}

	return m, nil
}

// Create a new log
func (ls *LogsService) Create(ctx context.Context, orgID string, logg *model.Logg) (string, error) {

	org, err := ls.es.Get(ctx, orgID)
	if err != nil {
		return "", err
	}
	var orgModel model.Organization

	err = json.Unmarshal(org, &orgModel)
	if err != nil {
		return "", err
	}

	orgModel.ID = orgID
	logg.Organization = orgModel
	logg.CreatedAt = time.Now().UTC().Format(time.RFC3339)

	if logg.Symptoms == nil {
		logg.Symptoms = []string{}
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
