# Google Sheets Provider
Create a provider to consume data from Google Sheets inside Insights for ArcGIS

## Overview

Insights for ArcGIS can connect to any data source using the provider patter.  This project includes an example Koop provider compatiable with Insights for ArcGIS. 
Javascript is used to create an express web server, which includes web service that knows how to communicate with Google Sheets.  
While under review, the web service will be compatiable with Insights for ArcGIS.

## Dependencies

* NodeJS

## Instructions

``` git clone https://github.com/ArcGIS/google-sheets-provider.git ```

``` cd google-sheets-provider ```

``` npm install ```

``` npm start ```


e.g. Once you've run ``` npm start ``` you should see something like this:
[https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/FeatureServer/0](https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/FeatureServer/0) 


## Deployment 

You have 3 deployment options.  

**Option 1 -** This is a good option if you do not have Portal for ArcGIS staged in a place for development. 

* Create an [NOW](https://zeit.co/now) account, which enables free hosting of SSL NodeJS services
* Download and install NOW
* From inside the ``` google-sheets-provider ``` run ``` now ``` in your terminal
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

After your Google Sheets provider web service is running, read below on how to bring this content into portal. 

## Add Provider to Portal for ArcGIS

* Log into portal as a publisher or admin
* Click ``` My Content -> Add Item -> From the web ```
* Complete the form as follows:
Type: ``` ArcGIS Server Web Service ```

Url: ``` https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/FeatureServer/0 ```

Title: ``` Google Sheets ```

Tags: ``` Park Cleanup, Insights, Provider ```


## Add Provider to Insights

* Log into Insights for ArcGIS
* Click ``` New Workbook ```
* Browse for ``` Google Sheets ``` and select
* Click Add

# Other Useful Information

If you do not have the flexibility to deploy the project to a development environment, feel free
to give the sample Google Sheets provider I created here.

[https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/FeatureServer/0](https://googlesheets-provider-hkrquwqwvp.now.sh/googlesheets/FeatureServer/0) 