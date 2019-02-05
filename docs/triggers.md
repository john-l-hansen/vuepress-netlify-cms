---
title: Triggers
---
## 3.1 Audio Trigger Configuration

### 3.1.1 Actv8 Background Service Listening

For android the audio service inside of the Actv8 library is already a service that will listen in the background so long as it is active.  In order to use the listening service the application must provide the application context to the SDK so it can control when the service starts and stops.
Once this is done, the start and stop methods can be used as follows:

```java
CoreLibrary.getInstance().startListening();
CoreLibrary.getInstance().stopListening(ChangeReason reason);
```

If either of these methods are called before passing the context they will have no effect.

The ChangeReason in stopListening will change auto mode to false if the reason is LOW_BATTERY.

Once the context is available to the SDK the service can be stated and stopped whenever it is needed.  The service will continue to listen so long as it is not stopped which means it can listen even when the application is put into the background.  

The service requires the activity to exist in order to run so it is recommended to call stopListening() in the Activity’s onDestroy() method to avoid any unnecessary crashes.

### 3.1.2 Auto Mode Configuration

Auto mode is a feature that is used for when the Activity that is running the service is in the background but the application still wants promotions to be inserted into the user wallet.  In order to use this feature, call the following method:

```java
CoreLibrary.getInstance().setAutoMode(true, ChangeReason.USER_REQUEST);
```

Passing a true value will turn auto mode on while passing a false will turn auto mode off.  When auto mode is on and the audio service is enabled the SDK will insert any promotions heard into the current user’s pending wallet.  It is important to note that this feature is only useable if there is a valid user signed into the SDK.

Auto mode will remain on as long as the above method is not called with a false parameter, or for a set amount of time based on a configuration found in the configuration.xml:

```html
<integer name ="auto_mode_duration">3600</integer>
```

The integer value passed is the time in seconds that auto mode will remain on without interaction.  The above line is the default amount of time of one hour.

### 3.1.3 Notes

+ In order to use any listening service the SDK must be installed based on the installation instructions found in …
+ Auto mode can only be used when a valid user is logged in.  It will not be able to insert a promotion into a wallet otherwise.
+ The audio service needs exclusive access to the microphone in order to run.  This means that if a different process is using the microphone then the service will not be properly started.  Conversely if the service is running and a different process tries to access the microphone it will not be able to.




## 3.2 Touch Trigger Configuration

### 3.2.1 Overview 

The actv8SDK has the ability to handle Touch events as triggers. Touch events are simply triggers defined by a user interface button(like a “catch” button). The values sent to the server are managed by the actv8SDK, so all that needs to be done is for the application to call the following code when the appropriate button is pressed. The signal will be sent to the server and a promotion will be returned to the corresponding Activity if it extends Actv8Activity, or if the Activity implements “OfferListener” interface.

```java
DailyTrigger trigger = new DailyTrigger();
trigger.onTriggerData(A8DataDic.values.get(A8DataDic.index));
```




## 3.3 Beacon Trigger Configuration

### 3.3.1 Overview 

The actv8SDK has the ability to detect beacons and treat them as events and triggers. When detected the SDK will interpret their ID and send it to the server so the SDK can recieve the proper content. The values sent to the server are managed by the actv8SDK, so all that needs to be done is for the application to call the following code which will start a service for each kind of beacon available (Kontakt and Gimbal beacons).

```java
CoreLibrary.getInstance().startKontaktService();

CoreLibrary.getInstance().startGimbalService();
```

If you try to call these methods while the SDK has not been initialized they will throw an exception.

To Stop the services, simply call these methods:

```java
CoreLibrary.getInstance().stopKontaktService();

CoreLibrary.getInstance().stopGimbalService();
```

Your license should determine if you can use the beacon triggers, so please contact Actv8 if you have any issues.
