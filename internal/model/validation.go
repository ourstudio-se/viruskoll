package model

import (
	"fmt"
	"regexp"
	"time"
)

// HEALTHY is the constant for healthySymptom
const HEALTHY = "healthy"

var validSymptoms = []string{"fever", "coff", "cold", HEALTHY}
var validWorkSituations = []string{"at-work", "work-from-home", "home-no-work", "child-care"}

// PrepareUserForGet cleans up the model and prepares it for external use
func (user *User) PrepareUserForGet() {
	user.Email = ""
	orgs := user.Organizations
	if user.Organizations != nil {
		for _, o := range orgs {
			o.AdminEmail = ""
		}
	}
	user.Organizations = orgs
}

// PrepareUserForCreation validates the model
func (user *User) PrepareUserForCreation() error {
	_, err := verifyEmail(user.Email)
	if err != nil {
		return err
	}

	if user.Locations == nil {
		user.Locations = make([]*Location, 0)
	}

	return nil

}

// PrepareForCreation validates the model
func (o *Organization) PrepareForCreation() error {
	re, err := verifyEmail(o.AdminEmail)
	if err != nil {
		return err
	}
	res := re.FindStringSubmatch(o.AdminEmail)
	for i := range res {
		if i != 0 {
			o.Domain = res[i]
		}
	}

	if o.Locations == nil {
		o.Locations = make([]*Location, 0)
	}

	return nil
}

func verifyEmail(email string) (*regexp.Regexp, error) {
	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

	if isEmail := re.MatchString(email); !isEmail {
		return nil, fmt.Errorf("Emailadress not valid")
	}

	return re, nil
}
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
	if !isValidWorkSituation {
		return fmt.Errorf("Invalid work situation")
	}
	logg.User.Email = ""
	logg.CreatedAt = time.Now().UTC().Format("20060102T150405Z")

	return nil
}
