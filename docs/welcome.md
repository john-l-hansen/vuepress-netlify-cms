---
title: Introduction
---
## 1.1 Overview

The ACTV8me SDK handles the management of ACTV8me proprietary promotion collection and  redemption  system.  It  includes  authentication  with  ACTV8me  servers,  access  to  ACTV8me trigger technologies, RESTful services consumption and media pooling from ACTV8me servers. ACTV8me  Digital  Wallet  system  synchronizes  trigger  events  with  promotions  registered  on  the cloud  and  tracks  them  from  issued  state  to  redemption  at  the  target  retailer  through  our partners.

### 1.1.1 Target

This document is aimed at Application developers that want to use the ACTV8me SDK to access ACTV8me’s promotion system in order to build an Android application.

## 1.2 Architecture
The ACTV8me SDK is a collection of classes use in the native Android development of mobile apps. ACTV8lib handles user login/logout functions, API calls to the ACTV8me "Catch" Servers and various "catch" technologies like Audio Barcodes.

### 1.2.1 Signal Catching
The ACTV8me SDK is designed to allow a mobile app to "catch" a signal and trigger a request from the ACTV8me database which returns to the user a promotion based on the signal value and the user profile.

### 1.2.2 Concepts

#### 1.2.2.1 Signal
A signal is a number transmitted through a technology to a mobile app.
For example: An Audio Barcode is a series of high frequency tones that will generate a number and is transmitted from an audio source to the mobile device's microphone, or a BluetoothLE (like iBeacon) transmits an ID code to a mobile device's Bluetooth radio.

#### 1.2.2.2 Trigger
A trigger is an event caused by the detection of a signal which would be validated by the SDK, and once validated, causes the mobile app to send a request to the ACTV8me Catch database to request a promotion or offer.

#### 1.2.2.3 Communication Transport
A Transport is any technology used to send a signal.
Examples:
- Audio Fingerprints and Watermarks
- BluetoothLE
- Geofencing
- Catch Buttons
- Push Notifications
- Push Events (xmpp/jabber)

### 1.2.3 Syndicated vs Non-Syndicated
In order to be able to connect a signal ID with an ad the user must have an account through ACTV8me.  This account not only stores all of the user information such as age, location, etc.  It also enables ACTV8me to track things like items saved to the wallet, claimed coupons and recognized prizes.  Depending on the nature of the application leveraging the SDK the developer will be using one of two different authentication routes in order to register and login their users, syndicated or non-syndicated.

#### 1.2.3.1 Syndicated Authentication
The Syndicated Authentication method is the method employed by app developers who already have a login workflow inside their application.  For example, Company X already has an app that lets users create an account with them.  In order to utilize the existing acounts and not have to make their clients re-register with a different service, Company X opts to use the syndicated authentication method.  Therefore when logging into the ACTV8me servers they send over the unique ID of the already created user along with their ACTV8me API Key which identifies them as a syndicated client.  This allows the existing user for Company X to register automatically with the ACTV8me servers.  A process that is completely seemless and unobtrusive to the end user.

#### 1.2.3.2 Non-Syndicated Authentication
The Non-Syndicated Authentication method is the method employed by app developers who do not already have a login workflow inside their application and want to leverage the ACTV8me workflow.  For example. Company Y has no concept of a user inside their application.  In order to utilize the ACTV8me framework Company Y opts to leverage ACTV8me's login process to register users through the ACTV8me workflow.  This allows Company Y's users to be able to take advantage of ACTV8me's capabilities.

**User Account Registration (email)**
1. Client app prompts user to register new account (email)
2. Client app sends request to create new user through ACTV8 SDK
3. ACTV8 API processes request
4. If registration succeeds, ACTV8 API generates a validation link using the validationEmailUrl provided by client.
5. The verification link is sent to the the user
6. The verification link expires 24 hours after been generated
7. User opens the received email and clicks on the verification link provided
8. User lands on the validationEmailUrl
  + Client gets value of the "vtk" parameter from the url and makes a POST (curl) request to the following endpoint: https://demo.actv8technologies.com/api/v3/core/userValidateEmail/format/json
  + Client must provide "apiKey" to authenticate this call
  + Client must provide the "vtk" (validation token)
Example of the request:

`
curl -H "Content-Type: application/json" -X POST -d '{"apiKey":"{clientApiKey}", "vtk" : "{validationToken}"}' https://demo.actv8technologies.com/api/v3/api/core/userValidateEmail/format/json/
`

Based on server response, client must present the user with a confirmation on the verification

## 1.2 Architecture
The ACTV8me SDK is a collection of classes use in the native Android development of mobile apps. ACTV8lib handles user login/logout functions, API calls to the ACTV8me "Catch" Servers and various "catch" technologies like Audio Barcodes.

### 1.2.1 Signal Catching
The ACTV8me SDK is designed to allow a mobile app to "catch" a signal and trigger a request from the ACTV8me database which returns to the user a promotion based on the signal value and the user profile.

### 1.2.2 Concepts

#### 1.2.2.1 Signal
A signal is a number transmitted through a technology to a mobile app.
For example: An Audio Barcode is a series of high frequency tones that will generate a number and is transmitted from an audio source to the mobile device's microphone, or a BluetoothLE (like iBeacon) transmits an ID code to a mobile device's Bluetooth radio.

