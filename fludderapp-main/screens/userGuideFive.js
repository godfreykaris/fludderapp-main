import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function UserGuideFive({ navigation }) {
  // let Image_Http_URL ={ uri: 'https://fludder.io/admin/assets/images/Fludder-Dashboard-logo.jpg'};
  let Image_Http_URL = require('../assets/fLogo.jpg');

  const pressHandler = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={{ flex: 1, }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
      {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
      <View style={{ marginTop: Constants.statusBarHeight }} />
      <View style={styles.container}>
        {/* <Image source={Image_Http_URL} style = {{height: 50, width:150, resizeMode : 'stretch', margin: 5 }} /> */}
        <Text style={styles.welcome}>Welcome to</Text>
        {/* <Text style={styles.fludder}>Fludder</Text> */}
        {/* <Image source={Image_Http_URL} style = {{height: 80, width:225, resizeMode: 'stretch', margin: 5, marginBottom: 30, marginLeft:30 }} /> */}
        <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: '10%', width: '70', resizeMode: 'stretch', margin: 5, marginBottom: 30, marginLeft: 30 }} />
        <Text style={styles.onboarding}>Onboarding 5</Text>
        <Text style={styles.onboardingText}>
          As a student/user of the app create your profile or connect with the profile, the school created for you.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.SkipButtonStyle}
            activeOpacity={.5}
            onPress={pressHandler}
          >
            <Text style={styles.TextStyle}> Skip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.NextButtonStyle}
            activeOpacity={.5}
            onPress={pressHandler}
          >
            <Text style={styles.TextStyle}> Sign Up </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 200,
    fontSize: 20
  },
  onboarding: {
    color: '#37266b',
    marginTop: 90,
    fontSize: 20
  },
  onboardingText: {
    color: 'gray',
    padding: 20,
    alignItems: "center",
    marginBottom: 50,
    fontSize: 15
  },
  SkipButtonStyle: {
    marginTop: 10,
    marginHorizontal: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#37266b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  NextButtonStyle: {
    marginTop: 10,
    marginHorizontal: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f7901f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 30,
    fontSize: 15
  }
});