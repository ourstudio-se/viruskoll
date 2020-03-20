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

// Create a new organization
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

// CreateWithOrg ..
func (us *UserService) CreateWithOrg(ctx context.Context, user *model.User, orgid string) (string, error) {
	email := user.Email

	org, err := us.es.Get(ctx, orgid)

	if err != nil {
		return "", err
	}

	var orgModel model.Organization

	err = json.Unmarshal(org, &orgModel)

	if err != nil {
		return "", err
	}

	if !orgModel.EmailVerified {
		return "", fmt.Errorf("NOT_VERIFIED")
	}

	orgModel.ID = orgid

	existingUser, _ := us.findUserByMail(ctx, email)

	//the has not registered (or is not found in sendgrid atleast)
	if existingUser == nil {
		err = user.PrepareUserForCreation()

		user.Organizations = []*model.Organization{
			&orgModel,
		}

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

	//Guard against nil organizations
	if existingUser.Organizations == nil {
		existingUser.Organizations = []*model.Organization{}
	}

	for _, org := range existingUser.Organizations {
		if org.ID != orgid {
			user.Organizations = append(user.Organizations, org)
		}
	}

	user.Organizations = append(user.Organizations, &orgModel)

	return existingUser.ID, us.es.Update(ctx, existingUser.ID, user)
}

// Get an organization
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

// Update organization
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
