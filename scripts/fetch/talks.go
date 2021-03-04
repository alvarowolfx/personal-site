package fetch

import (
	"encoding/json"
	"fmt"
	"log"
	"net/url"
	"os"
	"strings"
	"text/template"
	"time"

	"github.com/gosimple/slug"
)

const (
	talksDir        = "../content/talks"
	talksFile       = "../data/talks/index.json"
	talksFileOutput = "../data/talks/out.json"
	talkTemplate    = `---
title: "[[ .T.Title ]]"
subtitle: "[[ .T.Subtitle ]]"
[[- if gt (len .T.Summary) 2 ]]
summary:
|
  [[ .T.Summary ]]
[[- else ]]
summary: " "
[[- end ]]
tags: [[- range .T.Tags ]]
  - [[ . ]]
[[- end]]
  - talk
cover:
  image: "[[ .T.ImageURL ]]"
slidesUrl: "[[ .T.SlidesURL ]]"
slideId: "[[ .T.SlideID ]]"
event: "[[ .P.Name ]]"
audience: "[[ .P.Local ]]"
date: [[ .P.Date ]]
videoUrl: "[[ .P.VideoURL ]]"
video: "[[ .P.VideoID ]]"
---

<!-- truncate -->

{{< param summary >}}

[[- if .P.HaveSlides ]]
### Slides
[[- if ne (len .T.SlideID) 0 ]]
{{< slideshare id=[[ .T.SlideID ]] >}}
[[- end ]]

- [Link to slides]([[ .T.SlidesURL ]])
[[- end]]
[[- if .P.HaveVideo ]]
### Recording
{{< youtube id=[[ .P.VideoID ]] >}}

- [Link to video]([[ .P.VideoURL ]])
[[- end]]
`
)

type TalkPlace struct {
	Name       string `json:"name"`
	Date       string `json:"date"`
	Local      string `json:"local"`
	VideoURL   string `json:"videoUrl"`
	VideoID    string `json:"videoId"`
	HaveSlides bool
	HaveVideo  bool
}

type Talk struct {
	Title     string      `json:"title"`
	ImageURL  string      `json:"imageUrl"`
	SlidesURL string      `json:"slidesUrl"`
	SlideID   string      `json:"slideId"`
	Places    []TalkPlace `json:"places"`
	Summary   string      `json:"summary"`
	Subtitle  string      `json:"subtitle,omitempty"`
	Tags      []string    `json:"tags"`
}

func SyncTalks() {
	tmpl, err := template.New("talk").
		Delims("[[", "]]").
		Parse(talkTemplate)
	if err != nil {
		log.Fatalf("failed to parse template")
	}
	f, err := os.Open(talksFile)
	if err != nil {
		log.Fatalf("failed to get talks file")
	}
	var talks []Talk
	err = json.NewDecoder(f).Decode(&talks)
	if err != nil {
		log.Fatalf("failed to parse talks from file")
	}

	for _, t := range talks {
		titleSlug := slug.Make(t.Title)
		for _, p := range t.Places {
			date, terr := time.Parse("02/01/2006", p.Date)
			if terr != nil {
				log.Fatalf("invalid time format: %v - at talk %s", terr, titleSlug)
			}
			dateFormatted := date.Format(time.RFC3339)
			dateFilename := strings.Split(dateFormatted, "T")[0]
			year := date.Year()
			yearTalksDir := fmt.Sprintf("%s/%d", talksDir, year)
			talksFilename := fmt.Sprintf("%s/%d/%s-%s.md", talksDir, year, dateFilename, titleSlug)
			_ = os.MkdirAll(yearTalksDir, os.ModePerm)
			f, ferr := os.OpenFile(talksFilename, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
			if ferr != nil {
				log.Fatalf("failed to open/create file for writing: %v - at talk %s", ferr, titleSlug)
			}
			defer f.Close()
			p.Date = dateFormatted
			u, uerr := url.Parse(p.VideoURL)
			if uerr != nil {
				log.Fatalf("failed to parse video url: %v - at talk %s", uerr, titleSlug)
			}
			if len(t.Subtitle) == 0 {
				t.Subtitle = " "
			}
			if len(t.Summary) == 0 {
				t.Summary = t.Subtitle
			}
			t.Summary = strings.ReplaceAll(t.Summary, "\n", "\n  ")
			p.VideoID = u.Query().Get("v")
			p.HaveSlides = len(t.SlidesURL) > 1
			p.HaveVideo = len(p.VideoID) > 1
			err = tmpl.Execute(f, struct {
				T Talk
				P TalkPlace
			}{
				T: t,
				P: p,
			})
			if err != nil {
				log.Fatalf("failed to write template to file: %v - at talk %s", err, titleSlug)
			}
			fmt.Println("Wrote ", talksFilename)
		}
	}
}
