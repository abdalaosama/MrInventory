import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import InventoryScreen from './components/inventory';
import SettingsScreen from './components/settings';
import defaultAppSettings from './components/defaults';
import StoresScreen from './components/stores';
import LoginScreen from './components/login';

const Drawer = createDrawerNavigator();
export const SettingsContext = React.createContext(defaultAppSettings);

const changeSetting = (state, action) => {
  let NewSettings = { ...state};
  NewSettings[action.key] = action.value;
  // console.log(state)
  return NewSettings;
}


export default function App() {

  const [Settings, changeSettings] = React.useReducer(changeSetting, defaultAppSettings)
  useEffect(() => {
    // run on the start of the application

    return () => {
      // run on closing of the application
    }
  }, [])

  return (
    <SettingsContext.Provider value={{Settings: Settings, changeSettings: changeSettings}}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="stores" screenOptions={{headerShown: false}}>
          <Drawer.Screen name="inventory" component={InventoryScreen} />
          <Drawer.Screen name="settings" component={SettingsScreen} />
          <Drawer.Screen name="login" component={LoginScreen} />
          <Drawer.Screen name="stores" component={StoresScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

