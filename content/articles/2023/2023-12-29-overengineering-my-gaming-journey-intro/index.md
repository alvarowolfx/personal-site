---
title: "Overengineering my gaming journey: Introduction and results"
summary: "Using Airtable and Go to create my own gaming recap/wrapped"
date: 2023-12-29T11:59:54-04:00
author: "Alvaro Viebrantz"
tags: ["go"]
draft: false
cover:
  image: /articles/2023/2023-12-29-overengineering-my-gaming-journey-intro/images/cover.png
serie:
    - ../2023-12-29-overengineering-my-gaming-journey-intro
    - ../2023-12-29-overengineering-my-gaming-journey-airtable-mysql-bridge
    - ../2023-12-29-overengineering-my-gaming-journey-drawing-charts-go
---

{{< serie title="Overengineering my gaming journey" >}}

Has been a while since I wrote an article. I have to admit that lately, I've traded my hobby of coding in my spare time to now take care of my newborn son and play some games. I never considered myself a hardcore gamer, but I always loved to play games and had a special relationship with gaming handhelds. I may have gonna too far, but here is some of my current device collection:

{{< gallery match="images/*.jpeg" sortOrder="desc" rowHeight="200" margins="5" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true loadJQuery=true >}}
> Some of the devices: Logitech G Cloud, 3DS, PSP Go, PS Vita, Miyoo Mini Plus, RG35XX, Retroid Pocket 3/3+ and 2S.

---

