package users

import "github.com/ourstudio-se/viruskoll/internal/model"

// swagger:response IDResponse
type IDResponse struct {
	ID string `json:"id"`
}

// swagger:response UserRespone
type userResponse struct {
	*model.User `json:"user"`
}
