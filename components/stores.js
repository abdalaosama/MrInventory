import react from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import ActionButton from "./shared/actionButton";

export default function StoresScreen ( props ){
    return (
        <View style={{flex:1, backgroundColor:"white", padding:10}}>
            <View style={{flex:1}}>
                <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginVertical:0, height:40}}>
                    <View></View>
                    <Text>Select the Store</Text>
                    <Image source={require('../images/close.png')}/>
                </View>
                    <ScrollView style={{flex:1, backgroundColor:"#EDEDED", marginVertical:10, padding:5, }}>
                        <View style={{flex:1,flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
                                <Store active={true} label="Store 1"/>
                                <Store active={false} label="Store 2"/>
                                <Store active={false} label="Store 3"/>
                                <Store active={false} label="Store 4"/>
                                <Store active={false} label="Store 5"/>
                                <Store active={false} label="Store 6"/>
                                <Store active={false} label="Store 7" add={true}/>
                        </View>
                    </ScrollView>
                <ActionButton label="Select" />
            </View>
        </View>
    );
}

function Store(props) {

    return (
        <TouchableOpacity style={{ backgroundColor: props.add?"#E8E8E8":props.active == true?"#52C1FF":"white", margin:5, flexGrow:1, flexShrink:0.5, flexBasis:"40%", justifyContent:"center", alignItems:"center", maxHeight:300, padding:30, borderRadius:5, borderColor:"#00A3FF", borderWidth:props.active?2:0}}>
            <Image source={props.add?require("../images/add.png"):require("../images/warehouse.png")} style={{width:100, height:100}}/>
            <Text style={{color: props.add? "grey":(props.active?"white":"black"), marginTop:10}}>{props.add?"New":props.label}</Text>
        </TouchableOpacity>
    )
}