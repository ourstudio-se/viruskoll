package services

import (
	"context"
	"encoding/json"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// OrganizationService ...
type OrganizationService struct {
	es *persistence.Es
}

// NewOrganizationService ...
func NewOrganizationService(es *persistence.Es) *OrganizationService {
	return &OrganizationService{
		es: es,
	}
}

// Create a new organization
func (rp *OrganizationService) Create(ctx context.Context, org *model.Organization) (string, error) {
	id, err := rp.es.Add(ctx, org)
	if err != nil {
		return "", err
	}

	return id, nil
}

// Get an organization
func (rp *OrganizationService) Get(ctx context.Context, ID string) (*model.Organization, error) {
	org, err := rp.es.Get(ctx, ID)
	if err != nil {
		return nil, err
	}

	var model model.Organization

	err = json.Unmarshal(org, &model)
	if err != nil {
		return nil, err
	}

	return &model, nil
}

// Update organization
func (rp *OrganizationService) Update(ctx context.Context, ID string, m *model.Organization) error {
	err := rp.es.Update(ctx, ID, m)

	if err != nil {
		return err
	}

	return nil
}
