import react from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
var RNFS = require('react-native-fs');
import * as DocumentPicker from 'expo-document-picker';

export default function FileSelector(props) {

    const [path, setPath] = react.useState(props.defaultPath || RNFS.ExternalStorageDirectoryPath);

    return (
    <TouchableOpacity onPress={ async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:true});
            if(result.type == 'success'){
                result.uri = decodeURIComponent(result.uri)
                console.log(result.uri)
                if ( props.copyPath ) {
                    await RNFS.copyFile(result.uri, props.copyPath);
                    result.uri = props.copyPath
                }
                result.uri = (await RNFS.stat(result.uri)).originalFilepath
                // const filepath = await RNGRP.getRealPathFromURI(fileUri)
                // result.uri = filepath;
                setPath(result.uri);
            }
            props.onFileSelect(result)    
        } catch (error) {
            console.warn(error)
            alert("Error Picking File")
            props.onFileSelect({type:"fail"})
        }
        
        
    }}
    style={{flexDirection:"row", backgroundColor:"#ededed", padding:10, borderRadius:5, marginBottom:10}}
    >
        <View style={{flex:1, justifyContent:"center"}}>
            <Text style={{fontSize:20}}>{props.label}</Text>
            <Text>{path}</Text>
        </View>
        <View style={{ justifyContent:"center"}}>
            <Text>set</Text>
        </View>

    </TouchableOpacity>
    )
}