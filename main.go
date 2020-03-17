package main

import (
	"os"

	"github.com/joho/godotenv"
	"github.com/ourstudio-se/viruskoll/internal/persistence"
	"github.com/ourstudio-se/viruskoll/internal/rest"
	"github.com/ourstudio-se/viruskoll/internal/services"
	"github.com/sirupsen/logrus"
)

func main() {
	_ := godotenv.Load()

	nodes := os.Getenv("ELASTIC_NODES")
	user := os.Getenv("ELASTIC_USER")
	pass := os.Getenv("ELASTIC_PASSWORD")

	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)

	es, err := persistence.New(user, pass, nodes, "viruskoll", log)

	os := services.NewOrganizationService(es)
	ls := services.NewLoggsService(es)
	if err != nil {
		log.Fatalf("Could not init elastic %v", err)
		panic(err)
	}

	api := rest.New(log, es, os, ls)
	api.RunOnAddr(":80")
}
