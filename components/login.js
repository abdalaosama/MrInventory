import react from "react";
import { View, Image, StyleSheet, ScrollView} from "react-native";
import TextField from "./shared/textField";
import CheckBoxE from './shared/CheckBox';
import ActionButton from "./shared/actionButton";
export default function LoginScreen ( props ){

    const [checkBoxValue, setCheckBoxValue] = react.useState(false);
    const [usernameValue, setusernameValue] = react.useState("");
    const [passwordValue, setpasswordValue] = react.useState("");
        


    function LoginPress(e) {

    }
    return (
    <ScrollView style={{flex:1, backgroundColor:"white"}}>
        <View style={{flex:1,alignItems:"center", flexDirection:"column",  backgroundColor:"white"}}>
            <View style={{maxWidth:200, maxHeight:200, flex:1, alignItems:"center"}}>
                <Image source={require('../images/logo.png')} style={{flex:1, width:200, height:200}}/>
            </View>
            <View style={{flex:1, width:"100%", padding:20, flexDirection:"column"}}>
                <TextField label="Username or Email" style={{marginBottom:30}} value={usernameValue} onChange={setusernameValue}/>
                <TextField label="Password" style={{marginBottom:10}} value={passwordValue} onChange={setpasswordValue}/>
                <CheckBoxE label="Remember me ?" style={{marginBottom:30}} value={checkBoxValue} onChange={setCheckBoxValue}/>
                <ActionButton label="Login" onPress={LoginPress} />
            </View>
        </View>
    </ScrollView>
    );
}