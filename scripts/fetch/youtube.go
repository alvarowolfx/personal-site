package fetch

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"text/template"
	"time"

	"github.com/gosimple/slug"
	"google.golang.org/api/option"
	youtube "google.golang.org/api/youtube/v3"
)

const (
	videosDir     = "../content/videos"
	videoTemplate = `---
title: "[[ .Snippet.Title ]]"
summary: "[[ .Snippet.Description ]]"
tags: [[- range .Snippet.Tags ]]
  - [[ . ]]
[[- end ]]
  - video
cover:
  hidden: true
  image: "[[ .Snippet.Thumbnails.Default.Url ]]"
date: [[ .Snippet.PublishedAt ]]
videoUrl: "https://www.youtube.com/watch?v=[[ .Id ]]"
video: "[[ .Id ]]"
---

<!-- truncate -->

{{< youtube id=[[ .Id ]] >}}

- [Link to video](https://www.youtube.com/watch?v=[[ .Id ]])

[[ .Snippet.Description ]]
`
)

func SyncVideos() {
	apiKey := os.Getenv("YOUTUBE_API_KEY")
	channelID := os.Getenv("YOUTUBE_CHANNEL_ID")

	tmpl, err := template.New("video").
		Delims("[[", "]]").
		Parse(videoTemplate)
	if err != nil {
		log.Fatalf("failed to parse template")
	}

	ctx := context.Background()

	service, err := youtube.NewService(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		log.Fatalf("Error creating YouTube client: %v", err)
	}

	// Start making YouTube API calls.
	// Call the channels.list method. Set the mine parameter to true to
	// retrieve the playlist ID for uploads to the authenticated user's
	// channel.
	call := service.Channels.List([]string{"contentDetails"}).
		Id(channelID)
		//ForUsername("AlvaroViebrantz")
		//.Mine(true)

	response, err := call.Do()
	if err != nil {
		// The channels.list method call returned an error.
		log.Fatalf("Error making API call to list channels: %v", err.Error())
	}

	for _, channel := range response.Items {
		playlistId := channel.ContentDetails.RelatedPlaylists.Uploads
		// Print the playlist ID for the list of uploaded videos.
		fmt.Printf("Videos in list %s\r\n", playlistId)

		nextPageToken := ""
		for {
			// Call the playlistItems.list method to retrieve the
			// list of uploaded videos. Each request retrieves 50
			// videos until all videos have been retrieved.
			playlistCall := service.PlaylistItems.List([]string{"snippet"}).
				PlaylistId(playlistId).
				MaxResults(100).
				PageToken(nextPageToken)

			playlistResponse, err := playlistCall.Do()

			if err != nil {
				// The playlistItems.list method call returned an error.
				log.Fatalf("Error fetching playlist items: %v", err.Error())
			}

			ids := []string{}
			for _, playlistItem := range playlistResponse.Items {
				videoId := playlistItem.Snippet.ResourceId.VideoId
				ids = append(ids, videoId)
			}
			videoCall := service.Videos.List([]string{"snippet"}).Id(ids...)
			videoResponse, err := videoCall.Do()

			for _, playlistItem := range videoResponse.Items {
				title := playlistItem.Snippet.Title
				videoId := playlistItem.Id
				videoDate := playlistItem.Snippet.PublishedAt
				fmt.Printf("%v, (%v)\r\n", title, videoId)

				if err != nil {
					log.Fatalf("Error fetching video tags: %v", err.Error())
				}

				titleSlug := slug.Make(title)
				date, terr := time.Parse(time.RFC3339, videoDate)
				if terr != nil {
					log.Fatalf("invalid time format: %v - at video %s", terr, titleSlug)
				}
				dateFormatted := date.Format(time.RFC3339)
				dateFilename := strings.Split(dateFormatted, "T")[0]
				year := date.Year()
				yearVideosDir := fmt.Sprintf("%s/%d", videosDir, year)
				videoFilename := fmt.Sprintf("%s/%d/%s-%s.md", videosDir, year, dateFilename, titleSlug)
				_ = os.MkdirAll(yearVideosDir, os.ModePerm)
				f, ferr := os.OpenFile(videoFilename, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
				if ferr != nil {
					log.Fatalf("failed to open/create file for writing: %v - at video %s", ferr, titleSlug)
				}
				defer f.Close()

				err = tmpl.Execute(f, playlistItem)
				if err != nil {
					log.Fatalf("failed to write template to file: %v - at video %s", err, titleSlug)
				}
				fmt.Println("Wrote ", videoFilename)
			}

			// Set the token to retrieve the next page of results
			// or exit the loop if all results have been retrieved.
			nextPageToken = playlistResponse.NextPageToken
			if nextPageToken == "" {
				break
			}
			fmt.Println()
		}
	}
}
