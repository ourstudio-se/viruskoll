package persistence

import (
	"context"
	"time"

	"github.com/olivere/elastic/v7"
	log "github.com/sirupsen/logrus"
)

var indicies = []string{"organizations", "locations", "users", "log"}

type Es struct {
	client *elastic.Client
}

func New(username string, password string, addr string, logger *log.Logger) (*Es, error) {
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
	}, nil
}

func (es *Es) Add(ctx context.Context, index string, doc interface{}) (string, error) {
	res, err := es.client.Index().Index(index).Type(index).BodyJson(doc).Do(ctx)
	if err != nil {
		return "", err
	}

	return res.Id, nil
}

func (es *Es) Get(ctx context.Context, index string, ID string) (interface{}, error) {
	res, err := es.client.Get().Index(index).Id(ID).Do(ctx)
	if err != nil {
		return nil, err
	}

	return res.Source, nil
}
