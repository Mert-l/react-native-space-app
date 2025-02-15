import * as React from 'react';
import { View, useWindowDimensions , Text, StyleSheet} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Another from  "./Another.js"
import Onemore from  "./Onemore.js"
import globe from  "./Globe.js"
import Mars from  "./Mars.js"
import Saturn from  "./Saturn.js"
import Venus from  "./Venus.js"
import Uranus from  "./Uranus.js"
import Jupiter from  "./Jupiter.js"
import Neptune from  "./Neptune.js"
import Mercury from  "./Mercury.js"



const renderScene = SceneMap({
  first: globe,
   second: Venus,
 third: Uranus,
  fourth: Mars,
   fifth: Saturn,
   six: Jupiter,
   seven: Neptune,
   eight: Mercury,
});

export default function Home() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
   { key: 'second', title: 'Second' },
     { key: 'third', title: 'third' },
    { key: 'fourth', title: 'fourth' },
    { key: 'fifth', title: 'fifth' },
    { key: 'six', title: 'six' },
    { key: 'seven', title: 'seven' },
    { key: 'eight', title: 'eight' },

  ]);


  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      style={{ backgroundColor: 'transparent', height: 0.1 }}
    />
  );



  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition= 'top'
      pagerStyle
      renderTabBar={renderTabBar}
      
    />

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

