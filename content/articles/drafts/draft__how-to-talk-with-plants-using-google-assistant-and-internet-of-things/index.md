---
title: "How to talk with plants using Google Assistant and Internet of Things"
author: ""
date:
lastmod: 2021-02-26T10:52:04-04:00
draft: true
description: ""

subtitle: "Building a smart garden monitoring and watering system is too mainstream. With this guide, you’ll be able to have a more intimate…"

image: "/articles/draft__how-to-talk-with-plants-using-google-assistant-and-internet-of-things/images/1.png"
images:
  - "/articles/draft__how-to-talk-with-plants-using-google-assistant-and-internet-of-things/images/1.png"
  - "/articles/draft__how-to-talk-with-plants-using-google-assistant-and-internet-of-things/images/2.png"
---

#### Building a smart garden monitoring and watering system is too mainstream. With this guide, you’ll be able to have a more intimate relationship with your plant and feel that you are indeed taking care of it.

Demo video of the project.

A lot of people like to cultivate some herbs and plants at home and there a lot of different reason for why they do it. Some people use their sprouts, fruits or vegetables for cooking, making tea or some homemade medicines. Others say that like to see their consistency and growth thought days. Some say that they reduce stress, improve well being and make their surrounding more healthy.

But doing a quick research about this subject, I found that one of the center parts of owning plants at home is that **you have to take care** of them and this action that actually **will make you feel better**. If you automate this process, a lot of the reason to have then loose sense.

[Cultivating kindness with plants](https://medium.com/kindlab/cultivating-kindness-with-plants-7ad555a82a08)

So that why I came up with this project. Instead of automatic watering and monitoring your plant, you now will be able to talk with them anywhere and continue to take care of them, giving some water, asking how they are feeling and so on.

For this project, I’ll focus on using a **Particle Photon** board connecting directly to **Google Cloud**, but the code has also an example of using an **ESP8266** board connecting through **Cloud IoT Core** using **MQTT** protocol. The data is processed in an event-based way using **Firebase Cloud Functions**, that also handles the **Dialogflow** conversation fulfilments and updates the device current state in **Firebase Realtime Database**, to be queried when talking with the device. Our architecture will look like this:
![image](/articles/draft__how-to-talk-with-plants-using-google-assistant-and-internet-of-things/images/1.png)
Overall architecture of the project

#### **Do I need to be an expert on Natural Language Processing and Audio processing ?**

I have good news. For working with voice interfaces nowadays most of the time you don’t to deal with that. All of those voice assistants have a layer that does the heavy part of translating speech to text when the user interact with you application and you can easily respond back just by sending text back, that the same layer will convert the text to speech back to the user.

But dealing with text and trying to identify what the user wants, capture parameters and mapping those to your application still can be a hard thing to do. For our lucky there are tools that can help us a lot to solve that problem, without having to make all the natural language processing yourself. One of those tools is **Dialogflow**. But to use it, you have to understand a little bit some concepts involved in a conversation interface.

#### Conversation design and **Dialogflow**

The most important part of creating a Voice UI is to focus on the conversation design. It’s important to think on how the user will interact with you agent and model the chat covering those cases. To help with that, here I’ll present here a some quick concepts involved in a conversation design.

Most of the conversational interfaces requires an **Invocation** to start the interaction with the agent. In our project for example, will be **Talk to My Smart Plant**, which is an explicit way to invoke an app using Google Assistant. After this, your application is in full control of the conversation and you have to handle all the interactions with the user.

Before the user wanted to call your app, he had some kind of intention or objective to do with your app. This is what we call **Intents**. Maybe the user wants to search for recipes, book a flight or cancel a hotel reservation. And of course, the user expects a proper response depending on his intent.

For each one of those intents, the user can have many different ways to express himself and trigger those intent. Those are called **User says**. \***\* In **Dialogflow\*\* you can add as many examples of how the user can trigger a given intent. Try to keep your intents more focused and short, so will be easier for you to respond properly and think on examples on how the user want to trigger them.

And also is a good time to think about the parameters that the user can say and think about which ones are required or not. If a parameter is required and the user don’t say them, you can also configure follow-up question to ask for those required parameters to the user.

But parameters can be anything, the user might be searching for a chicken soup, but can also search for a tomato soup or a chicken salad. Looking on those example we can think of the chicken and tomato as **ingredients** and soup or salad as **recipe types** and use them as parameter for searching for recipes. Recipe types and ingredients here are what we call **Entities**. You can use entities as wildcard placeholder, to make your User Says more generic.

After you register some entities on **DialogFlow**, the interface will start to identify them as you type examples for the intents and map them as parameters. DialogFlow have a lot of generic parameters, like dates, intervals, weekdays, regular expressions that you can also use as parameter for you application.

And finally, after you know what the user wants and you know the parameters, the only think remaining is to give a proper response to the user. You can set some fixed responses on DialogFlow but the exciting part is that you can plug your own backend and handle the responses depending on the parameters received. Those are called **Fulfillment**.

Basically you can configure a webhook that will received all of those requests and them you can use **DialogFlow** SDK to generate responses accordingly.

[Dialogflow SDKs | Dialogflow](https://dialogflow.com/docs/sdks)

And where Google Assistant comes in? Google Assistant is one of the possible integration with DialogFlow, you can use the same tool for Facebook Messenger, Telegram, Alexa, and so on. In this case, the Assistant is just a one of the ways to interact with the user. Well, enough talk, let’s see all of this applied to the Talking Plant project.

#### Conversation design for talking with a plant

I made a diagram with the intents that I mapped for this application and here I’ll detail just some of them as examples. You can import the agent on your DialogFlow project and see all the intents and user says if you want more details.

[Build a diagram of the conversion, maybe using a Mind Map]

#### Setup Particle Board and Google Cloud integration

[Point to Particle website on how to setup this, doesn’t not make sense to put screenshots as this can change]

#### Wiring and Programming the hardware

[No further details, just the BOM, some hardware decisions and present the schematics]

![image](/articles/draft__how-to-talk-with-plants-using-google-assistant-and-internet-of-things/images/2.png)
Update the Fritzing schematic

#### **Publishing our Cloud Function**

[ Just explain some important parts of the implementation and deploy it]
