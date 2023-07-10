import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundVideo from "../assets/Earth_Background.mp4";
import { Video } from "expo-av";


export default function Other() {

    const spacecrafts = [];
    const [res, setRes] = useState(null)

  useEffect(() => {
    const fetchWeather = async() =>{    
        fetch('http://api.open-notify.org/astros.json')
        .then(response =>  response.json())
        .then(data => setRes(data));

       
    }
    fetchWeather()
   
    }, []);


    // res && console.log(res)
   res && console.log(res.people.map(ele=>{
    console.log(Object.keys(ele))
   }))

    const organise = () => {

           if(res){
            res.people.map( ele => {

                if(spacecrafts.includes(ele.craft) == false ){
                    spacecrafts.push(ele.craft);
                }


            } )
           }


    }
    organise()

    // res && console.log(res.people[0].name)

console.log('ofc its an error', spacecrafts)
  return (


    <SafeAreaView style={styles.container}>

        

        <Text style={styles.cap}  > There are {res&& spacecrafts.length} spacecrafts and {res && res.people.length} people in space right now </Text>

        {res && spacecrafts.map(ele=> {
            return(
                
                
                    <View style={styles.seperate}  >
                            <Text  style={styles.craft_name}  > {ele} </Text>


                        <ScrollView style={styles.list} >
                            {res.people.map(element => {
                                if(element.craft === ele){
                                    return <Text style={styles.list_item} > {element.name} </Text>
                                }
                            })
                            
                            }

                     </ScrollView>


                    </View>




            )
        })  }

      





    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#303144",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: 'space-around'
  },
 
  e: {
    top:20,
    left: 20,
    color: 'white',
  },
  seperate: {
    justifyContent: 'space-between',
    margonTop: '40%',
    backgroundColor: '#494C71',
    width: '77%',
    height: '35%',
    borderRadius: 15,
  },

  list: {
    padding: '5%',
    backgroundColor: '#5C5E77',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    
  },
  list_item:{
    padding:'4%',
    backgroundColor: '#8587A0',
    marginTop: '5%',
    borderRadius: 15,
  },
  craft_name: {
    color: 'white',
    fontSize: 16,
    padding: '2%',
  },
  cap: {
    color: 'white',
    marginTop: '10%',
    fontSize: 14,
    
  }


});

