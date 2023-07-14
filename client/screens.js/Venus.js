import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Linking } from 'react-native';
import backgroundVideo from "../assets/venus.mp4";
import { Video } from "expo-av";


export default function Venus() {

    const [planet, setPlanet] = useState(null);
    const [show, setShow] = useState(false)

    const video = React.useRef(null);
    useEffect(() => {
      video.current.playAsync();
    }, []);
  

    useEffect(() => {
        const fetch_first_pics = async() =>{   
           
            try {
                const res= await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/{venus}`)
    
                setPlanet(res.data)
             
            } catch (error) {
                console.log(error);
            }
    
            
        }
        fetch_first_pics()
        }, []);


    




// launches && console.log(launches)

  return (
    <View  style={styles.container} >

    <Video
    ref={video}
    source={backgroundVideo}
    rate={1.0}
    volume={1.0}
    muted={true}
isLooping
    resizeMode={"cover"}
    repeat={true}
    style={styles.vvideo}
  />


        <SafeAreaView style={styles.container} >
            
            {planet && <View  style={styles.seperate} >
    
            <Text  style={styles.txt} > {planet.englishName} </Text>
                    <Text  style={styles.txt} > Density: {planet.density} </Text>
                 
                    <Text  style={styles.txt} > Gravity: {planet.gravity} </Text>
                    <Text  style={styles.txt} > Eccentricity: {planet.gravity} </Text>
                    <Text  style={styles.txt} > Aphelion: {planet.aphelion} km </Text>
                    <Text  style={styles.txt} > Perihelion: {planet.perihelion} km</Text>
                    <Text  style={styles.txt} > Inclination: {planet.inclination}° </Text>
                    <Text  style={styles.txt} > Axial Tilt: {planet.axialTilt} </Text>
                       <Text  style={styles.txt} >Average temperature {(planet.avgTemp -273.15).toFixed(2) } °C </Text>
                      
                 
                 {planet.moons &&   <TouchableOpacity  onPress={ () => setShow(!show)} >
                        <Text  style={styles.txt} >Moons ↓</Text>
                    </TouchableOpacity> }
                    {show &&                <FlatList   
        style = {styles.cont}
        data={planet.moons}
        renderItem={ ({item}) => (
                <Text  style={styles.txt} >  {item.moon} </Text>
        )

        }
   
        />}


            </View>  }


        </SafeAreaView>

        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      // marginTop: '10%',
      flex: 1,
      // backgroundColor: "#4E4F5E",
      // alignItems: "center",
      justifyContent: "center",
      justifyContent: 'space-around',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
  
    seperate: {
      justifyContent: 'center',
      // justifyContent: 'space-around',
      // alignItems: 'center',
      //  marginTop: '7%',
     
      //  opacity: .7,
      width: '100%',
      height: '85%',
      borderRadius: 18,
      // backgroundColor: 'pink',
  
  
      
    },

    vvideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: '100%',
      },

    txt: {
      color: 'white',
      marginLeft: '3%',
      // backgroundColor: '#999B9F30',
      width: '50%',
      padding: '3%',
      borderTopEndRadius: '15',
    },
    cont: {
      marginTop: '10%',
    }
  
  });