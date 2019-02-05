---
title: Android Introduction
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




## 1.3 Installation

Adding the ACTV8me SDK to your project as a dependency is relatively simple. However, you must be using either [Gradle][gradle] or [Maven][maven].

### 1.3.1 Requirements

#### 1.3.1.1 Dependencies

The ACTV8me SDK may be issued as a zip file which contains the AAR libraries, and is dependent on Google Play Services for location data.  

They can be included in the build.gradle file in the dependencies section as follows:
```java
compile project(':tvwalletsdk-release')
compile 'com.android.support:appcompat-v7:23.2.1'

compile 'org.springframework.android:spring-android-core:1.0.1.RELEASE'

compile 'org.springframework.android:spring-android-rest-template:1.0.1.RELEASE'

compile 'commons-io:commons-io:2.4'

compile 'com.google.code.gson:gson:2.7'

compile 'org.apache.httpcomponents:httpcore:4.4.1'

compile 'com.google.android.gms:play-services-location:8.4.0'

compile 'com.squareup.picasso:picasso:2.5.2'

compile 'com.squareup.retrofit:retrofit:1.9.0'

compile 'com.kontaktio:sdk:3.2.3'
```
Another way to access the ACTV8me SDK is to compile from our Maven repository, in which case you will need to add the following lines to the build.gradle file (Library versions can be updated as needed):

```java
compile 'me.actv8.core:actv8-sdk:3.1.2'

compile 'com.android.support:appcompat-v7:23.2.1'

compile 'org.springframework.android:spring-android-core:1.0.1.RELEASE'

compile 'org.springframework.android:spring-android-rest-template:1.0.1.RELEASE'

compile 'commons-io:commons-io:2.4'

compile 'com.google.code.gson:gson:2.7'

compile 'org.apache.httpcomponents:httpcore:4.4.1'

compile 'com.google.android.gms:play-services-location:8.4.0'

compile 'com.squareup.picasso:picasso:2.5.2'

compile 'com.squareup.retrofit:retrofit:1.9.0'

compile 'com.kontaktio:sdk:3.2.3'
```
If you are using Maven instead of Gradle, add the following dependency to your project's dependencies:

```xml
<dependency>

    <groupId>me.actv8.core</groupId>

    <artifactId>actv8-sdk</artifactId>

    <version>3.1.2</version>

    <type>aar</type>

</dependency>
```

#### 1.3.1.2 Android Manifest

Based on the SDK configuration, certain permissions are required in order to run the SDK. You’ll need to add those permissions in your manifest (AndroidManifest.xml):

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
If you want to use the bluetooth beacon technologies in the SDk you will need to request:

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```


#### 1.3.1.3 Application Token

Before being able to communicate with Actv8 servers, you’ll need to register your application with ACTV8me and get a SDK license. In order to do this, you will need to provide the Application ID and the SDK Version you are using to the [Registration Page](http://dev.actv8me.com/).
Once you get a token, you need to copy the token and place it inside a file called “a8license.dat”. This file should reside inside the “assets” folder on Android Studio.

### 1.3.2 Configuration File

Include a configuration.xml inside the “values” directory. The configuration file sets the duration for auto mode, the URL that you will hit with your calls, and a Boolean value to view debug information.

```xml
<resources>
    <bool name = "debug_mode">true</bool>

    <string name="app_load_api">
YOUR_URL_HERE/api/v2/index.php/api/core/appLoad/format/json</string>
    <!-- 3600 = 1 hour -->
    <integer name ="auto_mode_duration">3600</integer>

</resources>
```

[gradle]: http://gradle.org/ "Gradle"
[maven]: https://maven.apache.org "Maven"





## 1.4 Workflows

### 1.4.1 Application Lifecycle

#### 1.4.1.1 Initialization

There are two ways you can initialize the SDK:  Extending Actv8Activity or Manual Initialization.

To use the extend method, create your main activity by extending the Actv8Activity class. It should generate methods to be overridden.

```java
public class MenuActivity extends Actv8Activity {
    @Override
    public String getApiKey() {
    // TODO Auto-generated method stub
    return null;
    }

    @Override
    public String getApiOwner() {
    // TODO Auto-generated method stub
    return null;
    }

    @Override
    protected HashMap<String, Class<?>> getDialogs() {
    // TODO Auto-generated method stub
    return null;
    }

    @Override
    public List<String> getWallets() {
    // TODO Auto-generated method stub
    return null;
    }

    @Override
    protected boolean isCatchEnabled() {
    // TODO Auto-generated method stub
    return false;
    }

