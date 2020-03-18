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

// GetAggregatedLogs ...
func (ls *LogsService) GetAggregatedLogs(ctx context.Context, sw model.GeoLocation, ne model.GeoLocation, precision int) (*model.GeoAgg, error) {
	geoHashName := "geohash"
	result, err := ls.es.Search(ctx, func(s *elastic.SearchService) *elastic.SearchService {
		// ToDo: filter on sw ,ne

		return s.Aggregation(geoHashName, elastic.NewGeoHashGridAggregation().Field("location.geolocation").Precision(precision))
	})
	if err != nil {
		return nil, err
	}

	agg, ok := result.Aggregations.GeoHash(geoHashName)
	if !ok {
		return nil, fmt.Errorf("agg not ok")
	}

	buckets := agg.Buckets
	geoagg := &model.GeoAgg{
		Buckets: []model.GeoAggBucket{},
	}
	for _, bucket := range buckets {
		geoagg.Buckets = append(geoagg.Buckets, model.GeoAggBucket{
			Key:      bucket.Key,
			DocCount: bucket.DocCount,
		})
	}

	return geoagg, nil
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