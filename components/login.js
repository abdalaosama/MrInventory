import react from "react";
import { View, Image, StyleSheet} from "react-native";
import TextField from "./shared/textField";
import CheckBoxE from './shared/CheckBox';
import ActionButton from "./shared/actionButton";
export default function LoginScreen ( props ){
    return (
    <View style={{flex:1,alignItems:"center", flexDirection:"column",  backgroundColor:"white"}}>
        <View style={{maxWidth:200, maxHeight:200, flex:1, alignItems:"center"}}>
            <Image source={require('../images/logo.png')} style={{flex:1}}/>

        </View>
        <View style={{flex:1, width:"100%", padding:20, flexDirection:"column"}}>
            <TextField label="Username or Email" style={{marginBottom:30}}/>
            <TextField label="Password" style={{marginBottom:10}}/>
            <CheckBoxE label="Remember me ?" style={{marginBottom:30}}/>
            <ActionButton label="Login" />


        </View>
    </View>
    );
}