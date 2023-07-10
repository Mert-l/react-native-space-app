import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Navbar from './Navbar.js'

export default function Home() {

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
                 console.log( 'the firstttttttt response',  res);
            } catch (error) {
                console.log(error);
            }
    
            // cons}])
        }
        fetch_first_pics()
        }, []);






     useEffect(() => {
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
    // console.log('final date', final_date)
}




  return (
    <View style={styles.container}>

        <TouchableOpacity>
            <Text  style={styles.opn}  >kfvn</Text>

        </TouchableOpacity>


{showPicker &&  <View style={styles.first_part}  >
    

    {/* <DropDownPicker
            style={styles.date_picker}
        items={[
            {label: 'Item 1', value: 'item1'},
            {label: 'Item 2', value: 'item2'},
        ]}
        defaultIndex={0}
        containerStyle={{height: 40}}
        onChangeItem={item => console.log(item.label, item.value)}
    /> */}
    
    
    {showPicker ? <Text style={styles.filtering}  onPress={submit}  >submit</Text> : <Text style={styles.filtering}  onPress={() =>  setShowPicker(true)}  >choose date</Text>}
    
    
    { showPicker && <DateTimePicker style={styles.picker} mode='date' display='spinner' value={date} onChange={onChange}  />}
    
    
    </View>
    }




<ScrollView style={styles.images}  >




        {  pictures && pictures.length == 0 ? <Text>no pics on this day</Text> : pictures && pictures.map(ele => {
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    width: "100%",
  },

  first_part: {
    
    backgroundColor: 'transparent',
    height: 130,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    // marginTop: '10%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
 
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
    zIndex: 0,
    flex: 1,
    height: '100%',
  },
  opn: {
    position: 'absolute',
    top:100,
    right: 50,
    backgroundColor: 'red',
    height: 50,
    width:50,
     zIndex: 1,
    
  }

});

