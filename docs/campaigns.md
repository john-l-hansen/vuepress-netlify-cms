---
title: 2 Examples
---
# 'Hello' BeaconSample Demo

## Overview
The BeaconSample demo was created in order to feature the Beacon detection capabilities of the ACTV8me SDK. The BeaconSample demo can be found at [https://github.com/ACTV8meInc/Nucleus-iOS-Samples](https://github.com/ACTV8meInc/Nucleus-iOS-Samples)

This 'Hello' ACTV8me Demo will outline the steps needed to initialize the SDK within your project and show you the basic steps to using ACTV8me Beacon feature of the SDK.

## Requirements
1. An iOS device running iOS 10 or above is required to run this demo app.
2. Bluetooth 4.0+ hardware enabled and functioning on the device.
3. KontaktSDK is required to detect beacons.
4. Nearby beacons are required to activate valid triggers.

## Using the 'Hello' BeaconSample App
After successfully loging into the ACTV8me server, the application will begin to detect nearby beacons. Beacons that have been correctly configured will return a signal back to the application, then the signal will be sent to the server, and if there is content associated with that signal; content will be returned.

## Implementation

### Using the TriggerManagerCallbacks
```objc
#pragma mark - TriggerManager Callbacks

- (void)triggerDidRegister:(NCGenericTrigger *)trigger error:(NSError *)error {
    NSLog(@"Registered Trigger: %@ %@", trigger, error);
}

- (void)triggerDidUnregister:(NCGenericTrigger *)trigger error:(NSError *)error {
    NSLog(@"Unregistered Trigger: %@ %@", trigger, error);
}

- (void)trigger:(NCGenericTrigger *)trigger signal:(NCSignal *)signal didCatchContent:(NSArray <NCContent *>*)content error:(NSError *)error {
    if (!error) {
        for (NCContent *item in content) {
            NSLog(@"Content found: %@", item.name);
            NCContentStatus *itemStatus = [NCContentStatus new];
            itemStatus.status = @(NCStatusCatch);
            [NCContentManager contentUpdate:item status:itemStatus];
        }
    }
}
```
