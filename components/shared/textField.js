import react from 'react';
import {View, TextInput, Text} from 'react-native';

export default function TextField(props){

    return (
        <View style={[{alignItems:'flex-start'}, props.style]}>
            <Text style={{marginLeft:10, marginBottom:10, color:"black"}}>{props.label}</Text>
            <TextInput style={[{ backgroundColor:"#F4F4F4", width:"100%", height:40, borderColor:"#A9A9A9", borderWidth:1, paddingLeft:10, borderRadius:5, }, props.textStyle]} 
                onChangeText={props.onChange}
                value={props.value}
                // keyboardType={"numeric"}
            />
        </View>
    )
}