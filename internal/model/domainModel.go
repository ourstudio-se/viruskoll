package model

// Location represents a location (...)
type Location struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	Longitude float64 `json:"longitude"`
	Latitude  float64 `json:"latitude"`
	City      string  `json:"city"`
	Country   string  `json:"country"`
	Street    string  `json:"street"`
	Zip       string  `json:"zip"`
}

// Organization ...
type Organization struct {
	ID          string     `json:"id"`
	Name        string     `json:"name"`
	Domain      string     `json:"domain"`
	Admin       string     `json:"admin"`
	Description string     `json:"description"`
	Locations   []Location `json:"locations"`
}

// User ...
type User struct {
	ID            string         `json:"id"`
	Email         string         `json:"email"`
	BirthYear     int            `json:"birthYear"`
	Gender        string         `json:"gender"`
	Organizations []Organization `json:"organizations"`
}

// Logg ...
type Logg struct {
	User     User      `json:"user"`
	Symptoms []Symptom `json:"symptoms"`
}

// Symptom ...
type Symptom struct {
	Type  string `json:"type"`
	Value int    `json:"value"`
}
