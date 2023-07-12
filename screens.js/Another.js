import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Linking } from 'react-native';

export default function Another() {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const fetch_first_pics = async() =>{   
           
            try {
                const res= await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=50`)
    
                setArticles(res.data.results)            
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

            <ScrollView>
            
           { articles &&  articles.map((ele, idx) => {

                return(

                    <View style={styles.seperate}  >

                    <Text> {ele.title} </Text>
                    <Text> {ele.news_site} </Text>
                    
                    <Image
            style={{
              width: 400, 
              height: 300, 
            }}
            source={{
              uri: ele.image_url
            }}
          />

<Text> {ele.summary} </Text>

                        <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL(ele.url)}>
  Check it out
</Text>
        
        
        
                    </View>



                )


           })}

</ScrollView>


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
