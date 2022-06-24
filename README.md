# Mr Inventory

Mr inventory is the app which will help you manage your entire inventory.
<hr>

## Getting started
- To get started simply copy the repo down to your local machine by running <br>
`git clone https://github.com/abdalaosama/MrInventory.git && cd MrInventory`<br>
- then you have to install the nodejs dependencies by running <br>
`npm install`<br>
- you have to Have Java Development Kit, Android SDK and Android Studio Installed and configured correctly before proceeding
- make sure you have expo installed by running <br> `npm install -g expo-cli`<br>
<hr>

### to start the project on your device
- connect your phone to your device using a cable or start your Android Virtual Device
- run `expo run:android`
<hr>

### To build the project
you can build the project using one of the following two methods

``` bash
cd android && gradlew assemblereleasecd Android
./gradlew assembleRelease
```
or 
``` bash
expo build:android -t apk
```
Keep in mind that the later option is gonna send a copy of your source code to be packaged on the expo server.

and both produce an unsigned apk that cannot be published directly to the playstore
<hr>

### Credits & license
This project was built by **Abdullah Osama** for TrueTechEg 2022.

