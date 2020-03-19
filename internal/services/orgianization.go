package services

import (
	"context"
	"encoding/json"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// OrganizationService ...
type OrganizationService struct {
	es  *persistence.Es
	ems *EmailService
}

// NewOrganizationService ...
func NewOrganizationService(es *persistence.Es, ems *EmailService) *OrganizationService {
	return &OrganizationService{
		es:  es,
		ems: ems,
	}
}

// Create a new organization
func (rp *OrganizationService) Create(ctx context.Context, org *model.Organization) (string, error) {
	email := org.AdminEmail

	err := org.PrepareForCreation()
	if err != nil {
		return "", err
	}
	id, err := rp.es.Add(ctx, org)

	if err != nil {
		return "", err
	}

	rp.ems.OrganizationPending(ctx, email, id)

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

// VerifyEmail ...
func (rp *OrganizationService) VerifyEmail(ctx context.Context, ID string) error {

	org, err := rp.es.Get(ctx, ID)
	if err != nil {
		return err
	}
	var m model.Organization

	err = json.Unmarshal(org, &m)
	if err != nil {
		return err
	}
	err = rp.ems.OrganizationSubscribed(ctx, ID, m.AdminEmail)

	if err != nil {
		return err
	}

	m.EmailVerified = true
	return rp.es.Update(ctx, ID, m)
}
