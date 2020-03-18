package services

import (
	"fmt"

	"github.com/ourstudio-se/viruskoll/internal/model"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sirupsen/logrus"
)

type EmailService struct{
	client *sendgrid.Client
	log *logrus.Logger
	from string
}

func NewEmailService(sendgrid *sendgrid.Client, from string, log *logrus.Logger) *EmailService{
	return &EmailService{
		client: sendgrid,
		log: log,
		from: from,
	}
}

// SendRegistrationEmail ...
func (ems *EmailService) SendRegistrationEmail(user model.User) error{
	from := mail.NewEmail("Viruskollen", ems.from)
	subject := "Du har valt att registrera dig för viruskollen"
	to := mail.NewEmail("", user.Email)
	plainTextContent := fmt.Sprintf("Vänligen klicka på denna länk för att verifera ditt konto: <a href='https://viruskollen.se/verify/%s'>verifera</a>", user.ID)
	htmlContent := fmt.Sprintf("Vänligen klicka på denna länk för att verifera ditt konto: <a href='https://viruskollen.se/verify/%s'>verifera</a>", user.ID)
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	response, err := ems.client.Send(message)
	ems.log.Infof("Sent email %v", response)
	return err
}