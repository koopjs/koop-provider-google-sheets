# Google Sheets Provider
Create a provider to consume data from Google Sheets inside Insights for ArcGIS

## Overview

Insights for ArcGIS can connect to any data source using the provider patter.  This project includes an example Koop provider compatiable with Insights for ArcGIS. 
Javascript is used to create an express web server, which includes web service that knows how to communicate with Google Sheets.  

## Dependencies

* NodeJS

## Instructions

### Configuration

1. Obtain an API Key for Google Sheets - [instructions](https://developers.google.com/sheets/api/guides/authorizing#APIKey)
2. Add the api key to you configuration
 - option 1: edit config/production.json and replace the value under googlesheets.auth with your api key
 - option 2: before running your server add your auth to your environment e.g. `export GOOGLESHEETS_AUTH=YOUR_KEY 

`git clone https://github.com/ArcGIS/google-sheets-provider.git`

`cd google-sheets-provider `

`npm install`

`npm start`


After `npm start` you should see something like this:

```bash
> node server.js

info: registered output: Geoservices 1.1.1
No root directory was specified, defaulting to:  /Users/foobar/koop/providers/google-sheets
info: registered filesystem: localfs 1.1.1
info: registered provider: googlesheets 1.0.0


Koop Trimet Provider listening on 3000
For more docs visit: https://koopjs.github.io/docs/specs/provider/
To find providers visit: https://www.npmjs.com/search?q=koop+provider

Try it out in your browswer: http://localhost:3000/googlesheets/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/Park%20Cleanup!A1:H/FeatureServer/0/query
Or on the command line: curl --silent http://localhost:3000/googlesheets/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/Park%20Cleanup!A1:H/FeatureServer/0/query?returnCountOnly=true

Press control + c to exit
```

## Deployment 

You have 3 deployment options.  

**Option 1 -** This is a good option if you do not have Portal for ArcGIS staged in a place for development. 

* Create an [NOW](https://zeit.co/now) account, which enables free hosting of SSL NodeJS services
* Download and install NOW
* From inside the `google-sheets-provider` run `now` in your terminal
* You will end up with this provider being hosted in NOWs free cloud

**Option 2 -** Arrage to have NodeJS installed on your 10.5+ Portal for ArcGIS machine

* Make sure port 3000 is open and NodeJS is installed
* Copy files to your machine with Portal for ArcGIS
* Follow the instructions above

**Option 3 -** Access a web access machine and deploy the project files

* Make sure port 3000 is open and NodeJS is installed
* Copy files to the web accessable machine
* Follow the instructions above

# Getting Started

Once the Google Sheets provider is running, read below on how to bring this content into portal. 

## Add Provider to Portal for ArcGIS

* Log into portal as a publisher or admin
* Click `My Content -> Add Item -> From the web`
* Complete the form as follows:

**Type:** `ArcGIS Server Web Service`

**Url:** `https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/Park%20Cleanup!A1:H/FeatureServer/0`

**Title:** `Google Sheets`

**Tags:** `Park Cleanup, Insights, Provider`

## Add Provider to Insights

* Log into Insights for ArcGIS
* Click `New Workbook`
* Browse for `Google Sheets` and select
* Click Add

# Other Useful Information

If you do not have the flexibility to deploy the project to a development environment, feel free to try out the sample below.

https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/1JlPaiuIHXmkfpLBaQdoRixPSasjX5NlDte70pyFT9yI/Park%20Cleanup!A1:H/FeatureServer/0
