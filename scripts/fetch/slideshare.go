package fetch

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
)

func GetSlideshareData() {
	f, err := os.Open(talksFile)
	if err != nil {
		log.Fatalf("failed to get talks file")
	}
	defer f.Close()
	var talks []*Talk
	err = json.NewDecoder(f).Decode(&talks)
	if err != nil {
		log.Fatalf("failed to parse talks from file")
	}

	wg := sync.WaitGroup{}
	wg.Add(len(talks))

	for _, talk := range talks {
		t := talk
		go func() {
			if t.SlidesURL == "" {
				wg.Done()
				return
			}
			fmt.Println("Fetching ", t.SlidesURL)
			res, err := http.Get(t.SlidesURL)
			if err != nil {
				log.Fatal(err)
			}
			defer res.Body.Close()
			if res.StatusCode != 200 {
				log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
			}

			// Load the HTML document
			doc, err := goquery.NewDocumentFromReader(res.Body)
			if err != nil {
				log.Fatal(err)
			}

			s := doc.Find("meta[name=\"twitter:app:url:iphone\"]").First()
			deeplink, ok := s.Attr("content")
			slideID := ""
			if ok {
				slideID = strings.Split(deeplink, "ss/")[1]
				t.SlideID = slideID
			}
			fmt.Printf("Found shortcodes: %s - %s\n", slideID, t.Title)

			p := doc.Find("#slideshow-description-paragraph").First()
			summary := p.Text()
			if t.Summary == "" {
				t.Summary = strings.TrimSpace(summary)
			}

			wg.Done()
		}()
	}

	wg.Wait()

	out, err := os.OpenFile(talksFileOutput, os.O_CREATE|os.O_RDWR|os.O_SYNC, 0644)
	if err != nil {
		log.Fatalf("failed to write talks file: %v", err)
	}
	err = json.NewEncoder(out).Encode(&talks)
	if err != nil {
		log.Fatalf("failed to write talks file: %v", err)
	}
}
