import defaultAppSettings from '../defaults';
import * as SecureStore from 'expo-secure-store';

const { AuthServerHost } = defaultAppSettings;

export function login (username, password){

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

export function CheckLogin (){

}

export function activate (){

}

export function doFullCheck  (){

}

export function doOnBootCheck (){

}
