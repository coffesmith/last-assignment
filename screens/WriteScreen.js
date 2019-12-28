import React from 'react';
import { TextInput, StyleSheet, Image, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import WriteHeader from '../components/WriteHeader'
import uuid from 'uuid/v1';
import * as ImagePicker from 'expo-image-picker'

const {width, height} = Dimensions.get('window');

export default class WriteScreen extends React.Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='calendar-multiselect' size={25} style={{ color: tintColor }}/>
        ),
        tabBarOnPress : ({navigation}) => {
            navigation.navigate('Write');
        }
    }
    constructor(props){
        super(props)
        this.state ={
            inputtitle:'',
            inputcontent:'',
            imageUri:'',
        }
    }
    _showTitle = (value) => {  
        this.setState({inputtitle:value})  
    }
    _showContent = (value) =>{
        
        this.setState({inputcontent:value})
    }


    _changetitle = (value) =>{
        this.setState({inputtitle:value})
    }
    _changecontent = (value) =>{
        this.setState({inputcontent:value})
    }
    _gettoday = () =>{
        tyear = (new Date().getFullYear()).toString()
        tmonth = (new Date().getMonth()+1).toString()
        tday = (new Date().getDate()).toString()
        if (parseInt(tmonth) <10){
            tmonth = '0' + tmonth

        }
        if (parseInt(tday) <10){
            tday = '0' + tday
        }
        return (tyear + '-' + tmonth + '-' + tday)
    }
    _saveText =() =>{
        console.log("세이브")
      if(this.state.inputtitle !== ''){
        console.log("if문")
        const id = uuid()
        const date = this._gettoday()
        const newPost ={
            id : id,
            title : this.state.inputtitle,
            content : this.state.inputcontent,
            date : date,
            imageUri: this.state.imageUri,
        }
        this.setState(
            {
                inputtitle:'',
                inputcontent:'',
                imageUri:'',
            }
        )
        this.props.navigation.navigate('MainScreen',{myparam : newPost})
      }  
      else{
        this.props.navigation.navigate('MainScreen')
      }
    }
    _selectImage = async () => {
        console.log("aaa")
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        console.log(result);
        if (!result.cancelled) {
            this.setState({ imageUri: result.uri });
        }
    };

    render() {
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
              <WriteHeader saveProps={this._saveText} selectImage={this._selectImage}/>
              <TextInput
                onChangeText={this._showTitle}
                value = {this.state.inputtitle}
                placeholder="제목을 입력하세요"
                style={styles.title}
                returnKeyType="done" />

                { this.state.imageUri ?
                <Image source={{uri:this.state.imageUri}} style={{width:200, height: 200}}/> : null}
                
              <TextInput
                onChangeText={this._showContent}
                value = {this.state.inputContent}
                placeholder="내용을 입력하세요"
                multiline={true} //여러줄에 걸친 입력이 가능합니다
                style={styles.content}
                returnKeyType="done" />
            </View>
          </SafeAreaView>
    )}
    
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontcontainer: {
        fontSize: 30,

    },
});