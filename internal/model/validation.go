package model

import (
	"fmt"
	"time"

	"github.com/go-playground/validator"
)

// HEALTHY is the constant for healthySymptom
const HEALTHY = "healthy"

var validSymptoms = []string{
	"fever",
	"coff",
	"cold",
	"sneezing",
	"sore-throat",
	"muscle-aches",
	"other",
	HEALTHY,
}

var validDailySituations = []string{
	"as-usual",
	"home-protecting-others",
	"home-protecting-oneself",
	"home-caring-others",
	"home-exempted",
	"home-fired",
}

var validWorkSituations = []string{
	"at-work",
	"work-from-home",
	"home-no-work",
	"child-care",
}

// PrepareUserForGet cleans up the model and prepares it for external use
func (user *User) PrepareUserForGet() {
	user.Email = ""
}

// PrepareUserForCreation validates the model
func (user *User) PrepareUserForCreation() error {
	validate := validator.New()
	err := validate.Struct(user)

	if err != nil {
		return err
	}

	if user.Locations == nil {
		user.Locations = make([]*Location, 0)
	}

	user.EmailVerified = false

	return nil
}

// func verifyEmail(email string) (*regexp.Regexp, error) {
// 	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

// 	if isEmail := re.MatchString(email); !isEmail {
// 		return nil, fmt.Errorf("Emailadress not valid")
// 	}

// 	return re, nil
// }
func filter(ss []string, test func(string) bool) (ret []string) {
	for _, s := range ss {
		if test(s) {
			ret = append(ret, s)
		}
	}
	return
}

// PrepareLog prepares the log for save
func (logg *Logg) PrepareLog() error {
	validate := validator.New()

	err := validate.Struct(logg)
	if err != nil {
		return err
	}

	if logg.Symptoms == nil {
		logg.Symptoms = []string{}
	}

	logg.Symptoms = filter(logg.Symptoms, func(symptom string) bool {
		for _, validSymptom := range validSymptoms {
			if validSymptom == symptom {
				return true
			}
		}
		return false
	})

	isValidWorkSituation := false
	for _, v := range validWorkSituations {
		if v == logg.WorkSituation {
			isValidWorkSituation = true
			break
		}
	}

	isValidDailySituation := false
	for _, v := range validDailySituations {
		if v == logg.DailySituation {
			isValidDailySituation = true
			break
		}
	}

	if !isValidDailySituation && !isValidWorkSituation {
		return fmt.Errorf("Invalid daily situation")
	}

	if len(logg.Symptoms) == 0 {
		return fmt.Errorf("No symptoms")
	}

	if logg.User == nil {
		return fmt.Errorf("No user provided")
	}

	logg.CreatedAt = time.Now().UTC().Format("20060102T150405Z")

	return nil
}
