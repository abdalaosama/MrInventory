import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import { SettingsContext } from '../App';
// import * as FileSystem from 'expo-file-system';
var RNFS = require('react-native-fs');

// import MaskedView from '@react-native-masked-view/masked-view';

export default function InventoryScreen(props) {
  const Settings  = useContext(SettingsContext);

  const { navigation } = props;
  const [store, setStore] = React.useState("1")
  
  async function askStoragePermission(){

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log("Storage permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  askStoragePermission();
  async function GetFile(){

    // make sure file directory exists
    const dir = RNFS.ExternalStorageDirectoryPath + Settings.ExportFilesPath + "/"
    console.log(dir);
    const exists = await RNFS.exists(dir);  // check if file exists

    if (!exists) {
      await RNFS.mkdir(dir);
    }
  }
  async function LoadFromFile (fileName= "store1.txt") {
    try{ 
      await GetFile()
      const FilePath = RNFS.ExternalStorageDirectoryPath + Settings.ExportFilesPath + "/" + fileName;
      const file = await RNFS.readFile(FilePath, 'utf8');
      setItems( JSON.parse(file) )
      console.log("Loaded from file: " + fileName)
    }catch(err){
      console.log(err)
      alert("Error loading file")
    }
  }

  useEffect(() => {
    LoadFromFile("store1.txt");
    console.log(Settings)
  }, [])
  async function saveToFile (){
      await GetFile()
      const Filename = "store" + store + ".txt";
      const FileContent = JSON.stringify( items );
      const FilePath = RNFS.ExternalStorageDirectoryPath + Settings.ExportFilesPath + "/" + Filename;
      RNFS.writeFile(FilePath, FileContent, 'utf8')
      .then((success) => {
        alert("Saved Successfully  :) ")
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log(err.message);
        alert("Error saving to file")
      });
  }

  // sounds
  const [sound, setSound] = React.useState();


  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../sounds/beeb.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  //------------------------------------------------------------
  //camera permissions
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("Barcode Scanned: " + data + " Type: " + type)
    setScanned(true)
    setitemCode(data)
    addItem(data, parseInt(Qty))
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTimeout(() => {
      setScanned(false)
    }, Settings.ScanCoolDown)
  };

  //------------------------------------------------------------
  //inputs
  const [Qty, setQty] = useState("1");
  const [itemCode, setitemCode] = useState("-")
  //------------------------------------------------------------
  //items
  const [items, setItems] = useState([])

  function addItem(lItemCode, lqty ){
    console.log("Item Added: " + lItemCode + " Qty: " + lqty)
    playSound();

    if(lqty < 0 || isNaN(lqty)) return; 
    if(!lItemCode || lItemCode.length <= 0) return; 

    const Allitem = [...items]

    const ItemIndex = Allitem.findIndex(item => item.item == lItemCode)

    if ( ItemIndex >= 0 ){
      Allitem[ItemIndex] = {item: lItemCode, qty: Allitem[ItemIndex].qty + lqty}
    }else{
      Allitem.push({qty: lqty, item:lItemCode})
    }

    setQty("1")

    // console.log(lqty)
    setItems(Allitem)


  }
  //------------------------------------------------------------


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (

    <View style={{flex:1}}>

      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{position:"absolute", top:-200, bottom:200, left:0, right:0 }} ></BarCodeScanner>
      <View style={{flex:1, elevation:2, flexDirection:"column"}}>

        <View style={{height:80, backgroundColor:'white', justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
          <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
            <Image source={require("../images/menu.png")} style={{marginLeft:10}} />
          </TouchableOpacity>
          <Text> Store 1 - Inventory </Text>
          <TouchableOpacity onPress={saveToFile}>
            <Image source={require("../images/isave.png")} style={{height:50, width:50, marginRight:10}} ></Image>
          </TouchableOpacity>
        </View>
        
        <View style={{height:100, backgroundColor:'transparent', justifyContent:"center" }}>
          
          <View style={{height:StyleSheet.hairlineWidth, backgroundColor:"red"}}></View>
        </View>

        <View style={{flex:1, backgroundColor:'white', flexDirection:"column"}}>
          
          <View style={{backgroundColor:"white", flexDirection:"row",height:60, justifyContent:"center", alignItems:"center"}}>
              <TextInput style={{ borderWidth:2, flex:1, backgroundColor:"white" ,height:60, textAlign:"center", fontSize:30}}
              onChangeText={setQty}
              value={Qty}
              keyboardType={"numeric"}
              />
              <TouchableOpacity onPress={() => {addItem(itemCode, parseInt(Qty))}}>
                <Image source={require("../images/down.png")} style={{width:50, height:50, backgroundColor: "white"}} />
              </TouchableOpacity>

              <TextInput style={{ borderWidth:2, flex:1, backgroundColor:"white",height:60, textAlign:"center", fontSize:15}}
              onChangeText={setitemCode}
              value={itemCode}
              />

          </View>
          <View style={{backgroundColor:"white", flex:1}}>            
            <View style={{flexDirection:"row"}}>
              <Text style={{flex:1, borderColor:"black", borderWidth:0.5, backgroundColor:"lightblue", textAlign:"center", color:"white", height:40, textAlignVertical:"center", fontWeight:"bold"}}>QTY</Text>
              <Text style={{flex:1, borderColor:"black", borderWidth:0.5, backgroundColor:"lightblue", textAlign:"center", color:"white", height:40, textAlignVertical:"center", fontWeight:"bold"}}>ITEM</Text>
            </View>
          <ScrollView>
                { items.map(item => {
                  return ( <TableRow key={item.item} qty={(item.qty).toString()} item={item.item} /> )
                }) }
                
          </ScrollView>
          </View>

        </View>
        
      </View>

      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}

const TableRow = (props) => {

  return (
    <View style={{flexDirection:"row"}}>
              <Text style={{flex:1, borderColor:"black", borderWidth:1, textAlign:"center", color:"black", height:40, textAlignVertical:"center"}}>{props.qty}</Text>
              <Text style={{flex:1, borderColor:"black", borderWidth:1, textAlign:"center", color:"black", height:40, textAlignVertical:"center"}}>{props.item}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
