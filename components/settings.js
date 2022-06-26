import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import CheckBoxE from "./shared/CheckBox";
import FileSelector from "./shared/fileSelector"
import Seprator from "./shared/seprator";
import TextField from "./shared/textField";
export default function SettingsScreen(props){
    
    return (
        <View style={{flex:1, padding:5, backgroundColor:"white" }}>
            <View style={{height:70, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                <TouchableOpacity>
                    <Image source={require('../images/back.png')}  />
                </TouchableOpacity>
                <Text style={{ fontSize:20 }}> Settings </Text>
                <View></View>
            </View>
            <ScrollView style={{ flex:1, padding:10}}>
                <View style={{flex:1}}>
                    <Seprator label="Files" /> 
                    <FileSelector label="Items Catalog File (TSV)" />
                    <TextField  label="working Directory name" value="admin"/>
                    <Seprator label="barcode" />
                    <CheckBoxE label="Enable Barcode Scanner" />
                    <CheckBoxE label="Remove Leading zeros (UPC-A)" />
                    <CheckBoxE label="Remove Leading zeros (UPC-E)" />
                    <CheckBoxE label="Remove Leading zeros (EAN13)" />
                    <CheckBoxE label="Remove Leading zeros (EAN8)" />
                    <CheckBoxE label="Remove Leading zeros (code-128)" />
                    <CheckBoxE label="Remove Leading zeros (code-39)" />

                </View>
            </ScrollView>
        </View>
    )
}
