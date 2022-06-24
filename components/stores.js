import react from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import ActionButton from "./shared/actionButton";
import { SettingsContext } from '../App';

export default function StoresScreen ( props ){
    const {Settings, changeSettings}  = react.useContext(SettingsContext);
    const [selectedStore, setSelectedStore] = react.useState(1);
    const stores = 10;
    let store = []
    
    const onStoreChange = key => e => {
        setSelectedStore(key)
        changeSettings({key: "store", value: key.toString()})
        props.navigation.navigate('inventory')
    }
    for(let x = 1; x <= 10; x++){
        store.push(<Store key={x} active={x == selectedStore? true: false} label={`Store ${x}`} onPress={onStoreChange(x)}/>)
    }
    // setSelectedStore(1)
    return (
        <View style={{flex:1, backgroundColor:"white", padding:10}}>
            <View style={{flex:1}}>
                <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginVertical:0, height:40, paddingHorizontal:10}}>
                    <View></View>
                    <Text>Select the Store</Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate('inventory')
                    }}>
                        <Image source={require('../images/close.png')}/>
                    </TouchableOpacity>
                </View>
                    <ScrollView style={{flex:1, backgroundColor:"#EDEDED", marginVertical:10, padding:5, }}>
                        <View style={{flex:1,flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
                                {store}
                                <Store active={false} label="add new" add={true}/>
                        </View>
                    </ScrollView>
            </View>
        </View>
    );
}

function Store(props) {

    return (
        <TouchableOpacity style={{ backgroundColor: props.add?"#E8E8E8":props.active == true?"#52C1FF":"white", margin:5, flexGrow:1, flexShrink:0.5, flexBasis:"40%", justifyContent:"center", alignItems:"center", maxHeight:300, padding:30, borderRadius:5, borderColor:"#00A3FF", borderWidth:props.active?2:0}} 
        onPress={props.onPress}
        >
            <Image source={props.add?require("../images/add.png"):require("../images/warehouse.png")} style={{width:100, height:100}}/>
            <Text style={{color: props.add? "grey":(props.active?"white":"black"), marginTop:10}}>{props.add?"New":props.label}</Text>
        </TouchableOpacity>
    )
}