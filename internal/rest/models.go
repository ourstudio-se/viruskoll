package rest

// Locations ...
type Locations struct {
	All []Location `json:"all"`
}

//Location ...
type Location struct {
	Green     int     `json:"green"`
	Yellow    int     `json:"yellow"`
	Red       int     `json:"red"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Radius    float64 `json:"radius"`
}
