package main

import (
	"github.com/ourstudio-se/viruskoll/internal/rest"
)

func main() {
	api := rest.New()
	api.RunOnAddr(":8081")
}