This article is about my personal exploration of my year in gaming, inspired by [Spotify Wrapped](https://www.spotify.com/us/wrapped/), but with my own hands and a good amount of over-engineering. This introduction can be read by anyone (not developer knowledge needed), but if you don't want to read all of it is here just for the results, here is my (_autogenerated_) year in gaming:

{{< gallery match="images/*_2023.png" sortOrder="desc" rowHeight="400" margins="4" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true >}}

> :warning: Spoiler Alert :warning:
>
> My plan is to turn all of this into a website/app/social network that everyone can use, share what they are playing, which console they have and generate a year recap like this one. Stay tuned.

---

## How I keep track of my gaming sessions

As I already mentioned, I'm not a hardcore gamer, but I like to keep track of games that I'm playing, especially to make sure that I'm finishing some of them instead of just jumping from game to game. I've tried different apps for that, but it never felt right with the way that I want to keep track of that. 

As I was watching some of my favorite Youtubers about retrogaming in Brazil - [Cogumelando](https://www.youtube.com/@Cogumelando), I found out that he keeps track of the games that he is playing by simply using a Google spreadsheet. There is beauty in simplicity for sure, I just loved the idea and decided to do something similar. [Here you can check his Google Sheets for reference](https://docs.google.com/spreadsheets/d/1IiJLYBNuEt2q_Vg3h8uon0cvgEqABh9G1Y31n6an4TY/edit#gid=0).

As a developer myself, I tried to keep the balance of being able to build something a little bit fancier, but also I didn't want to spend a whole lot of time coding that (which you all gonna see that I ended up coding a lot for this gaming recap).

Instead. I decided to use [Airtable](https://airtable.com) which is a NoCode tool where you can model your tables/models and manage the data like a spreadsheet. You can also build some UIs with it, but I just use the spreadsheet interface. The big advantage compared with a simple Google Spreadsheet is that you can have data relationships and reference them on different tables in a much nicer and easier compared to a simple spreadsheet. I can also add/remove fields easily, like recently I added the concept of "Game Serie" which you can see later.

{{< gallery match="images/airtable-gaming-journal.png" rowHeight="400" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true >}}

---
You can also check it online here as I shared it publicly: https://airtable.com/apph8AUBqD35R45Fm/shr5G8thXrzGUPFdu

### My Airtable data model

{{< figure src="images/dbdiagram.png" >}}

I've basically 5 tables in my Airtable database.
* **Games**: A video game on a given **Platform**.
* **Series**: Super Mario World Mario is part of the Mario series of **Games**
    * I've recently added this to track which series I play the most.
* **Platform**: A video game platform, which is separated from the physical **Console**, as some **Games** can be emulated or played remotely. 
    * This separation is one of the key reasons why I went down this rabbit hole of creating my own system, as most apps/websites out there don't have this separation.
* **Console**: A device that can play **Games**, in some cases from a single **Platform** or multiple ones. A Nintendo Switch can mostly play Switch games, but a Retroid Pocket 2S for example can play NES, SNES, PS1, N64, Dreamcast, etc. 
* **Playthroughs**: the core of the database, this is where I keep track of the **Games** that I'm playing, how much time I've spent and on which **Console** I played it.

You can check all the fields in the link above. Feel free to copy it and/or create your own based on that. 

### Limitations of using Airtable

Airtable is an amazing tool, especially for generating different views on top of your data. For example, I also have a Kanban view to see which games I'm playing/finished/abandoned/etc:

{{< figure src="images/airtable-kanban.png" title="Kanban view" alt="Kanban view" >}}
---

But doing some complex queries is not that nice, especially as I have a background as a data engineer, I've always missed querying data using SQL. For example, Airtable allows you to do some basic aggregations, as I do by aggregating my playthroughs by Console, Platform and Year, but I want something more condensed, without showing all the other fields. And doing aggregation by multiple fields is also cumbersome and the UI becomes confusing by doing so. So to answer a simple question like - "What are my most played **Console** in **2023** ?", Airtable UI goes too much in the way to show that.

{{< figure src="images/airtable-agg.png" title="Here is an example to answer the 'Most played console in 2023' - Airtable shows too much data in aggregations."  alt="Here is an example to answer the 'Most played console in 2023' - Airtable shows too much data in aggregations." >}}

To create my own gaming version of Spotify Wrapped, I want to be able to aggregate data in many different ways and create visualizations on top of it. To overcome this limitation, I had to do some over-engineering and write some code. More high-level details are in the next section, but this is a more technical section, so a developer background is needed, but feel free to skip it.

## My crazy solution to build my own gaming recap

Here is a diagram of the different pieces to generate this gaming recap:

{{< figure src="images/architecture.png" title="Project architecture" alt="Project architecture" >}}
---

The first part here is to be able to query Airtable data using SQL. To solve that, I decided to build a MySQL compatible server that will show the Airtable as an SQL database, where we can query data in the same way that we are used to such a system, allowing us to do JOINs, filter data, aggregate it, etc. Basically do anything we can describe with SQL. At this point of this article, you might be wondering - "this guy might be a genius to decide to code a whole MySQL server for that like is nothing". 

Well my beloved reader, the good news is, I'm not that smart. I have been reading a lot of databases this year and one project that I was always trying to play with is the [dolthub/go-mysql-server](https://github.com/dolthub/go-mysql-server) library. This project provides a MySQL compatible server and you only need to implement the storage layer for it. And that's exactly what I did. By using Airtable API, I created a storage layer that shows Airtable tables as SQL Tables, use the API to fetch data and allow users to write SQL queries on top of them. 

You can read more about [how I build a MySQL server interface to Airtable here]({{< relref "../2023-12-29-overengineering-my-gaming-journey-airtable-mysql-bridge" >}}).

To generate the images, I had some experience in the past making custom charts and data visualization using [D3](https://d3js.org/), which is an amazing library for Dataviz. But as I've been coding in Go lately, I decided to build that in Go by using some basic drawing primitives with [fogleman/gg](github.com/fogleman/gg). Is not as powerful as D3, but the charts that I want to generate are not that fancy. To fetch video game box art automatically, I've used [Serper API](https://serper.dev/) as a wrapper for Google Image API.

You can read more about [how I generated charts in Go here]({{< relref "../2023-12-29-overengineering-my-gaming-journey-drawing-charts-go" >}}).

All the code is available on Github: [alvarowolfx/gamer-journal-wrapped](https://github.com/alvarowolfx/gamer-journal-wrapped)

## Comparing with the previous year

The nice thing about creating all this is that I can generate recaps for previous years and analyze them in comparison with this year. Here is my recap from 2022, even though back in the day I haven't had all the tools that I developed this year:

{{< gallery match="images/*_2022.png" sortOrder="desc" rowHeight="400" margins="4" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true >}}

## Unwrapping my gaming year and promises for next year

Some of the interesting insights that I discovered from my data analysis:

* I played much more from a portable device than in previous years. 
> With our newborn son, we are avoiding showing him screens, so that translates to us not using the TV that much and I ended up playing more on handhelds. Even my PS5 games were mostly played via Remote Play
* I did a better job of completing games than last year, which means that maybe this whole system is helping me keep track of what I'm playing.
* Even though I like to say that I love to play old games, I still spend a good amount of time on modern games on my PS5 and Switch. 
* Some games are always on my list: Legend of Zelda, Castlevania, Megaman, Pokemon, Metal Gear Solid, Metroid and others
* I have a lot of good memories of the Nintendo DS and PSP, although PS1 and SNES are still the top retro platforms in my playthroughs. For the next year, I want to spend more time on PSP and play classics like Patapon, Metal Gear and the GTA series.
* I still need to give more chances to PS2 and Gamecube. I had a PS2 as a teenager and have fond memories of it, but back in the day I never played Gamecube, so I need to explore more the library for it.
> About PS2 and PSP, I want to replay all GTA games again and try to play GTA V (which after all this time I never gave a chance to it)

---

And that's it for this article. If you want to go deeper into the dev/technical side of how I generated all those insights, you can check the other posts that are part of this series. Hit me on Twitter or any of my social media profiles if you like what you saw here and if you have any feedback.
