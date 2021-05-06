![App Logo](/assets/roundicon.png)
[![Playstore Logo](/assets/smgplaylogo.png)](https://play.google.com/store/apps/details?id=com.jetcoderz.flightlog)
[![Appstore Logo](/assets/appstorelogosm.png)](https://apps.apple.com/jp/app/flightlog-app/id1564235311)

# Flightlog APP
A journal app to keep track your flight history with data from aviationstack API. Deployed on both the app store and google play.
This is a team project created during our study at Code Chrysalis, a Tokyo-based fullstack bootcamp. 

## User Story and Features
* User should be able to add/delete flights 
  * Add flight with data from Aviationstack API
  * Attach photo to flight
* User should be able to view/analyse own flight history
  * View flight list with filter
  * Flight Map
  * User Statistics: total flights, flights by months, flights by airlines
  * Achievements: Airline collection

## Tech Stack
<img width="1090" alt="Screen Shot 2021-05-05 at 16 27 05" src="https://user-images.githubusercontent.com/34878933/117110530-35552d00-adc1-11eb-81aa-d73f710781bf.png">

* Front End
  * React Native
  * Expo
  * deployed: Google Play, Apple App Store
* Back End (API server)
  * Express.js
  * Knex.js
  * deployed on AWS Lambda with AWS API Gateway
* Back End (Database)
  * Postgresql on AWS RDS
  * Aviationstack API data
* Back End (Photo Storage)
  * AWS S3

## Setup Guide

If you are interested to clone and run this project on your local machine. You need to have __Expo__ framwork installed. Please refer to the guide here for installation. 

https://docs.expo.io/get-started/installation/

After cloning the project, you may start running it by installing the dependencies and start the expo engine by the following code.

```
yarn
expo start
```

## Demo Event
[Youtube](https://www.youtube.com/watch?v=S9GBXQEosK4)  
[Slides](https://docs.google.com/presentation/d/e/2PACX-1vTu4qba9OaHq6due-QpBz0w6pD8g6tvZVjn5mXoQ8SUCEEeAjejlLbs_Kvncs8LZj2ppxUrcWzKkObp/pub?start=false&loop=false&delayms=3000#slide=id.gd522241c73_3_0)

## Sample App Screens

<img width="300" alt="pic1" src="https://user-images.githubusercontent.com/34878933/117110545-3be3a480-adc1-11eb-9ab0-9d61eec3b2fe.PNG">
<img width="300" alt="pic2" src="https://user-images.githubusercontent.com/34878933/117110547-3c7c3b00-adc1-11eb-9c5b-743d900c6b8b.PNG">
<img width="300" alt="pic3" src="https://user-images.githubusercontent.com/34878933/117110550-3c7c3b00-adc1-11eb-8e2b-c80688dd3254.PNG">
<img width="300" alt="pic4" src="https://user-images.githubusercontent.com/34878933/117110552-3dad6800-adc1-11eb-900f-98fc1be64861.PNG">


