package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sirupsen/logrus"
	log "vcs-git.ourstudio.dev/vcs-libraries/sdk-go-logging"
)

const contactsEndpoint = "/v3/marketing/contacts"
const sendgridHost = "https://api.sendgrid.com"

type ResponeList struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

type EmailService struct {
	client            *sendgrid.Client
	log               *logrus.Logger
	from              string
	userListID        string
	userPendingListID string
	orgPendingID      string
	orgListID         string
	apiKey            string
}

// NewEmailService ...
func NewEmailService(sendgrid *sendgrid.Client, apiKey string, userPendingID, userListID, orgListID, orgPendingID string, log *logrus.Logger) *EmailService {
	return &EmailService{
		client:            sendgrid,
		log:               log,
		apiKey:            apiKey,
		userListID:        userListID,
		userPendingListID: userPendingID,
		orgListID:         orgListID,
		orgPendingID:      orgPendingID,
	}
}

// UserPending in sendgrid
func (ems *EmailService) UserPending(ctx context.Context, email, id string) error {
	return ems.addUserToList(ctx, ems.userPendingListID, email, id)
}

// OrganizationPending awaiting confirmation in sendgrid
func (ems *EmailService) OrganizationPending(ctx context.Context, email, id string) error {
	return ems.addUserToList(ctx, ems.orgPendingID, email, id)
}

// OrganizationSubscribed ...
func (ems *EmailService) OrganizationSubscribed(ctx context.Context, orgID, email string) error {
	return ems.moveToList(ctx, ems.orgPendingID, ems.orgListID, orgID, email)
}

// UserSubscribed will remove the user from the pending list and add it to the subscribed list
func (ems *EmailService) UserSubscribed(ctx context.Context, id, email string) error {
	return ems.moveToList(ctx, ems.userPendingListID, ems.userListID, id, email)
}

func (ems *EmailService) moveToList(ctx context.Context, fromList, toList, id, email string) error {
	err := ems.removeUserFromList(ctx, fromList, id)

	if err != nil {
		return err
	}

	return ems.addUserToList(ctx, toList, email, id)
}

func (ems *EmailService) addUserToList(ctx context.Context, listID string, email, id string) error {
	type sendgridContact struct {
		Email      string `json:"email"`
		UniqueName string `json:"unique_name"`
		FirstName  string `json:"first_name"`
	}
	type contactsRequest struct {
		ListIds  []string          `json:"list_ids"`
		Contacts []sendgridContact `json:"contacts"`
	}

	body, err := json.Marshal(contactsRequest{
		ListIds: []string{listID},
		Contacts: []sendgridContact{
			sendgridContact{
				Email:      email,
				UniqueName: id,
				FirstName:  id,
			},
		},
	})

	if err != nil {
		return err
	}

	url := fmt.Sprintf("%s%s", sendgridHost, contactsEndpoint)

	req, err := http.NewRequestWithContext(ctx, "PUT", url, bytes.NewBuffer(body))
	ems.log.Debugf("body %v", string(body))
	if err != nil {
		ems.log.Errorf("Error while sending sendgrid request %v", err)
		return err
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", ems.apiKey))

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		ems.log.Errorf("Error creating contct %v", err)
		return err
	}

	ems.log.Debugf("Response from sg %v", resp)
	return nil
}

func (ems *EmailService) removeUserFromList(ctx context.Context, listID string, id string) error {
	url := fmt.Sprintf("%s/v3/marketing/lists/%s/contacts?contact_ids=%s", sendgridHost, listID, id)
	payload := strings.NewReader("{}")
	req, err := http.NewRequestWithContext(ctx, "DELETE", url, payload)
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", ems.apiKey))

	res, err := http.DefaultClient.Do(req)

	if err != nil {
		log.Errorf("Error %v", res)
		return err
	}

	return nil
}

// FindContactByEmail ...
func (ems *EmailService) FindContactByEmail(email string) (*ResponeList, error) {
	query := fmt.Sprintf("{\"query\":\"email LIKE '%s'\"}", email)
	return ems.contactsQuery(query)
}

func (ems *EmailService) getContactIDByEmail(id, listID string) (*ResponeList, error) {
	query := fmt.Sprintf("{\"query\":\"first_name LIKE '%s' AND CONTAINS(list_ids, '%s')\"}", id, listID)
	return ems.contactsQuery(query)
}

func (ems *EmailService) contactsQuery(query string) (*ResponeList, error) {
	url := fmt.Sprintf("%s/v3/marketing/contacts/search", sendgridHost)

	payload := strings.NewReader(query)

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("authorization", fmt.Sprintf("Bearer %s", ems.apiKey))
	req.Header.Add("content-type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	type responseData struct {
		Result []ResponeList `json:"result"`
	}

	var responseBody responseData
	err = json.NewDecoder(res.Body).Decode(&responseBody)
	if err != nil {
		return nil, err
	}

	if responseBody.Result != nil && len(responseBody.Result) > 0 {
		return &responseBody.Result[0], nil
	}

	return nil, nil
}
