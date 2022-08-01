import react from "react";
import { View, Image, StyleSheet, ScrollView, Dimensions, Text} from "react-native";
import TextField from "./shared/textField";
import CheckBoxE from './shared/CheckBox';
import ActionButton from "./shared/actionButton";
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import * as SecureStore from 'expo-secure-store';
import * as auth from "./utils/auth";

export default function LoginScreen ( props ){

    const [checkBoxValue, setCheckBoxValue] = react.useState(false);
    const [usernameValue, setusernameValue] = react.useState("");
    const [passwordValue, setpasswordValue] = react.useState("");
    const [loggedIn, setLoggedIn] = react.useState(false);
    const [LoadingMessage, setLoadingMessage] = react.useState("");
    const [progressAnimVal, SetProgressAnimVal] = react.useState(0);

    async function DoLicenseCheckRouting(){
        try {
            
        
            // await auth.logout();
            const LoggedIn = await auth.CheckLogin();
            console.log(`User is Logged in ? : ${LoggedIn}`)
            setLoggedIn(LoggedIn);
            setLoadingMessage('Checking if you are logged in...');
            if(!LoggedIn) return setLoadingMessage('You are not Logged in') ;
            
            // check time for choice of full check or just offline check
            //get last_check from secure store
            const last_check = await SecureStore.getItemAsync('last_check');
            setLoadingMessage('Checking Last open...');
            // if last_check is null, then set it to todays date
            let check = 'offline';
            if (last_check == null) {
                await SecureStore.setItemAsync('last_check', new Date().toISOString());
                check = 'full';
            }
            // if check is more than a day old, then set it to full
            
            const last_check_date = new Date(last_check);
            const today = new Date();
            const diff = today.getTime() - last_check_date.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            if (days > 1) {
                await SecureStore.setItemAsync('last_check', new Date().toISOString());
                check = 'full';
            }
            
            setLoadingMessage(check == "full"?'Checking License with server...':"Checking License...");
            


            let activated = false;
            activated = await auth.doLicenseCheck(check);
            // active ?
            if(activated){
                // go to store choice screen
                return props.navigation.navigate('stores');
            }

            setLoadingMessage("Attempting to Activate...");
            await auth.activate();

            activated = await auth.doLicenseCheck();
            if(activated){
                // go to store choice screen
                return props.navigation.navigate('stores');
            }  

            setLoadingMessage("Activation Failed");
            // show app inactive screen
        } catch (error) {
            console.log(error);
            setLoadingMessage("Error, please try again...");
            setTimeout(() => {
                // auth.logout();
                setLoggedIn(false);
            }, 1000)
        }
    }


    react.useEffect(()=> {
        setTimeout(() => {
            {progressAnimVal <= 1000? SetProgressAnimVal(progressAnimVal + 10): SetProgressAnimVal(0)}
        }, 100)
    }, [progressAnimVal]);


    react.useEffect(() => {
        (async () => {
            // await auth.logout();
            // console.log(DeviceInfo)
            await DoLicenseCheckRouting();
        })();
        return () => {
        }
    }, [])

    async function LoginPress(e) {
        await auth.login(usernameValue, passwordValue);
        const LoggedIn = await auth.CheckLogin();
        console.log(LoggedIn)
        setLoggedIn(LoggedIn);
        DoLicenseCheckRouting();
    }
    return (
    <ScrollView style={{flex:1}}>
        { !loggedIn ?
        <View style={{flex:1,alignItems:"center", flexDirection:"column",  backgroundColor:"white",  height: Dimensions.get("window").height}}>
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
        : 
        <View style={{flex:1, height: Dimensions.get("window").height, justifyContent:"center", alignItems:"center"}}>
            {/* <CircularProgressBase value={progressAnimVal} activeStrokeColor={'#52C1FF'} radius={40} > */}
                <CircularProgressBase value={progressAnimVal} activeStrokeColor={'#52C1FF'} radius={50} >
                    <CircularProgressBase value={progressAnimVal} activeStrokeColor={'#52C1FF'} radius={60}>
                        <Text>{LoadingMessage}</Text>
                    </CircularProgressBase>
                </CircularProgressBase>
            {/* </CircularProgressBase> */}
        </View>

        }

    </ScrollView>
    );
}