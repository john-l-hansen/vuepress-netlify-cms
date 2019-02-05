---
title: Android Examples
---
## 2.1 Hello Actv8 Demo

### 2.1.1 Overview

The Hello Actv8 sample app is for demonstrating the most simple elements of the Actv8 Android SDK. In particular, the app demonstrates the ability to listen for offers, then subsequently retrieve those offers upon hearing the proper sounds and displaying them to the user.

The app utilizes the Actv8 SDK in the form of dependency. It pulls this dependency through a gradle script which accesses the Maven Central Repository where the dependency is housed.

### 2.1.2 Requirements

1. A device is required to run this demo app.
2. Official audio samples are required to activate valid triggers.  Samples can be found here: [Actv8 Audio Samples](http://dev.actv8me.com/docs/#/android31/3.0.0/samples)

### 2.1.4 Quick Overview

Import the Hello Actv8 sample app code into Android Studio by “File” -­> “Import Project”, and select the base directory of the sample application.

Content of the build.gradle for the app directory:

```javascript
apply plugin: 'com.android.application'

android {
   compileSdkVersion 25
   buildToolsVersion "25.0.2"
   defaultConfig {
       applicationId "me.actv8.sampleapp"
       minSdkVersion 16
       targetSdkVersion 22
       versionCode 1
       versionName "1.0"
       testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
   }
   buildTypes {
       release {
           minifyEnabled false
           proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
       }
   }
   packagingOptions {
       exclude 'META-INF/license.txt'
       exclude 'META-INF/notice.txt'
   }
}

dependencies {
   compile fileTree(dir: 'libs', include: ['*.jar'])
   androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
       exclude group: 'com.android.support', module: 'support-annotations'
   })
   compile 'com.android.support:appcompat-v7:25.3.0'
   testCompile 'junit:junit:4.12'

   compile 'org.springframework.android:spring-android-core:1.0.1.RELEASE'
   compile 'org.springframework.android:spring-android-rest-template:1.0.1.RELEASE'
   compile 'commons-io:commons-io:2.4'
   compile 'com.google.code.gson:gson:2.7'
   compile 'org.apache.httpcomponents:httpcore:4.4.1'
   compile 'com.google.android.gms:play-services-location:10.2.0'
   compile 'com.squareup.picasso:picasso:2.5.2'
   compile 'com.squareup.retrofit:retrofit:1.9.0'
   compile 'com.daimajia.swipelayout:library:1.2.0@aar'
   compile 'com.kontaktio:sdk:3.2.3'

   compile 'me.actv8.core:actv8-sdk:3.1.2'
}
```
