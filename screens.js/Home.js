import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundVideo from "../assets/Earth_Background.mp4";
import { Video } from "expo-av";
import Navbar from './Navbar.js'

export default function Home() {
  const video = React.useRef(null);
  useEffect(() => {
    video.current.playAsync();
  }, []);
  return (
    <View style={styles.container}>




      
      <Video
        ref={video}
        source={backgroundVideo}
        rate={1.0}
        volume={1.0}
        muted={true}
isLooping
        resizeMode={"cover"}
        repeat={true}
        style={styles.video}
      />

      {/* <TouchableOpacity style={styles.menu_icon}   onPress={()=> console.log('pressed ')}  >
      <View  />
      </TouchableOpacity> */}

{/* <Navbar/> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    width: "100%",
  },
  menu_icon:{
    backgroundColor: 'red',
    width: '100%',
    height: '30%',
    position: 'absolute',
    top: 100,
    left: 100,
  }
});