    @Override
    public void processError(int arg0, String arg1) {
        // TODO Auto-generated method stub
    }

    @Override
    public void processLoginStatus(LoginStatus arg0) {
        // TODO Auto-generated method stub
    }

    @Override
    public void processNewOffer(DigitalOffer arg0) {
        // TODO Auto-generated method stub
    }

    @Override
    public void processRequestFromServer(Bundle arg0) {
        // TODO Auto-generated method stub
    }

    @Override
    public void processWalletUpdate() {
        // TODO Auto-generated method stub
    }
}
```

* `GetApiKey()` and `getApiOwner()` are the credentials needed to access the server APIS (cf 2.4). Those methods should return those credentials information and shouldn't be visible to the end user.

* `GetWallet()` returns the list of supported wallets by this Activity. Currently, the SDK support two types of wallet:
    + Wallet
    + Pending

* `isCatchEnabled()` returns true if the Activity can listen and process promotion on trigger.

* `ProcessError()` determines what to do on error. It can be used to display a message to the user. The arguments are the errorCode and the error Message.

* `ProcessLoginStatus()` is called upon login notification.

* `ProcessNewOffer()` is called when a trigger has a valid offer to display to the end user.

* `ProcessRequestFromServer()` is called whenever the server has a message to display to the end user.

* `ProcessWalletUpdate()` is called upon wallet update from the server.

The method `onCreate()` is overridden in order to initialize the SDK called through the CoreLibrary interface. The CoreLibrary is the main access to the SDK and can’t be instantiated. `getInstance()` needs to be called in order to retrieve the unique instance of the Library.
* *Note: The Library should only be initialized from the main activity.*
* In order to initialize the CoreLibrary, the Application needs to provide the Application Context and set any listeners to the activity you are utilizing.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);;
    CoreLibrary.getInstance().initSoundCode(getApplicationContext());;
    CoreLibrary.getInstance().addWalletUpdateStatusListener(this);;
}
```

Initializing the SDK is an asynchronous process and in order to synchronized the process, the Activity needs to implements the Interface “OnInitListener”. Through this interface, the CoreLibrary will notify the Activity when the Initialization process is done with the method “onInitDone”.

```java
@Override
public void onInitDone(int arg0) {
    initWallet();
}
private void initWallet(){
    for (String wallet : getWallets()) {
        wallets.put(wallet, CoreLibrary.getInstance().getWalletLightInfoList(wallet));
    }
}
```

The Activity should get the wallet item list after the initialization is done. The List of DigitalOfferLight can be used with a ListAdapter for display purpose.

If you want to use the manual initialization method, follow the following steps:

In your onCreate in the Activity you wish to use the library include the following call:

```java
try {
    PackageInfo pInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
    CoreLibrary.getInstance().init(pInfo.packageName,
            pInfo.versionName, "00000000", pInfo.packageName, this);
} catch (PackageManager.NameNotFoundException e) {
    CLog.e("Actv8Activity onCreate Trace:", Log.getStackTraceString(e));
}
```

You should also add any listeners the Activity will use in onCreate after this call, for example the following lines will make the Activity react to wallet updates and catching offers:

```java
CoreLibrary.getInstance().addWalletUpdateStatusListener(this);
CoreLibrary.getInstance().setOfferListener(this);
```

#### 1.4.1.2 Activity State Change

After the CoreLibrary has been initialized, it needs to be updated of the main Activity state and be notified with its own methods:

* **onRestart** `CoreLibrary.getInstance().onRestart(this);`
* **onResume** `CoreLibrary.getInstance().onResume(this);`
* **onPause** `CoreLibrary.getInstance().onPause(this);`
* **onStop** `CoreLibrary.getInstance().onPause(this);`
* **onDestroy** `CoreLibrary.getInstance().shutDown(this);`

Those methods are taking the current activity as parameters for dependency on the Activity context.

### 1.4.2 Core Functionality

#### 1.4.2.1 Listening for Triggers

The CoreLibrary allows the application to access Actv8 trigger protocol. A Trigger can be from any sources depending on the SDK and the configuration. It can come from multiple sources. It is an event caused by the detection of a signal which would be validated by the SDK, and once validated, causes the mobile app to send a request to the actv8me Catch database to request a promotion or offer. The Activity registers to the Trigger event with the Interface “OfferListener”.

*Note:  To  catch  an  offer  from  the  trigger,  the  user  of  the  Application  doesn’t  need  to  be  logged  in.  However,  if  the  user  wants  to  save  the  promotion,  the  application  needs  to  request  the  user’s  credentials.*

