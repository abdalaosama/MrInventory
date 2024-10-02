import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import InventoryScreen from './components/inventory';
import SettingsScreen from './components/settings';
import StoresScreen from './components/stores';
import LoginScreen from './components/login';

import { SettingsContextProvider } from './components/SettingsContenxt';

const Drawer = createDrawerNavigator();


export default function App() {

  useEffect(() => {
    // run on the start of the application

    return () => {
      // run on closing of the application
    }
  }, [])

  return (
    <SettingsContextProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="stores" screenOptions={{headerShown: false}}>
          <Drawer.Screen name="stores" component={StoresScreen} />
          <Drawer.Screen name="inventory" component={InventoryScreen} options={{ unmountOnBlur:true}} />
          <Drawer.Screen name="settings" component={SettingsScreen} />
          {/* <Drawer.Screen name="login" component={LoginScreen} options={{ swipeEnabled: false}} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContextProvider>
  );
}