#### 1.2.2.2 Trigger
A trigger is an event caused by the detection of a signal which would be validated by the SDK, and once validated, causes the mobile app to send a request to the ACTV8me Catch database to request a promotion or offer.

#### 1.2.2.3 Communication Transport
A Transport is any technology used to send a signal.
Examples:
- Audio Watermarks
- Audio Barcodes
- BluetoothLE
- Geofencing
- Catch Buttons
- Push Notifications
- Push Events (xmpp/jabber)

### 1.2.3 Syndicated vs Non-Syndicated
In order to be able to connect a signal ID with an ad the user must have an account through ACTV8me.  This account not only stores all of the user information such as age, location, etc.  It also enables ACTV8me to track things like items saved to the wallet, claimed coupons and recognized prizes.  Depending on the nature of the application leveraging the SDK the developer will be using one of two different authentication routes in order to register and login their users, syndicated or non-syndicated.

#### 1.2.3.1 Syndicated Authentication
The Syndicated Authentication method is the method employed by app developers who already have a login workflow inside their application.  For example, Company X already has an app that lets users create an account with them.  In order to utilize the existing acounts and not have to make their clients re-register with a different service, Company X opts to use the syndicated authentication method.  Therefore when logging into the ACTV8me servers they send over the unique ID of the already created user along with their ACTV8me API Key which identifies them as a syndicated client.  This allows the existing user for Company X to register automatically with the ACTV8me servers.  A process that is completely seemless and unobtrusive to the end user.

#### 1.2.3.2 Non-Syndicated Authentication
The Non-Syndicated Authentication method is the method employed by app developers who do not already have a login workflow inside their application and want to leverage the ACTV8me workflow.  For example. Company Y has no concept of a user inside their application.  In order to utilize the ACTV8me framework Company Y opts to leverage ACTV8me's login process to register users through the ACTV8me workflow.  This allows Company Y's users to be able to take advantage of ACTV8me's capabilities.

**User Account Registration (email) User launches client app**

1. User launches client app
2. Client app prompts user to register new account (email)
3. Client app sends request to create new user through ACTV8 SDK
4. ACTV8 API processes request
5. If registration succeeds, ACTV8 API generates a validation link using the validationEmailUrl provided by client.
  + The verification link is sent to the the user
  + The verification link expires 24 hours after been generated
6. User opens the received email and clicks on the verification link provided
7. User lands on the validationEmailUrl
8. Client gets value of the "vtk" parameter from the url and makes a POST (curl) request to the following endpoint: https://demo.actv8technologies.com/api/v3/core/userValidateEmail/format/json .
   + Client must provide "apiKey" to authenticate this call
   + Client must provide the "vtk" (validation token)
   + Example of the request:

   `
   curl -H "Content-Type: application/json" -X POST -d '{"apiKey":"{clientApiKey}", "vtk" : "{validationToken}"}' https://demo.actv8technologies.com/api/v3/api/core/userValidateEmail/format/json/
   `

9. Based on server response, client must present the user with a confirmation on the verification
   +Example of a successful request response (JSON):

   ` HTTP 200 - OK
  {
  "status": "200",
  "title": "success"
  }
  Example of an invalid request response (JSON):
  HTTP 400 - Bad Request
  {
  "status": "400",
  "code": "3008",
  "title": "No validation token provided"
  }
  `

**User Account Password Recovery (email)**

Based on server response, client must present the user with a confirmation on the verification

1. User launches client app
2. User attempts to login with email account
3. User does not remember password
4. Client app should provide a "forgot password" link
5. Client app prompts user to enter email associated with account
6. Upon user 's submission, client app requests a password reset through the SDK
7. ACTV8 API generates a password reset link using the passwordResetUrl provided by the client
8. ACTV8 API sends the password reset link to the user
9. User opens the password reset email and clicks on the password reset link
10. User lands on the password reset url provided by the client
  + Client should provide the user with a reset password form (new password / confirm new password)
  + Client should validate both fields match before sending request to ACTV8 server
11. Client sends POST request to change password to the following endpoint: https://demo.actv8technologies.com/api/v3/api/core/userResetPassword/format/json
  + Client must provide "apiKey" as a parameter to the request
  + Client must provide "newPassword" as a parameter to the request
  + Client must provide "ottk" (token from the URL) as a parameter to the request
  + Example of request:

  `
  curl -H "Content-Type: application/json" -X POST -d '{"apiKey":"{clientApiKey}","newPassword":"xabsvasyzs8261234", "ottk" : "{tokenProvidedOnTheUrl}"}' https://demo.actv8technologies.com/api/v3/api/core/userResetPassword/format/json/
  `

12. Upon ACTV8 API response, client must provide user with a confirmation on the request
  + Example of a successful request response (JSON):

  `HTTP 200 - OK
  {
  "status": "200",
  "title": "success"
  }
  Example of invalid request response (JSON)
  HTTP 400 - Bad Request
  {
  "status": "400",
  "code": "3012",
  "title": "API key has not been provided"
  }
  `
