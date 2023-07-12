import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform } from "react-native";
import React, { useState, useEffect, Component } from "react";
import axios from "axios";

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconButton } from "react-native-paper";
import { useRef } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';


import Navbar from './Navbar.js'

export default function Home() {

    const _scrollView = useRef(null);

   const [spinning, setSpinning] = useState(true);
    const [pictures, setPictures] = useState(null)
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    // const [final_date, setFinal_date] = useState(new Date())
    const [selected,setSelected] = useState(null)

  
     




     useEffect(() => {
        const fetch_first_pics = async() =>{   
           
            try {
                const res= await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=llMjhUo9OGlmqJgR36fZX1CW6huP7lna3qTGsMUM`)
    
                setPictures(res.data.latest_photos)
                setSpinning(false);
                 console.log( 'the firstttttttt response',  res);
            } catch (error) {
                console.log(error);
            }
    
            // cons}])
        }
        fetch_first_pics()
        }, []);






     useEffect(() => {
      setSpinning(true)
    const fetchWeather = async() =>{   
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const arr =[]
        arr.push(year, month, day)
        const final = arr.join('-')
        console.log(final);
        try {
            const res= await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${final}&api_key=llMjhUo9OGlmqJgR36fZX1CW6huP7lna3qTGsMUM`)

            setPictures(res.data.photos)
            setSpinning(false)
             console.log( 'the response',  res);
        } catch (error) {
            console.log(error);
        }

        // cons}])
    }
    fetchWeather()
    }, [date]);
//  pictures && console.log( 'pics:' , pictures[0].img_src)


 const onChange = (event, selectedDate) => {
setSelected(selectedDate)
  };

//  console.log('date', date)

const submit =( ) => {


    setShowPicker(!showPicker);
    setDate(selected)
   
    // refs._scrollView.scrollTo(0)
    // console.log('final date', final_date)
    _scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
}




  return (
    <View style={styles.container}>


<Spinner
          visible={spinning}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />




        <TouchableOpacity   style={styles.opn}  onPress={() =>  setShowPicker(!showPicker)}  >
        <IconButton icon="calendar-edit" size={30} iconColor="white" />

        </TouchableOpacity>

      

{showPicker &&  <View style={styles.first_part}  >
    


    
    

    
    
    { showPicker && <DateTimePicker style={styles.picker} mode='date' display='spinner' value={date} onChange={onChange} themeVariant="light"  textColor="white"  maximumDate={new Date()}  />}
< View style={styles.two} >

        <TouchableOpacity   onPress={submit}  >

        {showPicker && <IconButton icon="content-save" size={25} iconColor="white" /> }
</TouchableOpacity>

        <TouchableOpacity  onPress={() => setShowPicker(!showPicker)}     >
        {showPicker && <IconButton icon="cancel" size={30} iconColor="white" /> }
        

</TouchableOpacity>   


</View>


    
    </View>
    }





<ScrollView style={styles.images} ref={_scrollView}>



        {  pictures && pictures.length == 0 ? <Text style={styles.no_pics} >no pics on this day</Text> : pictures && pictures.map((ele, idx) => {
            return(
            <View>
            <Image
            style={{
              width: 400, 
              height: 300, 
            }}
            source={{
              uri: ele.img_src
            }}
          />

          <Text> {ele.earth_date} </Text>

          </View>
)

        })  } 

      
   </ScrollView> 


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
   
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    width: "100%",
  },

  first_part: {
    
    backgroundColor: 'rgb(50, 50, 50)',
    height: 300,
    width: '100%',
    alignItems: 'center',
   
    // marginTop: '10%',

    flexDirection: 'row',
    justifyContent: 'flex-end',
    //  backgroundColor: 'b',
     opacity: 0.90,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,

    
 
  },
  filtering: {
    // position:"absolute",
    // top: 60,
    // left:0,
    // marginBottom: '17%',
    marginRight: '3%',
    marginTop: '15%',
   
  },
  picker: {
    height: '30%',
    // width: '50%',
    marginTop: '15%',
  
  },
  images: {
  
   
    height: '100%',
  },
  opn: {
    position: 'absolute',
    top:90,
    left: 0,
    
    height: 60,
    width:60,
  zIndex:1,
    
  },
  no_pics: {
    top: 200,
  },
  two: {
    marginTop: 50,
  }


});

