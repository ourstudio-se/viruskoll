package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sirupsen/logrus"
)

const contactsEndpoint = "/v3/marketing/contacts"
const sendgridHost = "https://api.sendgrid.com"

type EmailService struct {
	client *sendgrid.Client
	log    *logrus.Logger
	from   string
	listID string
	apiKey string
}

// NewEmailService ...
func NewEmailService(sendgrid *sendgrid.Client, apiKey string, listID string, log *logrus.Logger) *EmailService {
	return &EmailService{
		client: sendgrid,
		log:    log,
		apiKey: apiKey,
		listID: listID,
	}
}

// AddUserToSendList in sendgrid
func (ems *EmailService) AddUserToSendList(ctx context.Context, user *model.User) error {
	apiKey := os.Getenv("SENDGRID_API_KEY")

	type sendgridContact struct {
		Email      string `json:"email"`
		UniqueName string `json:"unique_name"`
	}
	type contactsRequest struct {
		ListIds  []string          `json:"list_ids"`
		Contacts []sendgridContact `json:"contacts"`
	}

	body, err := json.Marshal(contactsRequest{
		ListIds: []string{ems.listID},
		Contacts: []sendgridContact{
			sendgridContact{
				Email:      user.Email,
				UniqueName: user.ID,
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
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", apiKey))

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		ems.log.Errorf("Error creating contct %v", err)
		return err
	}

	ems.log.Debugf("Response from sg %v", resp)
	return nil
}
