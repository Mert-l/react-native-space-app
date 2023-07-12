// import React, { useLayoutEffect } from "react";
// import {  View } from "react-native";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5map from "@amcharts/amcharts5/map";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
// import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
// import { useNavigate } from "react-router-dom";

// function globe() {
// //   const navigate = useNavigate();
//   useLayoutEffect(() => {
//     // CREAETE A ROOT ELEMENT
//     let root = am5.Root.new("chartdiv");
//     // SET THEMES
//     root.setThemes([am5themes_Animated.new(root)]);

//     //CREATE MAP CHART
//     let chart = root.container.children.push(
//       am5map.MapChart.new(root, {
//         // SETTING A PROJECTION
//         projection: am5map.geoOrthographic(),
//         // SETTING A ROTATION ON PAN
//         panX: "rotateX",
//         // panY: "rotateY",
//         panBehavior: "rotateLongLang",
//         //ZOOMING
//         wheelY: "zoom",
//         //LEVELS OF ZOOMING
//         // minZoomLevel: 0.5, // TILL 1
//         // maxZoomLevel: 16, // TILL 32
//         // wheelSensitivity: 0.7 // WHEEL SENSITIVITY
//         maxPanOut: 0, // HOW FAR IT CAN BE DRAGGED OUT FROM THE VIEWPORT- 0.4 BY DEFAULT
//         // PADDING
//         paddingBottom: 20,
//         paddingTop: 20,
//         paddingLeft: 20,
//         paddingRight: 20,
//         // deltaLatitude: -20,
//       })
//     );
//     // root.deltaLatitude = -20;

//     // SPECIFYING POLYGONS FOR COUNTRIES
//     let polygonSeries = chart.series.push(
//       am5map.MapPolygonSeries.new(root, {
//         geoJSON: am5geodata_worldLow,
//       })
//     );
//     // BINDING DATA TO POLYGON SERIES
//     polygonSeries.mapPolygons.template.setAll({
//       tooltipText: "{name}",
//       toggleKey: "active",
//       interactive: true,
//       // SETTING A POLYGON STYLES/APPEARANCE
//       stroke: am5.color(0xc92c2c), // STROKE COLOR (HEX VALUE - Ox INSTEAD OF HASH)
//       strokeWidth: 0.5, // STROKE WIDTH
//       fill: am5.color(0xf7f49c),
//       fillOpacity: 1, // COUNTRY FILL OPACITY
//     });
//     // GEOMETRIC STRUCTURE OVER CERTAIN POSITION
//     // polygonSeries.data.push({
//     //   geometry: am5map.getGeoCircle({ latitude: 48.86, longitude: 2.35 }, 10),
//     // });

//     // CHANGING COLOR ON HOVER
//     polygonSeries.mapPolygons.template.states.create("hover", {
//       fill: root.interfaceColors.get("primaryButtonHover"),
//     });
//     // SETTING COLOR OF ACTIVE COUNTRY
//     // polygonSeries.mapPolygons.template.states.create("active", {
//     //   fill: root.interfaceColors.get("primaryButtonHover"),
//     // });

//     polygonSeries.mapPolygons.template.events.once("click", function (ev) {
//     //   navigate(`/${ev.target._dataItem.dataContext.name}`);
//     });

//     // CREATING BACKGROUND FILL
//     const backgroundSeries = chart.series.push(
//       am5map.MapPolygonSeries.new(root, {})
//     );
//     backgroundSeries.mapPolygons.template.setAll({
//       fill: root.interfaceColors.get("alternativeBackground"),
//       fillOpacity: 0.1,
//       strokeOpacity: 0,
//     });
//     // BACKGROUND ONLY ON GLOBE
//     backgroundSeries.data.push({
//       geometry: am5map.getGeoRectangle(90, 180, -90, -180),
//     });
//     chart.animate({
//       key: "rotationX",
//       from: 0,
//       to: 360,
//       duration: 20000,
//       loops: Infinity,
//     });
//     // DISPOSING OUR MAP TO RENDER
//     return () => {
//       // chart.appear();
//       root.dispose();
//     };
//   }, []);

//   return <View id="chartdiv" style={{ width: "100%", height: "500px" }}></View>;
// }
// export default globe;

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundVideo from "../assets/Earth_Background.mp4";
import { Video } from "expo-av";
import Navbar from './Navbar.js'

export default function globe() {
  const video = React.useRef(null);
  useEffect(() => {
    video.current.playAsync();
  }, []);
  return (
    <View style={styles.container}>




      
      <Video
        ref={video}
        source={backgroundVideo}
        rate={1.0}
        volume={1.0}
        muted={true}
isLooping
        resizeMode={"cover"}
        repeat={true}
        style={styles.video}
      />

      {/* <TouchableOpacity style={styles.menu_icon}   onPress={()=> console.log('pressed ')}  >
      <View  />
      </TouchableOpacity> */}

{/* <Navbar/> */}


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
  menu_icon:{
    backgroundColor: 'red',
    width: '100%',
    height: '30%',
    position: 'absolute',
    top: 100,
    left: 100,
  }
});
