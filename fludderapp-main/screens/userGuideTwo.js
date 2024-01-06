import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function UserGuideTwo({ navigation }) {
  // let Image_Http_URL ={ uri: 'https://fludder.io/admin/assets/images/Fludder-Dashboard-logo.jpg'};
  let Image_Http_URL = require('../assets/fLogo.jpg');

  const pressHandler = () => {
    navigation.navigate('UserGuideThree')
  }

  const pressHandler1 = () => {
    navigation.navigate('Login');
  }
  return (
    <View style={{ flex: 1, }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
        {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
        <View style={{ marginTop: Constants.statusBarHeight }} />
        {/* <Image source={Image_Http_URL} style = {{height: 50, width:150, resizeMode : 'stretch', margin: 5 }} /> */}
        <Text style={styles.welcome}>Welcome to</Text>
        {/* <Text style={styles.fludder}>Fludder</Text> */}
        {/* <Image source={Image_Http_URL} style = {{height: 80, width:225, resizeMode: 'stretch', margin: 5, marginBottom: 30, marginLeft:30 }} /> */}
        <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: '11%', width: '84%', resizeMode: 'stretch', margin: "1%", marginBottom: "3%", marginLeft: "5%" }} />
        <Text style={styles.onboarding}>Step 2: Receive Feedback</Text>
        <Text style={styles.onboardingText}>
          Receive free feedback from HR pros to build confidence and strengthen your skills.
        </Text>
        {/* <View style={{ flexDirection:"row" }}> */}
        {/* <TouchableOpacity
            style={styles.SkipButtonStyle}
            activeOpacity = { .5 }
            onPress={ pressHandler1 }
          >
            <Text style={styles.TextStyle}> Skip </Text>
          </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.NextButtonStyle}
          activeOpacity={.5}
          onPress={pressHandler}
        >
          <Text style={styles.TextStyle}> Next </Text>
        </TouchableOpacity>
        {/* </View>  */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  fludder: {
    fontWeight: 'bold',
    fontSize: 64,
    color: '#37266b',
  },
  welcome: {
    fontWeight: 'bold',
    color: '#f7901f',
    marginTop: "40%",
    fontSize: 22
  },
  onboarding: {
    color: '#37266b',
    marginTop: "35%",
    fontSize: 22
  },
  onboardingText: {
    color: 'gray',
    padding: "1%",
    alignItems: "center",
    marginBottom: "15%",
    textAlign: 'center',
    fontSize: 17
  },
  SkipButtonStyle: {
    marginTop: 10,
    marginHorizontal: 70,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#37266b',
    borderRadius: 20,
  },
  NextButtonStyle: {
    marginTop: 10,
    marginHorizontal: 70,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f7901f',
    borderRadius: 20,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: "13%",
    fontSize: 17,
    fontWeight: 'bold'
  }
});