---
title: Installation
---

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

