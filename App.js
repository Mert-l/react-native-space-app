import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Video from 'react-native-video';
import axios from 'axios';
import * as $ from 'jquery';
import video from './assets/Earth_Background.mp4';
import { Video, ResizeMode } from 'expo-av'

export default function App() {

//   useEffect(() => {
//     const fetchWeather = async() =>{    
//       const res= await axios.get(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=DEMO_KEY`)

   
//         console.log( 'smth transfer',  res);
//         // cons}])
//     }
//     fetchWeather()
//     }, []);

//     useEffect(() => {
//       const fetchWeather = async() =>{    
//         const res= await axios.get( `https://api.nasa.gov/DONKI/GST?startDate=2023-05-01&endDate=2023-05-07&api_key=DEMO_KEY`)
  
     
//           console.log( 'res from reover?',  res);
//           // cons}])
//       }
//       fetchWeather()
//       }, []);






//     // const request = require('request');
//     // var name = 'Neptune';
//     // request.get({
//     //   url: 'https://api.api-ninjas.com/v1/planets?name=' + name,
//     //   headers: {
//     //     'X-Api-Key': 'Y/KpXwENCt0MuooEtwdh0w==nKpoX10n25tmB1O4'
//     //   },
//     // }, function(error, response, body) {
//     //   if(error) return console.error('Request failed:', error);
//     //   else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
//     //   else console.log(body)
//     // });



// console.log('fvsfef')




  return (
    <View style={styles.container}>
    

    <Video
          source={video}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode={"cover"}
          repeat
          style={styles.video}
        />



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
