import react from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { SettingsContext } from "../App";
import CheckBoxE from "./shared/CheckBox";
import FileSelector from "./shared/fileSelector"
import Seprator from "./shared/seprator";
import TextField from "./shared/textField";
import askforAllPermissions from "./shared/permissions";
const RNFS = require("react-native-fs")

export default function SettingsScreen(props){
    const {Settings, changeSettings}  = react.useContext(SettingsContext);

    react.useEffect(() => {
        askforAllPermissions()
    }, [])

    return (
        <View style={{flex:1, padding:5, backgroundColor:"white" }}>
            <View style={{height:70, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                <TouchableOpacity onPress={() => {props.navigation.navigate('inventory')}}>
                    <Image source={require('../images/back.png')}  />
                </TouchableOpacity>
                <Text style={{ fontSize:20 }}> Settings </Text>
                <View></View>
            </View>
            <ScrollView style={{ flex:1, padding:10}}>
                <View style={{flex:1}}>
                    <Seprator label="Files" /> 
                    <FileSelector label="Items Catalog File (TSV)" onFileSelect={(result) => {changeSettings({key:"itemCatalogFile", value:result.uri})}} defaultPath={Settings.itemCatalogFile} copyPath={RNFS.ExternalStorageDirectoryPath+Settings.ExportFilesPath+"/items.txt"} />
                    <TextField  label="working Directory name" value={Settings.ExportFilesPath} onChange={(result) => {changeSettings({key:"ExportFilesPath", value:result})}}/>
                    <Seprator label="barcode" />
                    <CheckBoxE label="Enable Barcode Scanner" />
                    <CheckBoxE label="Remove Leading zeros (UPC-A)" />
                    <CheckBoxE label="Remove Leading zeros (UPC-E)" />
                    <CheckBoxE label="Remove Leading zeros (EAN13)" />
                    <CheckBoxE label="Remove Leading zeros (EAN8)" />
                    <CheckBoxE label="Remove Leading zeros (code-128)" />
                    <CheckBoxE label="Remove Leading zeros (code-39)" />
                    <Seprator label="Server" /> 
                    <TextField  label="Activiation Server" value="https://truetecheg.com/activation"/>

                </View>
            </ScrollView>
        </View>
    )
}
