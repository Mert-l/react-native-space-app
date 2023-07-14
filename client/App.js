import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRoute } from "@react-navigation/native";
// import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import axios from "axios";
import backgroundVideo from "./assets/Earth_Background.mp4";
import { Video } from "expo-av";
import Home from "./screens.js/Home.js";
import Other from "./screens.js/Other.js";
import Try from "./screens.js/Try.js";
import Another from "./screens.js/Another.js";
import Onemore from "./screens.js/Onemore.js";
import globe from "./screens.js/Globe.js";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { AsyncStorage } from "react-native";
//  import Another_try from  "./screens.js/Another_try"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [route, setRoute] = useState("");
  const Drawer = createDrawerNavigator();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  let sendTokenToServer = async (token, userID) => {
    let url = `http://192.168.1.42:3030/gettoken`;
    axios
      .post(url, { token })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      if (token) {
        sendTokenToServer(token);
        // storetoken(token);
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // async function sendPushNotification(launch) {
  //   const message = {
  //     to: expoPushToken,
  //     sound: "default",
  //     title: "Original Title",
  //     body: `And here is the ${launch}!`,
  //     data: { someData: "goes here" },
  //   };

  //   await fetch("https://exp.host/--/api/v2/push/send", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Accept-encoding": "gzip, deflate",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(message),
  //   });
  // }

  let registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Your token is ", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator screenOptions={styles.nav}>
          <Drawer.Screen name="home" component={Home} />
          <Drawer.Screen name="People in space" component={Other} />
          <Drawer.Screen name="Mars photo database" component={Try} />
          <Drawer.Screen name="Space News" component={Another} />
          <Drawer.Screen name="upcoming launches" component={Onemore} />
          {/* <Drawer.Screen name="Another_try" component={Another_try} /> */}
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
      backgroundColor: "#00000070",
      width: "55%",
      //  opacity: '0.5',
      overlayColor: "0.9",
    },
    drawerType: "front",
    drawerItemStyle: {
      color: "white",
      marginTop: "25%",
    },
    drawerActiveBackgroundColor: {
      color: "grey",
    },
    drawerActiveTintColor: "#FFFFFF",
    drawerInactiveTintColor: "#DADBDE",
    drawerHideStatusBarOnOpen: "true",
    headerTintColor: "white",
    headerTransparent: "true",
  },
});
