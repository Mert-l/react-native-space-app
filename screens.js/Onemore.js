import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, FlatList, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Linking } from 'react-native';
// import { useRoute } from "@react-navigation/native";


export default function Onemore({route}) {
// const route = useRoute()
    const [launches, setLanuches] = useState(null);
    const arr = [];


    // useEffect(()=>{
    //   console.log('e',launches)
    //   if(launches){
    //     route.params.send_n( 'Hello' )

    //   }
   
    //   },[launches])

    useEffect(() => {
        const fetch_first_pics = async() =>{   
           
            try {
                const res= await axios.get(`https://fdo.rocketlaunch.live/json/launches/next/5`)
    
                setLanuches(res.data.result)
            
            } catch (error) {
                console.log(error);
            }
    
            
        }
        fetch_first_pics()
        }, []);


        const organise = () => {

         launches.map((ele, idx) => {

         let link =   ele.quicktext.split(' - ')
        
  
                arr.push({
                    date: ele.date_str,
                    desc: ele.launch_description,
                    country: ele.pad.location.country,
                    provider: ele.provider.name,
                    name: ele.name,
                    url: link[3].slice(0, -15),
                    key: idx,
                    vehicle: ele.vehicle.name,
                })
            })
        }

launches && organise();





// launches && console.log(launches)

  return (

<ImageBackground source={{uri:'https://media.npr.org/assets/img/2022/11/15/gettyimages-1244757596_custom-6702953f4ced616144e09bbe9ca792023c66708a-s1100-c50.jpg'}} resizeMode="cover" style={styles.image}>

        <SafeAreaView style={styles.container} >

        <FlatList   
        style = {styles.cont}
        data={arr}
        renderItem={ ({item}) => (

            <View style={styles.seperate} key ={Math.random() } >
            <Text style={styles.txt} > Mission: {item.name} </Text>
            <Text style={styles.txt} > Date: {item.date} </Text>
            <Text style={styles.txt} > Country: {item.country} </Text>
            <Text style={styles.txt}  > Provider: {item.provider}  </Text>
            <Text style={styles.txt}  > Description: {item.desc}  </Text>
            <Text style={styles.txt}  > Vehicle: {item.vehicle}  </Text>
            <Text style={{color: 'white', textDecorationLine: true, marginLeft: '3%', }}
      onPress={() => Linking.openURL(item.url)}> 
Link to a live stream
</Text>

            </View>
        )



        }
        
        
        />

            






        </SafeAreaView>

</ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: '10%',
    flex: 1,
    // backgroundColor: "#4E4F5E",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },

  seperate: {
    justifyContent: 'center',
    justifyContent: 'space-around',
    // alignItems: 'center',
     marginTop: '7%',
    backgroundColor: '#999B9F80',
    //  opacity: .7,
    width: '95%',
    height: 250,
    borderRadius: 18,
    

    
  },
  txt: {
    color: 'white',
    marginLeft: '3%',
  },
  cont: {
    marginTop: '10%',
    marginLeft: '4%',
  }

});
