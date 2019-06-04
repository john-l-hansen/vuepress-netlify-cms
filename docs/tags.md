---
title: 'Triggers '
---
## Audio Triggers Configuration 

### Actv8 Background Service Listening

For android the audio service inside of the Actv8 library is already a service that will listen in the background so long as it is active.  In order to use the listening service the application must provide the application context to the SDK so it can control when the service starts and stops.
Once this is done, the start and stop methods can be used.


Once the context is available to the SDK the service can be started and stopped whenever it is needed.  The service will continue to listen so long as it is not stopped which means it can listen even when the application is put into the background.  


### Auto Mode Configuration

Auto mode is a feature that is used for when the Activity that is running the service is in the background but the application still wants promotions to be inserted into the user wallet.  


Passing a true value will turn auto mode on while passing a false will turn auto mode off.  When auto mode is on and the audio service is enabled the SDK will insert any promotions heard into the current user’s pending wallet.  It is important to note that this feature is only useable if there is a valid user signed into the SDK.

Auto mode will remain on as long as the above method is not called with a false parameter, or for a set amount of time based on a configuration found in the configuration.xml:


The integer value passed is the time in seconds that auto mode will remain on without interaction.  The above line is the default amount of time of one hour.

###  Notes

* In order to use any listening service the SDK must be installed based on the installation instructions found in …
* Auto mode can only be used when a valid user is logged in.  It will not be able to insert a promotion into a wallet otherwise.
* The audio service needs exclusive access to the microphone in order to run.  This means that if a different process is using the microphone then the service will not be properly started.  Conversely if the service is running and a different process tries to access the microphone it will not be able to.

### Steps to Create Audio Triggers

1. Click Triggers then Audio in the dropdown

2. Select type of audio trigger “Audio Watermark” or “Audio Fingerprint”
 Creating Audio Fingerprint
3. Type in Name*

4. Click Select media then select media again to add desired audio media

5. If desired add tags then click the “+”

6. Type in Add Id, Brand, Media Type, Media Source and Network

7. Next Click “Delivery Preset Option”

8. Select  “Use Delivery Preset” or “Create Delivery Preset”
 Create Delivery Preset

9. Type in Delivery Preset Name

10. If you want to Enable Content Redelivery click box: The offer will get delivered until it is     
 saved or redeemed

11. Select Delivery Mode

A.	Multiple offer: Multiple offers will be triggers (2, 3, 4, 5, 6, etc)
  
B.	Sequential: Offers will come in the order they have been saved in preset 

C.	Random: Offers come in any order  

12. Click “+Add Default Content”: This is the content that will get delivered if all other content has   
  been delivered

13.  Enable Catch limit toggle on or off: This allows you to set a limit on          how many users can catch
              
  the content in a given period then you decide on the units of duration

14. Toggle on or off “Enable Prize delivery Rules” and select odds of winning and the amount and   
  period and duration again

15. Click “Create Delivery Preset”

16. Then if desired add to a specific campaign by click “+Add To Campaign”

17. Select the campaign then hit “Add”

18. Then if desired add to Application by clicking “+Add To Application”

19. Then Click Create at the top right of the screen to finish creating your 
    audio trigger

  ### Use Delivery Preset


20. Click "Add Delivery Preset"

21. Select chosen preset and click “Add” 
 
22. Next If desired to add to a campaign click Add to Campaign

23. Then select campaign from list and click “Add”

24. Next Click “+Add to Application” and select application from list and click Add

25. Then click Create Audio Trigger to finish


##  Touch Trigger Configuration

### Overview


The actv8SDK has the ability to handle Touch events as triggers. Touch events are simply triggers defined by a user interface button(like a “catch” button). The values sent to the server are managed by the actv8SDK, so all that needs to be done is for the application to call the following code when the appropriate button is pressed. The signal will be sent to the server and a promotion will be returned to the corresponding activity.

### Steps to Create Touch Triggers 

1. Click Triggers then in dropdown select Touch

2. Click “Add Touch” in the right top corner
 
3. Add Name, on the Name* Line
 
4. Then select Delivery Preset option and choose to create or use

5. After you have finished with Preset options you may add content or just click create to finish

6. You will be redirected to Touch Triggers list and your trigger will be at the top  



##  Beacon Trigger Configuration

###  Overview

The actv8SDK has the ability to detect beacons and treat them as events and triggers. When detected the SDK will interpret their ID and send it to the server so the SDK can receive the proper content. The values sent to the server are managed by the actv8SDK, so all that needs to be done is for the application to call the following code which will start a service for each kind of beacon available (Kontakt and Gimbal beacons).

If you try to call these methods while the SDK has not been initialized they will throw an exception.

Your license should determine if you can use the beacon triggers, so please contact Actv8 if you have any issues.

### Steps to Create Beacon Triggers 

1. Click Triggers then in the dropdown select Beacon

2. Click “Add Beacon Trigger” on the top right to start 

3. Type in the name of the beacon by clicking the Name* line

4. Next select the beacon you want to add by clicking “+Add Beacon”

5. Click on the desired one and then click Add

6. Repeat same steps as above for Delivery Preset and Adding to Campaigns and to   
  Applications 

7. Click Create to finish 

8. You will be redirected to Beacon Triggers list and your trigger will be at the top

## Geofence Trigger Overview 

### Geo-Location
* Geographic locations are used in two aspects of the SDK.
* First, the SDK would like to know the user’s location when they catch a trigger. To use this access, the key “NSLocationWhenInUseUsageDescription” must be set with a string value describing why it’s needed.
* However, if BluetoothLE devices are desired to be detected (iBeacons, Gimbals…), then instead, the key “NSLocationAlwaysUsageDescription” must be set with a string value describing why it’s needed. BluetoothLE devices are handled through the location manager on the iOS device.

### Also, if you are using Bluetooth Low Energy devices…
* To detect Bluetooth Low Energy devices, the key “NSBluetoothPeripheralUsageDescription”  must be set with a string value describing why it’s needed.

### Steps to Create a Geofence Trigger 

1. Click Triggers then in the dropdown select Geofences 

2. Click “Add Geofence” in the top right corner 

3. Click the Name* and Type in name of the Geofence 

4. Type in the location on the location tab or select a spot using the map powered by google

5. Select how many meters you want to be your range with the blue button below
 
6. The system will give you a longitude and latitude for reference 

7. Repeat same steps as above for Delivery Preset and Adding to Campaigns and to Applications
 
8.  Click Create to finish 

9. You will be redirected to Geofence Triggers list and your trigger will be at the top

