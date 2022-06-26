import react from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
var RNFS = require('react-native-fs');
import * as DocumentPicker from 'expo-document-picker';

export default function FileSelector(props) {

    const [path, setPath] = react.useState(props.defaultPath || RNFS.ExternalStorageDirectoryPath);

    return (
    <TouchableOpacity onPress={ async () => {
        const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:false});
        props.onFileSelect(result)
        
        if(result.type == 'success') setPath(result.uri);
        
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