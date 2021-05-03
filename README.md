![App Logo](https://play-lh.googleusercontent.com/-QNQgf458bap1zT8ET9WCBPuDxL4t3O7opV1aBkRhbXMoEDGaBOAx4EKFpFoMPi6j-o=s180)
# Flightlog APP
A journal app to keep track your flight history with data from aviationstack API. Plan to be deployed on app store and google play.
This is a team project created during our study at Code Chrysalis, a Tokyo-based fullstack bootcamp. 

## User Story and Features
* User should be able to add/delete flights 
  * Add flight with data from Aviationstack API
  * Attach photo to flight
* User should br able to view/analyse own flight history
  * Flight list with filter
  * Flight Map
  * User Statistics
  * Achievements: Airline collection

## Tech Stack
<img width="796" alt="Screen Shot 2021-04-25 at 21 55 35" src="https://user-images.githubusercontent.com/34878933/115994215-03013e00-a611-11eb-8dfa-8ac3c2972c69.png">

* Front End
  * React Native
  * Expo
  * (Planned) deployment on App Store and Google Play
* Back End (API server)
  * Express.js
  * Knex.js
  * deployed on AWS Lambda with AWS API Gateway
* Back End (Database)
  * Postgresql on AWS RDS
  * Aviationstack API data
* Back End (Photo Storage)
  * AWS S3

