---
title: 'Categories '
---
# 1.1 Overview

The ACTV8me SDK handles the management of ACTV8me proprietary promotion collection and redemption system. The SDK includes authentication with ACTV8me servers, access to ACTV8me trigger technologies, media stored on ACTV8me servers, impression and analytics collection, and are consumed by conforming to RESTful API patterns. The ACTV8me Digital Wallet system delivers promotions through triggered events. The status of promotions stored on ACTV8me servers are managed through the SDK and can be used to leverage meaningful user data.

## 1.1.1 Audience

This document is aimed at application developers that want to use the ACTV8me SDK to access ACTV8’s promotion & trigger system in order to enhance their iOS application with our technology.

## 1.1.2 Registration

In order to use the ACTV8me SDK, developers will need to register with Actv8me in order to get an API license and access to the sample code and any additional documentation.  Visit our [Registration Page](http://sdk.actv8me.com) to start.




# 1.2 Installing the iOS ACTV8me SDK
We designed the ACTV8me SDK to be modular and easily installed into an existing project, requiring only a single core framework and auxilliary frameworks to work independently from one another. We refer to these two framework types as Nucleus and Valence. 

## 1.2.1 SDK Requirements
* iOS Hardware - The frameworks do not support an iOS emulator and may experience errors due to required used of Device Hardware such as the microphone and GPS 
* iOS 10.3 or above

## 1.2.1 SDK iOS Frameworks
The ACTV8me SDK was designed to be modular, 

Please download the necessary frameworks from the following frameworks:

##### Core ACTV8me SDK Framework
* [Nucleus-iOS-Binary](https://github.com/ACTV8meInc/Nucleus-iOS-Binary/releases)

##### Auxiliary ACTV8me SDK Frameworks
* [Valence-iOS-Audio-Binary](https://github.com/ACTV8meInc/Valence-iOS-Audio-Binary/releases)
* [Valence-iOS-Geofence-Binary](https://github.com/ACTV8meInc/Valence-iOS-Geofence-Binary/releases)
* [Valence-iOS-Beacon-Binary](https://github.com/ACTV8meInc/Valence-iOS-Beacon-Binary/releases)


##### Framework Requirements
The Valence Audio, Geofence, and Beacon frameworks are dependent on the main Nucleus-iOS framework. 

The auxiliary frameworks are optional so they can be used in any combination.

## 1.2.2 Framework Installation
In order to use the ACTV8me SDK iOS frameworks in your project, simply drop the frameworks and auxiliary files into the project.

After importing the frameworks, you will notice that they have been positioned in their respective places. Please refer to the following examples:

***

### Figure 1 - Audio
![Figure 1 - Audio](../images/figure 1.png)

***

### Figure 2 (Beacon)
![Figure 2 - Beacon](../images/figure 2.png)

***

### Figure 3 (Geofence)
![Figure 3 - Geofence](../images/figure 3.png)



## 1.2.3 Required External Libraries
* [KontaktSDK](https://cocoapods.org/pods/KontaktSDK)
* [PINCache](https://cocoapods.org/pods/PINCache)
* [AFNetworking](https://cocoapods.org/pods/AFNetworking)
* [Mantle](https://cocoapods.org/pods/Mantle)

## 1.2.4 Nucleus Sample App & Code
We have created a basic sample app and sample code to refer to for more information.

[Nucleus-iOS-Samples](https://github.com/ACTV8meInc/Nucleus-iOS-Samples)




## 1.3 Workflows

### 1.3.1 Simple Audio Barcode Promotion Catch Workflow

1. Set the base URL and key (optionally turn on SDK network logs)

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [NCAPIManager setBaseUrl:@"url"];
    [NCAPIManager setAPIKey:@"key"];
    [[NCAPIManager sharedManager] setLogRequests:YES];
}
```

2. Create an instance of one of our trigger types(Below we have `VATriggerAudio`), and register it with the `NCTriggerManager`

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    
    // NCGenericTrigger objects need to be strongly referenced instance variables
    NCGenericTriggerOptions *options = [NCGenericTriggerOptions new];
    options.requestPermissionsOnRegister = NO;
    self.audio = [[VATriggerAudio alloc] initWithOptions:options];
    [[NCTriggerManager sharedManager] registerTrigger:self.audio];
}
```

3. listen to an audio source found on our server, when the SDK detects a trigger of any type it should appear hear

```objc
- (void)trigger:(NCGenericTrigger *)trigger signal:(NCSignal *)signal didCatchContent:(NSArray <NCContent *>*)content error:(NSError *)error {
    if (!error) {
        NSLog(@"found trigger %@ %@", signal.uuid, content);
    }
}
```

### 1.3.2 Save Promotion to Digital Wallet Workflow

```objc
- (void)didAcceptOffer:(NCContent *)offer { // hypothetical method
    [NCContentManager contentInsert:offer callback:^(NSArray <NCContent *>*content, NSError *error){
        if (!error) {
            NCContentStatus *status = [NCContentStatus new];
            status.status = @(NCStatusAccept);
            [NCContentManager contentUpdate:offer status:status];
        }
    }];
}
```

### 1.3.3 Delete Promotion from Digital Wallet Workflow

```objc
- (void)didDeleteOffer:(NCContent *)offer { // hypothetical method
    [NCContentManager contentDelete:offer callback:^(NSArray <NCContent *>*wallet, NSError *error){
            if (!error) {
                NSLog(@"offer deleted");
            }
        }];
}
```

### 1.3.4 Log Promotion View/Redeem (Impressions) Workflow

```objc
- (void)didViewOffer:(NCContent *)offer { // hypothetical method
    NCContentStatus *status = [NCContentStatus new];
    status.status = @(NCStatusView);
    [NCContentManager contentUpdate:offer status:status];
}
```

```objc
- (void)didRedeemInstoreOffer:(NCContent *)offer { // hypothetical method
    NCContentStatus *status = [NCContentStatus new];
    status.status = @(NCStatusRedeemInStore);
    [NCContentManager contentUpdate:offer status:status];
}
```
```objc
- (void)didRedeemOnlineOffer:(NCContent *)offer { // hypothetical method
    NCContentStatus *status = [NCContentStatus new];
    status.status = @(NCStatusRedeemOnline);
    [NCContentManager contentUpdate:offer status:status];
}
```

#### 1.3.5 Login
1. determine if the user is new or returning and using the following code to guide them through the correct user flow

```objc
if (self.isNewUser) {
        [NCAPIManager registerUser:user callback:^(NSError *error) {
            if (!error) {
                NSLog(@"registration successfull");
                [NCAPIManager login:user callback:^(NSDictionary *response, NSError *error){
                    if (!error) {
                        NSLog(@"log in successfull");
                    }
                }];
            }
        }];
    } else {
        [NCAPIManager login:user callback:^(NSDictionary *response, NSError *error) {
            if (!error) {
                NSLog(@"log in successfull");
            }
        }];
    }
}
```

