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

func TestWillRaiseErrorWhenEmailInvalidForUser(t *testing.T) {
	usr := model.User{
		Email: "invalid@@example.com",
	}

	assert.Error(t, usr.PrepareUserForCreation())
}

func TestWillNotRaiseErrorWhenLogIsOk(t *testing.T) {
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever"},
		User: &model.LogUser{
			ID: "sdasdsa",
		},
	}

	assert.NoError(t, log.PrepareLog())
}

func TestWillRaiseErrorWhenLogHasInvalidWorkSituation(t *testing.T) {
	log := model.Logg{
		WorkSituation: "whatever",
		Symptoms:      []string{"fever"},
		User: &model.LogUser{
			ID: "sddsads",
		},
	}

	assert.Error(t, log.PrepareLog())
}

func TestWillFilterOutInvalidSymptoms(t *testing.T) {
	log := model.Logg{
		WorkSituation: "at-work",
		Symptoms:      []string{"fever", "invalid"},
		User: &model.LogUser{
			ID: "sadasd",
		},
	}

	log.PrepareLog()

	assert.Equal(t, []string{"fever"}, log.Symptoms)
}

func TestUserLocationsCannotHaveMoreThan256Chars(t *testing.T) {
	m := model.User{
		Email:         "adasdsa@gmail.com",
		EmailVerified: true,
		Locations: []*model.Location{
			&model.Location{
				City: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1",
				Location: model.GeoLocation{
					Latitude:  23.21,
					Longitude: 12.32,
				},
			},
		},
	}

	err := m.PrepareUserForCreation()
	assert.Error(t, err)
}

func TestUserCanNotHave1000Locations(t *testing.T) {
	m := model.User{
		Email:     "admin@example.com",
		Locations: make([]*model.Location, 1000),
	}

	err := m.PrepareUserForCreation()
	assert.Error(t, err)
}

func TestLoggCanNotHave1001Locations(t *testing.T) {
	m := model.Logg{
		Locations: make([]*model.Location, 1001),
	}

	err := m.PrepareLog()
	assert.Error(t, err)
}

func TestLoggUserCanNotHave1001Locations(t *testing.T) {
	m := model.Logg{
		Locations: make([]*model.Location, 0),
		User: &model.LogUser{
			Locations: make([]*model.Location, 1000),
		},
	}

	err := m.PrepareLog()
	assert.Error(t, err)
}

func TestCanPrepareValidLogg(t *testing.T) {
	m := model.Logg{
		Locations: make([]*model.Location, 0),
		User: &model.LogUser{
			ID:        "et21321",
			Locations: []*model.Location{},
		},
		Symptoms: []string{
			"fever",
		},
		WorkSituation: "child-care",
	}

	err := m.PrepareLog()
	assert.NoError(t, err)
}

func TestWhenNoSymptomsItIsHealthy(t *testing.T) {
	m := model.Logg{
		Locations: make([]*model.Location, 0),
		User: &model.LogUser{
			ID:        "et21321",
			Locations: []*model.Location{},
		},
		Symptoms:      []string{},
		WorkSituation: "child-care",
	}

	err := m.PrepareLog()
	assert.NoError(t, err)

	assert.Equal(t, []string{model.HEALTHY}, m.Symptoms)
}
