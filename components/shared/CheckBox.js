import react from "react";
import {View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function CheckBoxE( props ) {
    return (
        <View style={[{alignItems:"center", flexDirection:"row", margin:3}, props.style]}>
            <Checkbox style={{width:30, height:30, backgroundColor:"grey", marginRight:10}}
            value={props.value}
            onValueChange={props.onChange} 
            color={props.value ? '#52C1FF' : "grey"}
            />
            <Text>{props.label}</Text>
        </View>
    )
}