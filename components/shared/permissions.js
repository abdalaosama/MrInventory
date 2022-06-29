import {PermissionsAndroid } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default async function askforAllPermissions(){
    try{
      const WRITE_EXTERNAL_STORAGE = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      const READ_EXTERNAL_STORAGE = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      
      if (WRITE_EXTERNAL_STORAGE === PermissionsAndroid.RESULTS.GRANTED && READ_EXTERNAL_STORAGE == PermissionsAndroid.RESULTS.GRANTED && status == "granted") {
        return true;
      } else {
        alert("permissions denied, please make sure this app has permission to read/write to External storage and Camera");
        console.log("Permissions Denied")
        console.log(WRITE_EXTERNAL_STORAGE)
        console.log(READ_EXTERNAL_STORAGE)
        console.log(status)
        return false;
      }

    }catch (e) {
      console.warn(e);
      return false;
    }
}