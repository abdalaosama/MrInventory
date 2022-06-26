import react from "react";
import {View, Text} from "react-native";

export default function Seprator(props) {
    return (
        <View style={{flex:1, marginBottom:10}}>
            <Text style={{color: props.labelColor || props.color || 'black'}}>{props.label}</Text>
            <View style={{height: props.thickness || 2, backgroundColor:props.color || "black"}}></View>
        </View>
    )
}