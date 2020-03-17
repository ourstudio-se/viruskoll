package model

// Location represents a location (...)
type Location struct {
	Name     string      `json:"name"`
	City     string      `json:"city"`
	Country  string      `json:"country"`
	Street   string      `json:"street"`
	Zip      string      `json:"zip"`
	Location GeoLocation `json:"geolocation"`
}

// Organization ...
type Organization struct {
	ID          string     `json:"_id"`
	Name        string     `json:"name"`
	Domain      string     `json:"domain"`
	Admin       string     `json:"admin"`
	Description string     `json:"description"`
	Locations   []Location `json:"locations"`
}

// User ...
type User struct {
	Email         string         `json:"email"`
	BirthYear     int            `json:"birthYear"`
	Gender        string         `json:"gender"`
	Organizations []Organization `json:"organizations"`
}

// Logg ...
type Logg struct {
	User         User         `json:"user"`
	Symptoms     []Symptom    `json:"symptoms"`
	Location     Location     `json:"location"`
	Organization Organization `json:"organization"`
}

// Symptom ...
type Symptom struct {
	Type  string `json:"type"`
	Value int    `json:"value"`
}

// GeoLocation ...
type GeoLocation struct {
	Latitude  float64 `json:"lat"`
	Longitude float64 `json:"lon"`
}
