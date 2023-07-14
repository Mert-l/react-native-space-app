import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';


export default function Other() {
  const [spinning, setSpinning] = useState(true);
    const spacecrafts = [];
    const [res, setRes] = useState(null)
    const image = {uri: 'https://eoportal.org/ftp/satellite-missions/a/Axiom_020622/Axiom_Auto6.jpeg'};

  useEffect(() => {
    const fetchWeather = async() =>{    
        fetch('http://api.open-notify.org/astros.json')
        .then(response =>  response.json())
        .then(data => setRes(data));
        
        setSpinning(false);
       
    }
    fetchWeather()
   
    }, []);

    // res && console.log(res)


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


  return (


    <View style={styles.containerr}>

      
<Spinner
          visible={spinning}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />


    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
     


    <SafeAreaView style={styles.container}>

        

        <Text style={styles.cap}  > There are {res&& spacecrafts.length} spacecrafts and {res && res.people.length} people in space right now </Text>

        {res && spacecrafts.map((ele, idx) => {
            return(
                
                
                    <View style={styles.seperate} key ={idx *Math.random() } >
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




    </ImageBackground>
  </View>












 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    justifyContent: 'space-around'
  },
  containerr: {
    flex: 1,
   
  },
 
  e: {
    top:20,
    left: 20,
    color: 'white',
  },
  seperate: {
    justifyContent: 'space-between',
    margonTop: '40%',
    backgroundColor: '#45474D95',
    width: '77%',
    height: '35%',
    borderRadius: 15,
  },

  list: {
    padding: '5%',
    backgroundColor: '#A4A6AB20',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    
  },
  list_item:{
    padding:'4%',
    backgroundColor: '#D3D6DD50',
    marginTop: '5%',
    borderRadius: 15,
    color: 'white',
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
    
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: 'white',
  }


});

