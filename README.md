# Davey-Message-Test-Harness
A simple React app for trying out Davey message formatting

## Prerequisities
You will need to have NodeJS installed. This project was most recently developed using v16.18.0 of Node, so that version is guaranteed to work. Make sure to run `npm install` before trying to run a local instance. Use `npm start` to launch the app locally. This app makes no calls to any externals applications or services so there will be no issues running locally.

## General Info
This app is built to be a basic test harness for testing out message formatting in the Davey Portal MessageCard component. It uses TypeScript and most of the code is copied from the Davey source code so as to replicate the development side as much as possible. The general flow of the testing here is to fill in the form on the left side (this replicates the user experience). You will see the resulting unformatted text in the middle of the screen with the right side of the screen showing the final MessageCard component as the user would see it. This app leverages React's hot reload abilities, so just save the formatting component and the screen will update.
