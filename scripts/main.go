package main

import (
	"fmt"

	"github.com/alvarowolfx/personal-site-scripts/fetch"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("error loading .env file")
	}

	fetch.SyncTalks()
	//fetch.SyncVideos()
	//fetch.GetSlideshareData()
}
