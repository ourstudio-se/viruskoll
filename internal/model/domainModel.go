package model

var ValidSymptoms = []string{"fever", "coff", "cold"}
var ValidWorkSituations = []string{"working", "workingFromHome", "notWorking", "notWorkingSickKids"}

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
	ID          string     `json:"_id,omitempty"`
	Name        string     `json:"name,omitempty"`
	Domain      string     `json:"domain,omitempty"`
	Admin       string     `json:"admin,omitempty"`
	Description string     `json:"description,omitempty"`
	Locations   []Location `json:"locations"`
}

// User ...
type User struct {
	ID            string         `json:"_id,omitempty"`
	Email         string         `json:"email"`
	BirthYear     int            `json:"birthYear,omitempty"`
	Gender        string         `json:"gender,omitempty"`
	Organizations []Organization `json:"organizations"`
}

// Logg ...
type Logg struct {
	User          User         `json:"user"`
	Symptoms      []string     `json:"symptoms"`
	WorkSituation string       `json:"workSituation"`
	Location      Location     `json:"location"`
	Organization  Organization `json:"organization"`
	CreatedAt     string       `json:"createdat,string"`
}

// GeoLocation ...
type GeoLocation struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}

type GeoAggBucket struct {
	Key      interface{} `json:"key"`
	DocCount int64       `json:"doc_count"`
}
type GeoAgg struct {
	Buckets []GeoAggBucket `json:"buckets"`
}

type SymptomBucket struct {
	Symptom interface{} `json:"symptom"`
	Count   int64       `json:"Count"`
}

type SymptomsAgg struct {
	Count     int64           `json:"count"`
	Unhealthy []SymptomBucket `json:"unhealthy"`
	Healthy   []SymptomBucket `json:"healthy"`
}
