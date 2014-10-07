
## Good reference docs. 
* Cordova (formerly phonegap) - [Docs](http://cordova.apache.org/)
* Ionic - Bunch of angularjs helpers for doing cordava on mobile. [Docs](http://ionicframework.com/)

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Ionic/Cordova - [Getting Started](http://ionicframework.com/getting-started/)
```
$ npm install -g cordova ionic
```
* You will need to checkout and run a server. See https://github.com/jhullfly/BetterFriendsServer

## Install
* You need to edit ./config.xml changing
```
  <content src="http://10.0.1.100:3000/"/>
  to
  <content src="http://{{ip-address-of-computer-running-server}}:3000/"/>  
```
{{ip-address-of-computer-running-server}} should not be localhost because this address will be resolved on 
the phone you are testing on. (localhost is find for the simulator)

You can configure your router at home to always assign 10.0.1.100 to you development machine. That will make this 
easier. Would love ideas about how to do this better.
* Run the appropriate build command.
```
$ ionic build ios
or 
$ ionic build android
```
* Open the file appropriate file and use xcode or android to tools to load onto a phone.
```
./platforms/ios/betterFriends.xcodeproj
or 
./platforms/android/ant-build/betterFriends-debug.apk
```

