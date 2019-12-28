import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {withNavigation} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';


const WriteHeader = ({navigation, saveProps, selectImage}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}//넘어왔던 이전 페이지로 넘어간다
          hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}>
            <Ionicons name="ios-arrow-back" size={25}/>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={()=> selectImage()}
            hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}>
              <Ionicons name="ios-image" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity
              onPress ={() =>{
                saveProps();
              }}
              hitSlop={{ top: 2, bottom: 2, left: 2, right: 2 }}>
              <Ionicons name="ios-save" size={25}/>
          </TouchableOpacity>
          </View>
      </View>
    )
  }

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    },
    iconContainer: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between'
    }
  })
  

export default withNavigation(WriteHeader); //네비게이션정보를 같이 받고자 한다. 
// 라이트 헤더는 라이트 스크린 안에 들어가는 내용이기때문에 네비게이션 내용을 못받기 때문에 withnavigation으로 묶어서 밖으로 내보낸다