“OfferListener” interface allows the SDK to notify the user of a new promotion with the method “onNewOffer(final DigitalOffer newOffer)”. It will provide the information of the new Promotion with DigitalOffer which implements Parcelable:

```java
    @Override
    public void onNewOffer(List<DigitalOffer> list, SessionInterface.CatchItemStatus catchItemStatus) {
        if (progress != null) {
            progress.dismiss();
        }
        if(list != null && catchItemStatus.getErrorCode().errorCode == 0) {
            <YOUR CODE HERE>
        } else {
            Toast.makeText(MainActivity.this, "Error retrieving promotion", Toast.LENGTH_SHORT).show();
        }
    }
```

The SDK process of scanning for a promotion/Trigger can be controlled from the Application with the methods “starListening()” and “stopListening()”. The SDK keeps track of the Application request and will automatically stop the listening process when `onPause()` is called and restart it`onResume()` if startListening has been called.

#### 1.4.2.2 Login/Register

Aside from catching a new Promotion, all other requests and functionalities require the user to be authenticated. The current default authentication choice is for Non-Syndicated users which is by email. Once the user registers for an account, he/she will receive a confirmation email that prompts him to activate the account. For an Non-Syndicated user, they will not be able to log in until he has activated the account. 

“isUserLogged()” can be called from the CoreLibrary to find if the user is logged or not. If the User is not logged and doesn’t not have an account, a new account can be created through “CoreLibrary.getInstance().register(Activity activity, User user, String password)”. Note, this is for Non-Syndicated users only. User is defined by the SDK “me.actv8.core.classes.User”. A new user needs to provide a valid email and a password. Other fields are optional and must remain null or empty if not set. Upon registration success, the SDK will automatically log the user in.

The Login process is done with “CoreLibrary.getInstance().login(Activity activity, String UserName, LoginType, String password)”. FOr Syndicated users, the process is simple. They just need to call "CoreLibrary.getInstance().login("actv8androidtest", User.LoginType.SYNDICATED, "")" and this will handle the whole authentication process.

In order to be notified by the Login result and the registration result, the Activity needs to implement the interface “LoginStatusCallback”. It will then be notified with “onLogin(final LoginStatus status)”.

#### 1.4.2.3 getWallet

In order to access the digital wallet, a user needs to be authenticated. Upon authentication, the SDK will automatically fetch the wallet information in the background.

The wallet item list handler can be retrieve after the CoreLibrary initialization. It should not be accessed directly by the application and only be used as a ListAdapter.

“CoreLibrary.getInstance().getWalletLightInfoList(String source);;”  The wallet list is a collection of Promotion with light information. In order to access detailed information, another method needs to be called: “CoreLibrary.getInstance().getWalletItemDetail(String source, int index)” It returns an object of type DigitalOffer that implements Parcealable.

DigitalOffer contains delegate method to DigitalOfferLight.

DigitalOffer

* `getOfferId()`
* `getTitle()`
* `getSubTitle()`
* `getThumbnaiUrl()`
* `getExpiredTime()`
* `getStatus()`
* `getIssuedTime()`
* `getHeaderList()`
* `getHeader(String key)`
* `isRedeemed()`
* `isDeleted()`
* `isExpired()`
* `getDescription()`
* `getNumMediaUrl()`
* `getMediaUrlAt(int index)`
* `getOfferUrl()`
* `getUPC()`
* `getRessourceList()`
* `getOfferInfoLight()`     – return the DigitalOfferLight.

DigitalOffer and DigitalOfferLight can’t be and shouldn’t be instantiated by the Application. They should only be instantiated by the CoreLibrary.

#### 1.4.2.4 GetCatchHistory

A new feature of the 3.0 SDK is the getCatchHistory API.  This api allows the app to access the history of the items the user has caught using Triggers besides Touch Triggers.  This api will do two things:

* Provide a list of items the user has seen, and

* Update the pending wallet for the current user

This api is called alongside getWallet and an be called manually if needed as follows:  

```java
CoreLibrary.getInstance().getSessionManager.getCatchHistory(User user, String limit, String offset, GetCatchHistoryCallback getCatchHistoryCallback)
```
The fields are as follows:

* User user: The current session user to retrieve the history for.

* String limit: String representation of an integer that tells the API how many items the app wishes to retrieve from the user history.  The API will not return more than the limit of items back from a single call.

* String offset: String representation of an integer that tells the API where to start the quarry of history items from.  The API will return an offset when the app gets the history and the app can use that number as a starting point if it wishes to retrieve more.  If the app is ever returned less than the limit in items, then all items have been retreived and more calls are not necessary.

