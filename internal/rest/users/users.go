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

const timeout = 60 * time.Second

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
	api.Router.POST("/api/organizations/:id/users", userAPI.POSTforOrg)

	api.Router.PUT("/api/users/:id", userAPI.PUT)
	api.Router.POST("/api/users/:id/verifyemail", userAPI.verifyemail)
	// TODO:
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

// swagger:route POST /organizations/{id}/users public createuserForOrg
// Creates a new user
// responses:
//   200: IDResponse

// ...
// swagger:response IDResponse
func (ua *userApi) POSTforOrg(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters createuserForOrg
	type createParams struct {
		// in: params
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

	id, err := ua.us.CreateWithOrg(ctx, &user, ps.ByName("id"))
	if err != nil && err.Error() == "NOT_VERIFIED" {
		ua.api.Log.Errorf("Error while creating user %v", err)
		ua.api.WriteJSONResponse(w, http.StatusNotFound, map[string]interface{}{
			"error": "organization not found",
		})
		return
	}
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

// swagger:route POST /users/{id}/verifyemail public createUserParams
// Verify user email
// responses:
//   200: emailVerifiedResponse

// ...
// swagger:response emailVerifiedResponse
func (ua *userApi) verifyemail(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// swagger:parameters createUserParams
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
