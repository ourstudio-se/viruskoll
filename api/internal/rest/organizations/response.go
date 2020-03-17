package organizations

import "github.com/ourstudio-se/viruskoll/internal/model"

// swagger:response IDResponse
type IDResponse struct{
	ID string `json:"id"`
}

// swagger:response organizationResponse
type organizationResponse struct{
	model.Organization
}

// swagger:response emptyResponse
type empty struct{}