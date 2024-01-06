import * as React from 'react';
import {useState} from 'react'
import { Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


export default function RecordAnswerCountDown({ navigation }) {
  const question = navigation.getParam('question');
  const domain = navigation.getParam('domain');
  const dur = 5

  
  const [isPlaying, setIsPlaying] = useState(false);
  
  const pressHandler = () => {
    navigation.navigate('Questions',{domain});
  }
  
  const pressHandler1 = () => {
    navigation.push('RecordAnswerThreeOne',{question, domain});
  }

  const pressHandler2 = () => {
    setIsPlaying(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryBox}>
          <Text style={styles.category}>Get Ready To Answer</Text>
      </View>
      <Text style={styles.question}>
        {question.question }
      </Text>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={dur}
        colors={[
          ['#37266b', 1],
          // ['#F7B801', 0.4],
          // ['#A30000', 0.2],
        ]}
        onComplete={() => pressHandler1()}
    >
      {({ remainingTime, animatedColor, }) => (
        <Animated.Text style={{ color: animatedColor, fontSize: 40 }} >
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity
          style={styles.SignUpButtonStyle}
          activeOpacity = { .5 }
          onPress={ () => pressHandler2() }
      >
          <Text style={styles.EditButtonTextStyle}> Start </Text>
      </TouchableOpacity>
      <TouchableOpacity
          style={styles.SignUpButtonStyle}
          activeOpacity = { .5 }
          onPress={ () => pressHandler() }
      >
          <Text style={styles.EditButtonTextStyle}> Cancel </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    padding: "1%",
  },
  categoryBox: {
    margin:"1.5%",
    justifyContent: 'center',
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#f7901f',
    borderRadius: 20,
    marginTop: 10
  },
  category: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
  },
  question: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: "1%",
    paddingVertical: "15%"
  },  
  SignUpButtonStyle: {
    marginTop:"15%",
    paddingVertical:"3%",
    backgroundColor:'#f7901f',
    borderRadius:20,
    marginHorizontal: '5%'
  },
  EditButtonTextStyle:{
      color:'#fff',
      textAlign:'center',
      paddingHorizontal:'10%',
      fontSize: 18,
      fontWeight: "bold"
  },
});
