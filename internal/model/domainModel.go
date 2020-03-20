package model

import (
	"fmt"
	"regexp"
	"time"
)

const HEALTHY = "healthy"

var validSymptoms = []string{"fever", "coff", "cold", HEALTHY}
var validWorkSituations = []string{"at-work", "work-from-home", "home-no-work", "child-care"}

// Location represents a location (...)
type Location struct {
	Name     string      `json:"name,omitempty"`
	City     string      `json:"city,omitempty"`
	Country  string      `json:"country,omitempty"`
	Street   string      `json:"street,omitempty"`
	Zip      string      `json:"zip,omitempty"`
	Location GeoLocation `json:"geolocation"`
}

// Organization ...
type Organization struct {
	ID            string     `json:"_id,omitempty"`
	Name          string     `json:"name,omitempty"`
	Domain        string     `json:"domain,omitempty"`
	AdminEmail    string     `json:"admin,omitempty"`
	EmailVerified bool       `json:"emailVerified,omitempty"`
	Description   string     `json:"description,omitempty"`
	Locations     []Location `json:"locations"`
}

// PrepareForCreation ...
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
		o.Locations = make([]Location, 0)
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

// User ...
type User struct {
	ID            string         `json:"_id,omitempty"`
	Email         string         `json:"email,omitempty"`
	EmailVerified bool           `json:"emailVerified"`
	Organizations []Organization `json:"organizations"`
	Locations     []Location     `json:"locations"`
}

func (user *User) PrepareUserForCreation() error {
	_, err := verifyEmail(user.Email)
	if err != nil {
		return err
	}

	if user.Locations == nil {
		user.Locations = []Location{}
	}

	return nil

}

// Logg ...
type Logg struct {
	ID            string       `json:"_id,omitempty"`
	User          User         `json:"user"`
	Symptoms      []string     `json:"symptoms"`
	WorkSituation string       `json:"workSituation"`
	Location      Location     `json:"location"`
	Organization  Organization `json:"organization"`
	CreatedAt     string       `json:"createdat"`
}

func filter(ss []string, test func(string) bool) (ret []string) {
	for _, s := range ss {
		if test(s) {
			ret = append(ret, s)
		}
	}
	return
}

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

// GeoLocation ...
type GeoLocation struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}

type GeoAggBucket struct {
	GeoLocation GeoLocation `json:"geolocation"`
	DocCount    int64       `json:"doc_count"`
}
type GeoAgg struct {
	Buckets []GeoAggBucket `json:"buckets"`
}

type SymptomBucket struct {
	Symptom interface{} `json:"symptom"`
	Count   int64       `json:"count"`
}

type SymptomsAgg struct {
	Count          int64           `json:"count"`
	Unhealthy      []SymptomBucket `json:"unhealthy"`
	Healthy        []SymptomBucket `json:"healthy"`
	WorkSituations []SymptomBucket `json:"workingSituations"`
	GeoLocations   []GeoAggBucket  `json:"geolocations"`
}
