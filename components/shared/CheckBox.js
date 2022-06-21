import react from "react";
import {View, Text } from 'react-native';

export default function CheckBoxE( props ) {
    return (
        <View style={[{alignItems:"center", flexDirection:"row", margin:10}, props.style]}>
            <View style={{width:30, height:30, backgroundColor:"grey", marginRight:10}}></View>
            <Text>{props.label}</Text>
        </View>
    )
}