import react from "react";
import { View, Text, TouchableOpacity} from 'react-native';

export default function ActionButton(props){

    return (
        <TouchableOpacity style={[{width:"100%", height:50, backgroundColor:props.buttonColor || "#52C1FF" , alignItems:"center", justifyContent:"center", borderRadius: 5}, props.style]} >
            <Text style={{color:"white"}}>{props.label}</Text>
        </TouchableOpacity>
    )
}