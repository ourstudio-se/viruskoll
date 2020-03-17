package persistence

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/olivere/elastic/v7"
	log "github.com/sirupsen/logrus"
)

// Es ...
type Es struct {
	client *elastic.Client
	Index  string
}

// New elastic connection
func New(username, password, addr, index string, logger *log.Logger) (*Es, error) {
	client, err := elastic.NewClient(
		elastic.SetURL(addr),
		elastic.SetScheme("http"),
		elastic.SetSniff(false),
		elastic.SetHealthcheck(true),
		elastic.SetHealthcheckInterval(15*time.Second),
		elastic.SetBasicAuth(username, password),
		elastic.SetErrorLog(logger),
		elastic.SetHealthcheckInterval(15*time.Second),
	)

	if err != nil {
		return nil, err
	}

	return &Es{
		client: client,
		Index:  index,
	}, nil
}

// Add this document
func (es *Es) Add(ctx context.Context, doc interface{}) (string, error) {
	res, err := es.client.Index().Index(es.Index).BodyJson(doc).Do(ctx)
	if err != nil {
		return "", err
	}

	return res.Id, nil
}

// Get s the document by id
func (es *Es) Get(ctx context.Context, id string) (json.RawMessage, error) {
	res, err := es.client.Get().Index(es.Index).Id(id).Do(ctx)
	if err != nil {
		return nil, err
	}

	if !res.Found {
		return nil, fmt.Errorf("Not found, %s", id)
	}

	return res.Source, nil
}

// Update the model
func (es *Es) Update(ctx context.Context, id string, model interface{}) error {
	_, err := es.client.Update().Index(es.Index).Id(id).Doc(model).Do(ctx)
	if err != nil {
		return err
	}
	return nil
}
