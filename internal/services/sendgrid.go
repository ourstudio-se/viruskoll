package services

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/sirupsen/logrus"
)

type EmailService struct {
	client *sendgrid.Client
	log    *logrus.Logger
	from   string
	listID string
}

// NewEmailService ...
func NewEmailService(sendgrid *sendgrid.Client, from string, log *logrus.Logger) *EmailService {
	return &EmailService{
		client: sendgrid,
		log:    log,
		from:   from,
	}
}

// SendRegistrationEmail ...
func (ems *EmailService) SendRegistrationEmail(user *model.User) error {
	from := mail.NewEmail("Viruskollen", ems.from)
	subject := "Du har valt att registrera dig för viruskollen"
	to := mail.NewEmail("", user.Email)
	plainTextContent := fmt.Sprintf("Vänligen klicka på denna länk för att verifera ditt konto: <a href='https://viruskoll.se/verify/%s'>verifera</a>", user.ID)
	htmlContent := fmt.Sprintf("Vänligen klicka på denna länk för att verifera ditt konto: <a href='https://viruskoll.se/verify/%s'>verifera</a>", user.ID)
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	response, err := ems.client.Send(message)
	ems.log.Infof("Sent email %v %v", response, err)
	return err
}

func (ems *EmailService) AddUserToSendList(user *model.User) error {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	host := "https://api.sendgrid.com"

endpoint :="/v3/marketing/contacts"
	http.Post(fmt.Sprintf("%s%s",host,enpoint))

	request := sendgrid.MakeRequest(apiKey, , host)
	request.Method = "POST"
	response, err := sendgrid.API(request)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
