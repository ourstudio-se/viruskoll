package services

import (
	"context"
	"encoding/json"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
)

// UserService ...
type UserService struct {
	es     *persistence.Es
	emails *EmailService
}

// NewUserService ...
func NewUserService(es *persistence.Es, emails *EmailService) *UserService {
	return &UserService{
		es:     es,
		emails: emails,
	}
}

// Create a new organization
func (rp *UserService) Create(ctx context.Context, user *model.User) (string, error) {
	id, err := rp.es.Add(ctx, user)
	if err != nil {
		return "", err
	}

	err = rp.emails.SendRegistrationEmail(user)
	if err != nil {
		return "", err
	}
	return id, nil
}

// Get an organization
func (rp *UserService) Get(ctx context.Context, ID string) (*model.User, error) {
	org, err := rp.es.Get(ctx, ID)
	if err != nil {
		return nil, err
	}

	var model model.User

	err = json.Unmarshal(org, &model)
	if err != nil {
		return nil, err
	}

	return &model, nil
}

// Update organization
func (rp *UserService) Update(ctx context.Context, ID string, m *model.User) error {
	err := rp.es.Update(ctx, ID, m)

	if err != nil {
		return err
	}

	return nil
}
