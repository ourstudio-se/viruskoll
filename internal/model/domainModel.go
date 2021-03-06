package model

// Location represents a location (...)
type Location struct {
	Name     string      `json:"name,omitempty" validate:"max=255"`
	City     string      `json:"city,omitempty" validate:"max=255"`
	Region   string      `json:"region,omitempty" validate:"max=255"`
	Country  string      `json:"country,omitempty" validate:"max=255"`
	Street   string      `json:"street,omitempty" validate:"max=255"`
	Zip      string      `json:"zip,omitempty" validate:"max=255"`
	Location GeoLocation `json:"geolocation"`
}

// LogUser ...
type LogUser struct {
	ID        string      `json:"_id,omitempty" validate:"max=255"`
	Locations []*Location `json:"locations" validate:"dive,max=100"`
}

// User ...
type User struct {
	ID            string      `json:"_id,omitempty" validate:"max=255"`
	Email         string      `json:"email,omitempty" validate:"required,email"`
	EmailVerified bool        `json:"emailVerified"`
	Locations     []*Location `json:"locations" validate:"dive,max=100"`
}

// Logg ...
type Logg struct {
	ID             string      `json:"_id,omitempty"`
	User           *LogUser    `json:"user" validate:"dive"`
	Symptoms       []string    `json:"symptoms" validate:"max=100"`
	WorkSituation  string      `json:"workSituation,omitempty" validate:"max=100"`
	DailySituation string      `json:"dailySituation,omitempty" validate:"max=100"`
	Locations      []*Location `json:"locations" validate:"dive,max=1000"`
	Features       []*Feature  `json:"features"`
	CreatedAt      string      `json:"createdat"`
}

type Feature struct {
	Precision int    `json:"precision"`
	Id        string `json:"id"`
}

// GeoLocation ...
type GeoLocation struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}

type GeoAgg struct {
	Buckets []GeoAggBucket `json:"buckets"`
}

type Symptoms struct {
	Unhealthy       *SymptomsAgg `json:"unhealthy"`
	Healthy         *SymptomsAgg `json:"healthy"`
	DailySituations *SymptomsAgg `json:"dailySituation"`
}

type LogSearchResults struct {
	Count        int64           `json:"count"`
	GeoLocations []*GeoAggBucket `json:"geolocations"`
	Symptoms
}

type GeoAggBucket struct {
	ID    string `json:"id"`
	Count int64  `json:"count"`
	Symptoms
}

type SymptomsAgg struct {
	Count   int64            `json:"count"`
	Buckets []*SymptomBucket `json:"buckets"`
}

type SymptomBucket struct {
	Symptom interface{} `json:"symptom"`
	Count   int64       `json:"count"`
}
