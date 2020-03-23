package model_test

import (
	"testing"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestWillSetUserEmailVerifiedFalse(t *testing.T) {
	user := model.User{
		Email:         "test@exmaple.com",
		EmailVerified: true,
	}

	user.PrepareUserForCreation()

	assert.Equal(t, false, user.EmailVerified)
}

func TestWillNotDiscloseUserEmailWhenGetting(t *testing.T) {
	user := model.User{
		Email:         "test@exmaple.com",
		EmailVerified: true,
	}

	user.PrepareUserForGet()

	assert.Equal(t, "", user.Email)
}

func TestWillNotDiscloseUserOrgEmailWhenGetting(t *testing.T) {
	user := model.User{
		Email:         "test@exmaple.com",
		EmailVerified: true,
		Organizations: []*model.Organization{
			&model.Organization{
				AdminEmail: "admin@example.com",
			},
		},
	}

	user.PrepareUserForGet()

	assert.Equal(t, "", user.Organizations[0].AdminEmail)
}

func TestWillNotDiscloseOrgEmailWhenGetting(t *testing.T) {
	org := model.Organization{
		AdminEmail: "test@example.com",
	}

	org.PrepareOrgForGet()

	assert.Equal(t, "", org.AdminEmail)
}

func TestWillSetOrgEmailVerifiedFalse(t *testing.T) {
	org := model.Organization{
		AdminEmail:    "test@exmaple.com",
		EmailVerified: true,
	}

	org.PrepareForCreation()

	assert.Equal(t, false, org.EmailVerified)
}

func TestWillRaiseErrorWhenEmailInvalidForUser(t *testing.T) {
	usr := model.User{
		Email: "invalid@@example.com",
	}

	assert.Error(t, usr.PrepareUserForCreation())
}

func TestWillRaiseErrorWhenEmailInvalidForOrg(t *testing.T) {
	org := model.Organization{
		AdminEmail: "invalid@@example.com",
	}

	assert.Error(t, org.PrepareForCreation())
}

func TestWillNotRaiseErrorWhenLogIsOk(t *testing.T) {
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever"},
		User: &model.User{
			Email: "test@example.com",
		},
	}

	assert.NoError(t, log.PrepareLog())
}

func TestWillRaiseErrorWhenLogHasInvalidWorkSituation(t *testing.T) {
	log := model.Logg{
		WorkSituation: "whatever",
		Symptoms:      []string{"fever"},
		User: &model.User{
			Email: "test@example.com",
		},
	}

	assert.Error(t, log.PrepareLog())
}

func TestWillFilterOutInvalidSymptoms(t *testing.T) {
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever", "invalid"},
		User: &model.User{
			Email: "test@example.com",
		},
	}

	log.PrepareLog()

	assert.Equal(t, []string{"fever"}, log.Symptoms)
}

func TestWillNotSaveUserEmail(t *testing.T) {
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever", "invalid"},
		User: &model.User{
			Email: "test@example.com",
		},
	}

	log.PrepareLog()

	assert.Equal(t, "", log.User.Email)
}

func TestWillNotSaveOrgOnUser(t *testing.T) {
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever", "invalid"},
		User: &model.User{
			Email: "test@example.com",
			Organizations: []*model.Organization{
				&model.Organization{
					AdminEmail: "admin@example.com",
				},
			},
		},
	}

	log.PrepareLog()

	assert.Nil(t, log.User.Organizations)
}

func TestWillSaveOrgFromUser(t *testing.T) {
	orgs := []*model.Organization{
		&model.Organization{
			AdminEmail: "admin@example.com",
		},
	}
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever", "invalid"},
		User: &model.User{
			Email:         "test@example.com",
			Organizations: orgs,
		},
	}

	log.PrepareLog()

	assert.Equal(t, orgs, log.Organizations)
}

func TestWillSaveOrgFromUserWithoutAdminEmail(t *testing.T) {
	orgs := []*model.Organization{
		&model.Organization{
			AdminEmail: "admin@example.com",
		},
	}
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever", "invalid"},
		User: &model.User{
			Email:         "test@example.com",
			Organizations: orgs,
		},
	}

	log.PrepareLog()

	assert.Equal(t, "", log.Organizations[0].AdminEmail)
}
