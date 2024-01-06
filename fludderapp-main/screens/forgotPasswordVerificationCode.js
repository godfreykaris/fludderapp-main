import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, TextInput,
  TouchableWithoutFeedback, Keyboard, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import Constants from 'expo-constants';

export default function ForgotPasswordVerificationCode({ navigation }) {

  const ReviewSchema = yup.object({
    emailId: yup.string().required('Please enter email id').min(3)
      .test('checkEmailId', async function (value) {
        if (value != undefined) {
          const emailValidate = await fetch(baseUrl + 'checkLoginEmailId', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_email_id: value
            }),
          })
          let result = await emailValidate.json();
          if (result.response === false) {
            return this.createError({
              message: `${result.message}`,
              path: 'emailId', // Fieldname
            })
          }
          else {
            await AsyncStorage.setItem('userType', result.userType.toString());
            return true;
          }
        }
        else
          return false;
      }),
  })

  const cancelPressHandler = () => {
    navigation.navigate('Login');
  }

  return (
    <ScrollView style={{ backgroundColor: '#fff' }} keyboardShouldPersistTaps='always'>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }
      }>
        <Formik
          initialValues={{
            emailId: ''
          }}
          onSubmit={async (values) => {

            fetch(baseUrl + 'sendForgotPasswordVerificationCode', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                emailId: values.emailId
              })
            })
              .then((response) => response.json())
              .then((json) => {
                let verificationCode = json.verificationCode;
                let emailId = values.emailId;
                navigation.navigate('ForgotPasswordEmailVerification', { verificationCode, emailId });
                // console.log(json.verificationCode);
              });
          }}
          validationSchema={ReviewSchema}
        >

          {(props) => (
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                <View style={{ marginTop: Constants.statusBarHeight }} />
                {/* <Image source={Image_Http_URL} style = {{height: 70, width:210, resizeMode : 'stretch', margin: 10, marginBottom: 30, marginTop: 10 }} /> */}
                <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: 70, width: '70%', resizeMode: 'stretch', margin: 10, marginBottom: 30, marginTop: 40 }} />
                <Text style={styles.welcome}>Forgot Password</Text>
                <TextInput
                  autoCapitalize='none'
                  placeholder="Email"
                  style={styles.inputText}
                  onChangeText={props.handleChange('emailId')}
                  value={props.values.emailId}
                  onBlur={props.handleBlur('emailId')}
                  keyboardType={'email-address'}
                />
                <Text style={styles.errorText}>{props.touched.emailId && props.errors.emailId}</Text>
                <View>
                  <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={props.handleSubmit}
                  >
                    <Text style={styles.TextStyle}> Send Verification Code </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={cancelPressHandler}
                  >
                    <Text style={styles.CancelTextStyle}> Cancel </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  buttonStyle: {
    marginHorizontal: 100,
    marginTop: 50,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f7901f', // Orange
    padding: 5,
    margin: 10,
    width: 300,
    height: 40
  },
  onboardingText: {
    color: 'gray',
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  welcome: {
    fontWeight: 'bold',
    color: '#37266b', // Blue
    marginBottom: 60,
    fontSize: 30
  },
  SignUpButtonStyle: {
    marginTop: 20,
    marginHorizontal: 70,
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
    paddingHorizontal: 20
  },
  CancelTextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 70
  },
  errorText: {
    color: 'red',
  },
  signInText: {
    color: "#f7901f"
  },
  signInText: {
    color: '#f7901f',
    // padding:5,
    alignItems: "center"
  },
});