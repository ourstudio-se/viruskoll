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
func (orgs *OrganizationService) Create(ctx context.Context, org *model.Organization) (string, error) {
	email := org.AdminEmail

	err := org.PrepareForCreation()

	if err != nil {
		return "", err
	}

	id, err := orgs.es.Add(ctx, org)

	if err != nil {
		return "", err
	}

	orgs.ems.OrganizationPending(ctx, email, id)

	return id, nil
}

// Get an organization
func (orgs *OrganizationService) Get(ctx context.Context, ID string) (*model.Organization, error) {
	org, err := orgs.es.Get(ctx, ID)
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
func (orgs *OrganizationService) Update(ctx context.Context, ID string, m *model.Organization) error {
	err := orgs.es.Update(ctx, ID, m)

	if err != nil {
		return err
	}

	return nil
}

// VerifyEmail ...
func (orgs *OrganizationService) VerifyEmail(ctx context.Context, ID string) error {

	org, err := orgs.es.Get(ctx, ID)
	if err != nil {
		return err
	}

	var om model.Organization

	err = json.Unmarshal(org, &om)
	if err != nil {
		return err
	}
	err = orgs.ems.OrganizationSubscribed(ctx, ID, om.AdminEmail)

	if err != nil {
		return err
	}

	om.EmailVerified = true
	return orgs.es.Update(ctx, ID, om)
}
