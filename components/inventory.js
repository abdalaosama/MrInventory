import { useFocusEffect, useNavigationState } from '@react-navigation/native';
import { useState, useEffect, useContext, useCallback } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import askforAllPermissions from './shared/permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Audio } from 'expo-av';
import { tsvParse } from 'd3-dsv';
var RNFS = require('react-native-fs');

import { SettingsContext } from '../App';

export default function InventoryScreen({ navigation }) {
  
  const {Settings, changeSettings} = useContext(SettingsContext);
  
  const [itemTable, setitemTable] = useState([]);
  const [items, setItems] = useState([])
  const [sound, setSound] = useState();
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  
  const [itemCode, setitemCode] = useState("")
  const [Qty, setQty] = useState("1");

  useEffect(() => {
    (async () => {
      console.log("------------------------------------")
      console.log("Loading The inventory Screen ")
      setHasPermission( await askforAllPermissions() );

      console.log('Loading Beeb Sound');
      const { sound } = await Audio.Sound.createAsync(require('../sounds/beeb.mp3'));
      setSound(sound);
  
      await LoadItemsCatalog();
      await LoadInventortyFromStoreFile();
      console.log("Items in catalog: " + itemTable.length)
    })();
    
    return( () => {
      //runs on component Destruction
    })
  }, [])

  useFocusEffect( 
    useCallback(
      () => {
        (async () => {
          LoadInventortyFromStoreFile()    
        })();
      },[Settings]))


  async function EnsureWorkDirectoryExists(){
    // makes sure The Directory needed for the program to run exists
    try{
      const dir = RNFS.ExternalStorageDirectoryPath + Settings.ExportFilesPath + "/"
      console.log(`Made Sure this Directory Exists: ${dir}`);
      const exists = await RNFS.exists(dir);  // check if file exists
  
      if (!exists) {
        await RNFS.mkdir(dir);
      }
    }catch(err){
      console.warn(err)
      throw(new Error("Couldn't Ensure work Directory Exists"))
    }

  }
  async function LoadItemsCatalog() {
    try{ 
      await EnsureWorkDirectoryExists()
      const FilePath = Settings.itemCatalogFile;
      const file = await RNFS.readFile(FilePath, 'utf8');
      const parsed = tsvParse("barcode\tname\n"+file) ;
      setitemTable(parsed)
      console.log(parsed)

      console.log(`Loaded the items catalog from file: ${FilePath}`)
    }catch(err){
      console.warn(err)
      alert("Error loading items catalog from file")
    }
  }
  async function LoadInventortyFromStoreFile () {
    try{ 
      await EnsureWorkDirectoryExists()
      const fileName = `store${Settings.store}.txt`
      const FilePath = RNFS.ExternalStorageDirectoryPath + Settings.ExportFilesPath + "/" + fileName;
      const file = await RNFS.readFile(FilePath, 'utf8');
      setItems( JSON.parse(file) )
      console.log("Loaded inventory from file: " + FilePath)  
    }catch(e){
      console.warn(e)
      setItems([])
      // alert("Error loading file")
    }
    
  }
  async function SaveFromInventoryToStoreFile (){
    await EnsureWorkDirectoryExists()
    const Filename = "store" + Settings.store + ".txt";
    const FileContent = JSON.stringify( items );
    const FilePath = RNFS.ExternalStorageDirectoryPath + Settings.ExportFilesPath + "/" + Filename;
    RNFS.writeFile(FilePath, FileContent, 'utf8')
    .then((success) => {
      alert("Saved Successfully  :) ")
        console.log(`Saved Inventory Successfully to file: ${FilePath}`);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error saving to file")
      });
  }
  async function playSound() {
    console.log('Playing Sound');
    await sound.replayAsync(); 
  }
  function handleBarCodeScanned({ type, data }) {
    console.log("Barcode Scanned: " + data + " Type: " + type)
    setScanned(true)
    setitemCode(data)
    addToInventory(data, parseInt(Qty))
    setTimeout(() => {
      setScanned(false)
    }, Settings.ScanCoolDown)
  };
  function addToInventory(lItemCode, lqty ){
    console.log("Attempting to add Items: " + lItemCode + " Qty: " + lqty)
    playSound();
    setQty("1")
    setitemCode("")

    if(lqty == 0 || isNaN(lqty)) return; 
    if(!lItemCode || lItemCode.length <= 0) return; 

    var Allitem = [...items]
    const itemName = itemTable.find((x) => {return x.barcode == lItemCode })?.name
    
    if (!itemName || itemName.length < 1) {
      alert("This is item is not defined")
      return;
    }

    const ItemIndex = Allitem.findIndex(item => item.item == lItemCode)

    if ( ItemIndex >= 0 ){ // if item is in inventory
      if(Allitem[ItemIndex].qty + lqty <= 0 ){
        // if the qty after modification is less than or equal to 0
        // to remove the item if qty get below 0

        //remove the item
        Allitem.splice(ItemIndex, 1)
      }else{
        //else make the modification
        Allitem[ItemIndex] = {item: lItemCode, qty: Allitem[ItemIndex].qty + lqty, item_name: itemName}
      }
    }else{
      //else add new item
      Allitem.push({qty: lqty, item:lItemCode, item_name: itemName})
    }

    setItems(Allitem)
  }
  return (

    <View style={{flex:1, backgroundColor:"white"}}>

      {Settings.EnableBarcodeCamera?<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{position:"absolute", top:-200, bottom:200, left:0, right:0 }} ></BarCodeScanner>:undefined}
      <View style={{flex:1, elevation:2, flexDirection:"column"}}>

        <View style={{height:80, backgroundColor:'white', justifyContent:"space-between", alignItems:"center", flexDirection:"row"}}>
          <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
            <Image source={require("../images/menu.png")} style={{marginLeft:10}} />
          </TouchableOpacity>
          <Text> Store {Settings.store} - Inventory </Text>
          <TouchableOpacity onPress={SaveFromInventoryToStoreFile}>
            <Image source={require("../images/save.png")} style={{height:50, width:50, marginRight:10}} ></Image>
          </TouchableOpacity>
        </View>
        
        {Settings.EnableBarcodeCamera?<View style={{height:100, backgroundColor:'transparent', justifyContent:"center", padding:5 }}>
          
         <View style={{height:StyleSheet.hairlineWidth, backgroundColor:"red"}}></View> 
        </View>: undefined }

        <View style={{flex:1, backgroundColor:'white', flexDirection:"column", padding:5}}>
          
        <View style={{backgroundColor:"white", flexDirection:"row",height:60, justifyContent:"center", alignItems:"center", marginVertical:10}}>
              <TextInput style={{ borderWidth:2, flex:3, backgroundColor:"#EDEDED",height:60, textAlign:"center", fontSize:15, marginHorizontal:3}}
              onChangeText={setitemCode}
              value={itemCode}
              placeholder="Item Barcode"
              />
              <TextInput style={{ borderWidth:2, flex:1, backgroundColor:"#EDEDED" ,height:60, textAlign:"center", fontSize:30, marginHorizontal:3}}
              onChangeText={setQty}
              value={Qty}
              keyboardType={"numeric"}
              placeholder="Qty"
              />
          </View>
          <View style={{backgroundColor:"#EDEDED", flex:1, padding: 10, borderWidth:1}}>            
            <ScrollView>
              { items.map(item => {
                return ( <TableRow key={item.item} qty={(item.qty).toString()} item={item.item} item_name={item.item_name}/> )
              }) }

            </ScrollView>
          </View>
        </View>

        <View style={{height:150, justifyContent:'center', alignItems:"center", backgroundColor:"white"}}>
            <View style={{position:"absolute", left:5, top:5, backgroundColor:"#EDEDED", width:100, alignItems:"center", borderWidth:1}}>
              <Text style={{fontSize:20}}>{items.length}</Text>
            </View>
            <TouchableOpacity onPress={() => {addToInventory(itemCode, parseInt(Qty))}} style={{
              backgroundColor:"#D6F0FF", width:100, height:100, borderRadius:100, justifyContent:'center', alignItems:'center', borderWidth:2, borderColor:"#00A3FF"
              }}>
              <Image source={require("../images/down.png")} style={{width:50, height:50}} />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const TableRow = (props) => {
  return (
    <View style={{flexDirection:"row"}}>
        <View style={{ flex:5}}>
              <Text style={{flex:1,backgroundColor:"white", borderColor:"black", borderWidth:1, textAlign:"left", paddingLeft:15, color:"black", height:40, textAlignVertical:"center"}}>{props.item_name}</Text>
              <Text style={{flex:1,backgroundColor:"white", borderColor:"black", borderWidth:1, textAlign:"left", paddingLeft:15, color:"black", height:40, textAlignVertical:"center"}}>{props.item}</Text>
        </View>
        <View style={{ flex:1}}>
        <Text style={{flex:1, fontSize:30, backgroundColor:"white", borderColor:"black", borderWidth:1, textAlign:"center", color:"black", height:40, textAlignVertical:"center"}}>{props.qty}</Text>
        </View>
    </View>
  )
}