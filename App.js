import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import InventoryScreen from './components/inventory';
import SettingScreen from './components/settings';
// import defaultAppSettings from './components/defaults';

const Drawer = createDrawerNavigator();
 
export default function App() {
  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="inventory" screenOptions={{headerShown: false}}>
        <Drawer.Screen name="inventory" component={InventoryScreen} />
        <Drawer.Screen name="settings" component={SettingScreen} />
      </Drawer.Navigator>
   </NavigationContainer>
  );
}

