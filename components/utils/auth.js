import defaultAppSettings from '../defaults';
import * as SecureStore from 'expo-secure-store';

const { AuthServerHost } = defaultAppSettings;

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
    if (logged_in) return true
    else return false

}

export function activate (){

}

export function doFullCheck  (){

}

export function doOnBootCheck (){

}
