import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Linking } from 'react-native';

export default function Onemore() {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const fetch_first_pics = async() =>{   
           
            try {
                const res= await axios.get(`https://api.le-systeme-solaire.net/rest/data=isPlanet`)
    
                         
                 console.log( 'news',  res);
            } catch (error) {
                console.log(error);
            }
    
            
        }
        fetch_first_pics()
        }, []);




articles && console.log(articles)

  return (

        <SafeAreaView>

       



        </SafeAreaView>


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
  },
  seperate: {
    marginTop: '5%',
    
  }
});
