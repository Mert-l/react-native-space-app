import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens.js/Home.js";
import Other from "./screens.js/Other.js";
import Try from "./screens.js/Try.js";
import Another from "./screens.js/Another.js";
import Onemore from "./screens.js/Onemore.js";

import Globe from "./screens.js/Globe.js";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      {props.state.routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate(route.name)}
        >
          <Text style={styles.drawerItemText}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTintColor: "rgba(225, 216, 216, 0.98)",
          headerStyle: { backgroundColor: "black" }, 
          drawerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", 
            width: 250, 
          },
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerType: "front", 
          overlayColor: "rgba(28, 27, 27, 0.5)", 
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="People in space" component={Other} />
        <Drawer.Screen name="Photos from Mars" component={Try} />
        <Drawer.Screen name="News" component={Another} />
        <Drawer.Screen name="Upcoming launches" component={Onemore} />
        <Drawer.Screen name="Globe (not finished)" component={Globe} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.07)", 
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)", 
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    
  },
  drawerItem: {
    padding: 23,
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(244, 236, 236, 0.1)", 
  },
  drawerItemText: {
    color: "white",
    fontSize: 16,
  },
});
