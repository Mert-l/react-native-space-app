import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
// import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import axios from "axios";
import backgroundVideo from "./assets/Earth_Background.mp4";
import { Video } from "expo-av";
import Home from "./screens.js/Home.js"
import Other from  "./screens.js/Other.js"
import Try from  "./screens.js/Try.js"

export default function App() {

  const Drawer = createDrawerNavigator();



  return (

        <View  style = {styles.container} >
  
      


    




      <NavigationContainer>
        <Drawer.Navigator  screenOptions={styles.nav}   >
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="People in space" component={Other} />
        <Drawer.Screen name="try" component={Try} />
      </Drawer.Navigator>

</NavigationContainer>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
 
 
  },
  video: {
    flex: 1,
    width: "100%",
  },

  nav: {
    drawerStyle: {
       backgroundColor: 'black',
      width: '50%',
       opacity: '0.5',
      overlayColor: '0.9',
      
    },
    drawerType: 'front',
    drawerItemStyle: {
      color: 'white',
      marginTop: '25%',
      
       
      
    },
    drawerActiveBackgroundColor: {
      color: 'grey'
    },
    drawerActiveTintColor: '#FFFFFF',
    drawerInactiveTintColor: '#E0E1EE',
    drawerHideStatusBarOnOpen: 'true',
    headerTintColor: 'white',
    headerTransparent: 'true',
    
  

  }
  
});