* GetCatchHistoryCallback getCatchHistoryCallback: Callback item for the API call.

#### 1.4.2.4 Catch/Save Promotion

After an offer has been caught. The user has the choice to save it into his wallet.

"saveOfferToWallet(SaveToWalletCallback saveToWalletCallbackHandler, DigitalOffer offer)"

To ensure that the DigitalOffer/Promotion has been saved correctly, the Application needs to implement the interface "SaveToWalletCallback". It will be notified of the save status by "onSaveToWalletStatus(SaveToWalletStatus status);".

#### 1.4.2.5 MediaPoolManager

The SDK has the capacity to buffer medias in the background on the local cache. It will provide a way to speed up the display of images resulting in a better user experience. The cache is located in the standard cache allocated to each application. As soon as an URL is available, it is passed down to the MediaPool that will download the resource as a background task. When the application is requesting a resource from the CoreLibrary:

```java
getResources(MediaPoolCallbackInterface callbackHandler, List<String> urls, MediaPoolInterface.ImageResource imageResource, boolean notifyInMemory)
```

Since accessing media resources can be costly in time, getResources is an asynchronous process. In order to be updated of the desired resources availability, the Application need to implement the interface MediaPoolCallbackInterface. The application will need to implement two methods:

* onMediaProgress(int progress);;
* onMedia(final Resource resource);;

The method onMedia return a Resource object that can be used to update graphics or other medias:

* Resource
    + Bitmap `getResource()`
    + String `getUrl()`
    + int `getProgress()`

getResource return a scalled down bitmap to accommodate the device memory. getUrl return the String url used to fetch the media. getProgress return the overall progress of the resources list request.

#### 1.4.2.6 Requests From the Server

Each request can trigger a request from the server. CoreLibrary is taking care of the filtering, however, the Application needs to implement the interface “RequestFromServerCallBack”. When a server request is available, onRequestFromServerStatus would be called. The application should then open a dialog message inviting the user to answer some short questions. Here is an example of information contained in RequestFromServerStatus.

```java
public void onRequestFromServerStatus (RequestFromServerStatus status) {
    Bundle aBundle = new Bundle();
    RequestFromServerObjectRequest object = status.getRequestFromServerObject();
    aBundle.putString("message", object.getRequirements().getReqFieldMessage());
    aBundle.putString("type", object.getRequirements().getReqFieldType());
    aBundle.putInt("error", object.getError());
    aBundle.putString("errorMsg", object.getErrorMessage());
    aBundle.putString("fieldName", object.getRequirements().getReqFieldName());
    aBundle.putString("approveMessage",object.getRequirements().getOnUserAppoveMessage());
    aBundle.putString("rejectMessage",object.getRequirements().getOnUserRejectMessage());
    displayDialog(DialogType.REQUESTDIALOG, aBundle);
}
```

“message” is the main description/question to be shown to the user.
“type” determine the type of request we are displaying to the user. There is currently three kind of fields (getReqFieldMessage):

0. no answer expected
1. Text
2. Number
3. Yes/No

“approveMessage” and “rejectMessage” should be displayed depending on the user action.

After the information has been collected, the application should notify the server with “replyServerRequest(String fieldName, String value, String type);;”.

#### 1.4.2.7 Actv8Activity & WalletAdapter (detail)

Actv8Activity is an abstract implementation of the FragmentActivity. It’s role is to abstract the core library interaction for the developer. Actv8Activity rely on WalletAdapter class to provide a ListAdapter to ListView or other ArrayAdapter compatible Views.

Actv8Activity implements:

* OnInitListener
* OfferListener
* LoginStatusCallback
* WalletListener
* RequestFromServerCallback

WalletAdapter is a class that would help synchronize Views like ListView. To instantiate WalletAdapter, you’ll need WalletAdapter. The WalletResourceAdapter class allows the mapping of the Application resource id with the WalletAdapter.

As for now, WalletResourceAdapter needs to be instantiated with the following data:

```java
WalletResourceAdapter(int resId_unavailable, int resIdlist_image, int resIdtxtTitle, int resIdtxtDesc, int resIdItemIdx)
```

Those “int” should correspond to the items contained in the individual item of the list view.

#### 1.4.2.8 Configuring API Endpoint

Sometimes you might want to change the API endpoint that the SDK is hitting. To do this, you go to the /res/values/configuration.xml file and change the value for the "app_load_api":

```html
<string name="app_load_api">{{API endpoint}}</string>
```

