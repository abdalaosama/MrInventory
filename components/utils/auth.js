import defaultAppSettings from '../defaults';
import * as SecureStore from 'expo-secure-store';
import crypt from './crypto';
import { getUniqueId } from 'react-native-device-info';
const { AuthServerHost, LicenseFilePath } = defaultAppSettings;
import * as rnfs from 'react-native-fs';
export async function login (username, password){
    try {
        const body = {"username":username,"password":password};
        let resp = await fetch(`${AuthServerHost}/v1/login`,{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        resp = await resp.json();
        if (resp.status == 0) {
            SecureStore.setItemAsync('user', JSON.stringify(resp.user_data));    
            return alert(resp.message)
        }
        
        return alert(resp.message)
    } catch (error) {
        console.log(error);
    }
    
}

export async function logout(){
    try {
        let resp = await fetch(`${AuthServerHost}/v1/logout`,{ method:"GET" })
        resp = await resp.json();
        
        await SecureStore.setItemAsync('user', '');
        return alert(resp.message)
    } catch (error) {
        console.log(error);
    }
 
}

export async function getPublicKey (){
    try {

        let key = await SecureStore.getItemAsync('Public_Key');
        if ( key ) return key;
        
        key = await fetch(`${AuthServerHost}/v1/public_key`, {
            method: 'GET'
        });
        key = await key.text()
        await SecureStore.setItemAsync('Public_Key', key);
        return key;
        
    } catch (error) {
        console.log(error)
        return null;
    }

}

export async function CheckLogin (){
    const logged_in  = await SecureStore.getItemAsync("user");
    console.log(logged_in);
    if (logged_in) return true
    else return false
}

export async function activate (){
    try {
    
        //get the license key
        let getKeyResp = await fetch(`${AuthServerHost}/v1/get_key`, {method:"GET"});
        getKeyResp = await getKeyResp.json();
        // console.log(getKeyResp);
        if(getKeyResp.status == 0){
            //if license and kay exists save the values to secure store
            await SecureStore.setItemAsync('license_key', getKeyResp.key.license_key);
            if(getKeyResp.key.license){
                rnfs.writeFile(LicenseFilePath, getKeyResp.key.license, 'utf8');
            }
        }

        let activateResp = await fetch(`${AuthServerHost}/v1/authenticate_license`, {
            "method": "POST",
            "headers": {
              "Content-Type": "application/json"
            },
            "body": JSON.stringify({ "license_key": await SecureStore.getItemAsync('license_key'),"finger_print": getUniqueId()})
          })

        activateResp = await activateResp.json();
        console.log(activateResp);
        
        if(activateResp.status == 0){
            rnfs.writeFile(LicenseFilePath, activateResp.license, 'utf8');
            return true;
        }

        return false
        //     
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function doLicenseCheck (full = false){
    
    try {
        let result = false;
        
        const PublicKey = await getPublicKey();
        if ( !PublicKey ) return false;
        
        const license = await rnfs.readFile(LicenseFilePath, 'utf8');
        if ( !license ) return false;

        // console.log(license);
        const license_key = await SecureStore.getItemAsync('license_key');
        if ( !license_key ) return false;

        // decrypt 
        const DecryptedLicense = await crypt(PublicKey, license, false);

        console.log(DecryptedLicense);

        // check expiration time
        // check finger print

    } catch (error) {
        console.log(error)
        return false;
    }
}
