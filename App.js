import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation';
import {  createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack';

import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const BaseNavi = createBottomTabNavigator({
  
  MainScreen: {
   
    screen: MainScreen,
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions : {
      tabBarIcon : ({tintColor}) =>( //함수 뒤 소 괄호는 어떤값을 리턴해 주겠다는 뜻
        <MaterialCommunityIcons name ="calendar-multiselect" size={30} style={{color:tintColor}}/>
      ) 
    },
  },
	WriteScreen: {
    screen: WriteScreen,
  },
  
},
{
  tabBarOptions:{
    showLabel:false
  }
});
const BaseNavi2 = createStackNavigator(
  {
    Write : WriteScreen,
    Tab : BaseNavi,
    Detail : DetailScreen, //네비게이터를 만드는데 디테일이라는 이름으로 들어오면 디테일스크린을 띄워줘라
  },
  {
    initialRouteName:'Tab',
    headerMode : 'none'
  }

)
const MyNavi = createAppContainer(BaseNavi2)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MyNavi/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
