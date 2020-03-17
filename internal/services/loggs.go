package services

import (
	"context"
	"encoding/json"
	"time"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// LoggsService ...
type LoggsService struct {
	es  *persistence.Es
	typ string
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

	orgModel.ID = orgID
	logg.Organization = orgModel
	logg.CreatedAt = time.Now().UTC().Format(time.RFC3339)

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
