package users

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/julienschmidt/httprouter"
	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/services"
)

const timeout = 15 * time.Second

type userApi struct {
	us  *services.UserService
	api *rest.API
}

// Setup ...
func Setup(api *rest.API, userService *services.UserService) {
	userAPI := userApi{
		us:  userService,
		api: api,
	}

	api.Router.POST("/api/users", userAPI.POST)
	api.Router.PUT("/api/users/:id", userAPI.PUT)

	// TODO:
	// api.router.GET("/verify/:id", userAPI.verify)
	// api.router.GET("/unsubscribe/:id", userAPI.verify)

}

// swagger:route POST /users public createUserParams
// Creates a new user
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func (ua *userApi) POST(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters createUserParams
	type createParams struct {
		// in: body
		User *model.User `json:"user"`
	}
	var user model.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	id, err := ua.us.Create(ctx, &user)
	if err != nil {
		ua.api.Log.Errorf("Error while creating user %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ua.api.WriteJSONResponse(w, http.StatusOK, IDResponse{
		ID: id,
	})
}

// swagger:route PUT /users/{id} public createUserParams
// Creates a new user
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func (ua *userApi) PUT(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters createUserParams
	type createParams struct {
		// in: body
		User *model.User `json:"user"`
	}
	var user model.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	id, err := ua.us.Create(ctx, &user)
	if err != nil {
		ua.api.Log.Errorf("Error while creating user %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	ua.api.WriteJSONResponse(w, http.StatusOK, IDResponse{
		ID: id,
	})
}
