import { Crypt, RSA } from 'hybrid-crypto-js';
var Buffer = require("@craftzdog/react-native-buffer").Buffer;

var crypto = new Crypt({
  aesStandard: 'AES-CBC',
  rsaStandard: 'RSA-OAEP',
});

export default async function crypt(key, message, encrypt=true){
  try {
    let result;
    if(encrypt){
        result = crypto.encrypt(key, message);
        result = Buffer.from(result).toString('hex');
    }else{
        result = Buffer.from(message, 'hex').toString('utf8');
        result = crypto.decrypt(key, result);
        result = result.message;
    }
    return result;    
} catch (error) {
    console.log(error)   
}
}
