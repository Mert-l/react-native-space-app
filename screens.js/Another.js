import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { Linking } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";


export default function Another({ navigation }) {
  const [articles, setArticles] = useState(null);
  const [spinning, setSpinning] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTintColor: "#0F2357" });
  });


  useEffect(() => {
    const fetch_first_pics = async () => {
      try {
        const res = await axios.get(
          `https://api.spaceflightnewsapi.net/v4/articles/?limit=50`
        );
        const result = res.data.results.map((res) => ({
          data: res,
          loaded: false,
        }));
        setArticles(result);
       
        // setSpinning(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetch_first_pics();
  }, []);

  // articles && console.log(articles);

  const handleLoading = (idx) => {
    let objToString = JSON.stringify(articles);
    let copyObj = JSON.parse(objToString);
    // let articlesCopy = [...articles];
    copyObj[idx].loaded = true;
    setArticles(copyObj);
  };

  useEffect(() => {
    if (articles && articles.length > 0) {
      let new_ = articles.slice(0, 2)
      if (new_.every((art) => art.loaded)) {
        setSpinning(false);
      }
    }
  }, [articles]);

  return (
    <SafeAreaView>
      <Spinner
        visible={spinning}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />

      <ScrollView  style={styles.cont}  >
        {articles &&
          articles.map((ele, idx) => {
            return (
              <View style={styles.seperate}>
                <Text  style={ styles.title}  > {ele.data.title} </Text>
                <Text  style={ styles.other} > {ele.data.news_site} </Text>

                <Image
                  style={{
                    height: Dimensions.get("window").height * 0.35,
                    width: Dimensions.get("window").width  ,
                    shadowOffset: {width: 4, height: 10},
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    padding: '20%',
                  
                  }}
                  source={{
                    uri: ele.data.image_url,
                  }}
                  onLoadEnd={() => handleLoading(idx)}
                />

                <Text  style={ styles.other} > {ele.data.summary} </Text>

                <Text
                  style={{ color: "#0F2357", textDecorationLine: 'underline', fontWeight: 600, marginBottom: '1%', padding: '2%' }}
                  onPress={() => Linking.openURL(ele.data.url)}
                >
                  Check it out!
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },

  seperate: {
    marginTop: "5%",
  
    shadowOffset: {width: 4, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 6,
     backgroundColor: '#F0F3F8',
    
   
  },
  spinnerTextStyle: {
    color: 'white',
  },
  cont: {
    marginTop: '7%',
  },
  title: {
    fontSize: 20, 
    color: '#0F2357' ,
    fontFamily: 'American Typewriter, serif',
    fontWeight: '600',
    padding: '2%',
    paddingLeft: 0,
    shadowOffset: {width: 4, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  other: {
    fontSize: 16, 
    color: '#0F2357' ,
    fontFamily: 'American Typewriter, serif',
    fontWeight: '500',
    padding: '2%',
    // paddingLeft: 0,
    padding: '2%',
    shadowOffset: {width: 4, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
});