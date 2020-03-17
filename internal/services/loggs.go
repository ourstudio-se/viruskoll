package services

import (
	"context"
	"encoding/json"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// LoggsService ...
type LoggsService struct {
	es *persistence.Es
}

// NewLoggsService ...
func NewLoggsService(es *persistence.Es) *LoggsService {
	return &LoggsService{
		es: es,
	}
}

// Create a new log
func (ls *LoggsService) Create(ctx context.Context, orgID string, logg *model.Logg) (string, error) {

	org, err := ls.es.Get(ctx, orgID)
	if err != nil {
		return "", err
	}
	var orgModel model.Organization

	err = json.Unmarshal(org, &orgModel)
	if err != nil {
		return "", err
	}
	logg.Organization = orgModel

	if logg.Symptoms == nil {
		logg.Symptoms = make([]model.Symptom, 0)
	}

	id, err := ls.es.Add(ctx, logg)

	if err != nil {
		return "", err
	}

	return id, nil
}

// Update logg
func (ls *LoggsService) Update(ctx context.Context, ID string, log *model.Logg) error {
	err := ls.es.Update(ctx, ID, log)

	if err != nil {
		return err
	}

	return nil
}
