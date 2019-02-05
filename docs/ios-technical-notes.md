---
title: iOS  Technical Notes
---
## 4.1 iOS Permissions

iOS requires an app developer to declare permissions for any technology used to retrieve outside signals to a mobile device. Part of the function of the SDK is to retrieve signals from the outside world and use them as triggers for offers, promotions, etc.

Permissions are set in the app’s info.plist file.  The trigger to permission pairs are as follows:

### Microphone Use
* To use the microphone to detect audio triggers, the key “NSMicrophoneUsageDescription” must be set with a string value describing why it’s needed.

### Geo-Location
* Geographic locations are used in two aspects of the SDK.
* First, the SDK would like to know the user’s location when they catch a trigger. To use this access, the key “NSLocationWhenInUseUsageDescription” must be set with a string value describing why it’s needed.
* However, if BluetoothLE devices are desired to be detected (iBeacons, Gimbals…), then instead, the key “NSLocationAlwaysUsageDescription” must be set with a string value describing why it’s needed. BluetoothLE devices are handled through the location manager on the iOS device.

### Also, if you are using Bluetooth Low Energy devices…
* To detect Bluetooth Low Energy devices, the key “NSBluetoothPeripheralUsageDescription”  must be set with a string value describing why it’s needed.




## 4.2 Sample Code

In order to use the SDK to listen in the background, the start, stop, and time function is all handled by the client. We suggest using the function below

```objc
if (self.audio.autoMode) {
            [self.audio start];
            [NSObject cancelPreviousPerformRequestsWithTarget:self];
            [self performSelector:@selector(shutOffMicrophone) withObject:nil afterDelay:60 * 60];
        } else {
            [self.audio stop];
        }
}
```
