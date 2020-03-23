package model

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
	ID            string      `json:"_id,omitempty"`
	Name          string      `json:"name,omitempty"`
	Domain        string      `json:"domain,omitempty"`
	AdminEmail    string      `json:"admin,omitempty"`
	EmailVerified bool        `json:"emailVerified,omitempty"`
	Description   string      `json:"description,omitempty"`
	Locations     []*Location `json:"locations"`
}

// User ...
type User struct {
	ID            string          `json:"_id,omitempty"`
	Email         string          `json:"email,omitempty"`
	EmailVerified bool            `json:"emailVerified"`
	Organizations []*Organization `json:"organizations"`
	Locations     []*Location     `json:"locations"`
}

// Logg ...
type Logg struct {
	ID            string          `json:"_id,omitempty"`
	User          *User           `json:"user"`
	Symptoms      []string        `json:"symptoms"`
	WorkSituation string          `json:"workSituation"`
	Locations     []*Location     `json:"locations"`
	Organizations []*Organization `json:"organizations"`
	CreatedAt     string          `json:"createdat"`
}

// GeoLocation ...
type GeoLocation struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}

type LogSearchResults struct {
	Count        int64           `json:"count"`
	GeoLocations []*GeoAggBucket `json:"geolocations"`
}

type GeoAggBucket struct {
	GeoLocation   GeoLocation  `json:"geolocation"`
	Count         int64        `json:"count"`
	Unhealthy     *SymptomsAgg `json:"unhealthy"`
	Healthy       *SymptomsAgg `json:"healthy"`
	WorkSituation *SymptomsAgg `json:"workingSituation"`
}

type SymptomsAgg struct {
	Count   int64            `json:"count"`
	Buckets []*SymptomBucket `json:"buckets"`
}

type SymptomBucket struct {
	Symptom interface{} `json:"symptom"`
	Count   int64       `json:"count"`
}
