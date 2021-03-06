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

type userAPI struct {
	us  *services.UserService
	api *rest.API
}

// Setup users api
func Setup(api *rest.API, userService *services.UserService) {
	uapi := userAPI{
		us:  userService,
		api: api,
	}

	api.Router.GET("/api/users/:id", uapi.GET)
	api.Router.POST("/api/users", uapi.POST)
	api.Router.PUT("/api/users/:id", uapi.PUT)
	api.Router.POST("/api/users/:id/verifyemail", uapi.verifyemail)
}

// swagger:route GET /users/{id} public getUserParams
// Gets a user
// responses:
//   200: UserRespone
// ...
// swagger:response UserRespone
func (ua *userAPI) GET(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()
	// swagger:parameters getUserParams
	type getUserParams struct {
		// in: path
		ID string `json:"id"`
	}

	user, err := ua.us.Get(ctx, ps.ByName("id"))
	if err != nil {
		ua.api.Log.Errorf("Error while getting user %v", err)
		w.WriteHeader(http.StatusNotFound)
		return
	}

	ua.api.WriteJSONResponse(w, http.StatusOK, user)
}

// swagger:route POST /users public createUserParams
// Creates a new user
// responses:
//   202: emptyResponse
// ...
// swagger:response emptyResponse
func (ua *userAPI) POST(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
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

	_, err = ua.us.Create(ctx, &user)
	if err != nil {
		ua.api.Log.Errorf("Error while creating user %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}

// swagger:route PUT /users/{id} public updateUserParams
// Update a new user
// responses:
//   202: emptyResponse
// ...
// swagger:response emptyResponse
func (ua *userAPI) PUT(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters updateUserParams
	type createParams struct {
		// in: path
		ID string `json:"id"`
		// in: body
		User *model.User `json:"user"`
	}
	var user model.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err = ua.us.Create(ctx, &user)
	if err != nil {
		ua.api.Log.Errorf("Error while creating user %v", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}

// swagger:route POST /users/{id}/verifyemail public verifyUserEmail
// Verify user email
// responses:
//   200: emailVerifiedResponse
// ...
// swagger:response emailVerifiedResponse
func (ua *userAPI) verifyemail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters verifyUserEmail
	type createParams struct {
		// in: path
		ID string `json:"id"`
	}

	id := ps.ByName("id")

	_, err := ua.us.Get(ctx, id)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	err = ua.us.VerifyEmail(ctx, id)

	if err != nil {
		ua.api.Log.Errorf("Could not verify email %v", err)
		w.WriteHeader(http.StatusUnprocessableEntity)
		return
	}
	// swagger:response emailVerifiedResponse
	type emailVerifiedResponse struct {
		Verified bool `json:"verified"`
	}

	ua.api.WriteJSONResponse(w, http.StatusOK, emailVerifiedResponse{
		Verified: true,
	})
}
