import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import FileSelector from "./shared/fileSelector"

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
                    <FileSelector onFileSelect={(fileResult) => {alert(fileResult.type == "success"?fileResult.uri:"Selection Canceled")}} label="Folder" />
                    <FileSelector onFileSelect={(fileResult) => {alert(fileResult.type == "success"?fileResult.uri:"Selection Canceled")}} label="File 2" />
                </View>
            </ScrollView>
        </View>
    )
}
