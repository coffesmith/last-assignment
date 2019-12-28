import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import uuid from 'uuid/v1'

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <MaterialCommunityIcons name='calendar-multiselect' size={25} style={{ color: tintColor }} />
    ) //기본설정을 한 뒤 넘겨준다는 느낌
  }

  _storeData = async() => {
    await AsyncStorage.setItem('@diary: state', JSON.stringify(this.state))
  }
  _getData = async() => {
    const mystate = await AsyncStorage.getItem('@diary: state')
    if (mystate !== null) {
      this.setState(JSON.parse(mystate))
    }
  }
  constructor(props){
    
    super(props)
    this.state={
      selectedDate: '',

      Posts: [{
        id :1,
        title: '11월 18일',
        content: '본문',
        date: '2019-11-18'
      },
      {
        id :2,
        title: '11월 18일',
        content: '본문',
        date: '2019-11-18'
      },

    ]
    }
  }
  componentDidMount(){
    this._getData()
    console.log("didmountlog")
    this.props.navigation.addListener(
      'didFocus',
      () => {
        console.log("addlistener")
        newpost = this.props.navigation.getParam('myparam')
        signal = this.props.navigation.getParam('signal')
        console.log(newpost)
        if (newpost) {
          const PrevPosts = [...this.state.Posts]
          this.setState({Posts: PrevPosts.concat(newpost)}, this._storeData)
          this.props.navigation.navigate('MainScreen', {myparam: false})
        } else if (signal) {
          const PrevPost2 = [...this.state.Posts]
          deleteindex = PrevPost2.findIndex((item) => {item.id === signal});
          PrevPost2.splice(deleteindex, 1)

          this.setState({Posts: PrevPost2})
          this.props.navigation.navigate('MainScreen', {signal: false})
        }
      }
    )
  }
  newPost = this.props.navigation.getParam('myparam')

  render(){
    console.log(this.state.selectedDate)
    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          onDayPress={(day) => {this.setState(this.state.selectedDate = day)}}
          current={new Date()}
        />
        <ScrollView>
          <FlatList
            data={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString})}
            renderItem={({item, index})=>{
              return (
                <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate('Detail', {post:item})}}>
                    {/* //클래스로 받아왓기 때문에 this.props라고 해야한다 */}
                  <View>
                    <Text>
                      {item.title}
                    </Text>
                    <Text>
                      {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, index) => {return `${index}`}}
          />
        </ScrollView>
      </SafeAreaView>

    )}
  
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:50,
    },
    textstyle:{
        fontSize: 40,
    }
  });