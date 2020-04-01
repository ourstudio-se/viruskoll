package services

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/olivere/elastic/v7"
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

// Create a new user
func (us *UserService) Create(ctx context.Context, user *model.User) (string, error) {
	email := user.Email
	err := user.PrepareUserForCreation()

	if err != nil {
		return "", err
	}

	id, err := us.es.Add(ctx, user)
	if err != nil {
		return "", err
	}

	user.ID = id

	err = us.emails.UserPending(ctx, email, id)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (us *UserService) findUserByMail(ctx context.Context, email string) (*model.User, error) {
	serachResult, err := us.es.Search(ctx, func(ss *elastic.SearchService) *elastic.SearchService {
		return ss.Query(elastic.NewTermQuery("email.keyword", email))
	})

	if err != nil {
		return nil, err
	}

	if serachResult.TotalHits() > 0 {
		hits := serachResult.Hits.Hits
		id := hits[0].Id
		user, err := us.es.Get(ctx, id)
		if err != nil {
			return nil, err
		}

		var uModel model.User

		err = json.Unmarshal(user, &uModel)
		uModel.ID = id
		return &uModel, err
	}
	return nil, fmt.Errorf("NOT_FOUND")
}

// Get user
func (us *UserService) Get(ctx context.Context, ID string) (*model.User, error) {
	user, err := us.es.Get(ctx, ID)
	if err != nil {
		return nil, err
	}

	var model model.User

	err = json.Unmarshal(user, &model)
	if err != nil {
		return nil, err
	}

	model.PrepareUserForGet()

	return &model, nil
}

// Update user
func (us *UserService) Update(ctx context.Context, ID string, m *model.User) error {
	err := us.es.Update(ctx, ID, m)

	if err != nil {
		return err
	}

	return nil
}

// VerifyEmail moves the user to a verified user state
func (us *UserService) VerifyEmail(ctx context.Context, ID string) error {

	user, err := us.es.Get(ctx, ID)
	var model model.User

	err = json.Unmarshal(user, &model)
	if err != nil {
		return err
	}

	if err != nil {
		return err
	}

	err = us.emails.UserSubscribed(ctx, ID, model.Email)
	if err != nil {
		return err
	}

	model.EmailVerified = true
	return us.es.Update(ctx, ID, model)
}
