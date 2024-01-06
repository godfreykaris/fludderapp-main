import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Keyboard,
  TouchableWithoutFeedback, Modal, TouchableHighlight
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Constants from 'expo-constants';

export default function ForgotPasswordEmailVerification({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const vCode = navigation.getParam('verificationCode');
  const emailId = navigation.getParam('emailId');
  const ReviewSchema = yup.object({
    verificationCode: yup.string().required('Please enter verification code!')
      .min(4, 'Please enter 4 digit verification code!')
      .max(4, 'Please enter 4 digit verification code!')
      .test('verificationCodeMatch', 'Please enter correct verification code!', function (value) {
        return vCode == value;
      }),
    password: yup.string().required('Please enter password')
      .max(50, 'Password should contain less than 50 characters!')
      .min(3, 'Password should contain atleast 3 characters!'),
    confirmPassword: yup.string().required('Please enter password again')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  })

  let Image_Emial_URL = { uri: 'https://emjex.com/fludderadmin/assets/images/Fludder-SignUp-Email-Send-01.png' };
  // let Image_Http_URL ={ uri: 'https://emjex.com/fludderadmin/assets/images/Fludder-Email-Confermation-01.png'};

  const pressHandler = () => {
    navigation.navigate('Login')
  }
  return (
    <ScrollView style={{ backgroundColor: '#fff' }} keyboardShouldPersistTaps='always'>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }
      }>
        <View>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
          {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
          <View style={{ marginTop: Constants.statusBarHeight }} />
          <View style={styles.container}>
            <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: 70, width: 260, resizeMode: 'stretch', margin: 20 }} />
            <Text style={styles.welcome}>Forgot Password Verification</Text>
            <Image source={Image_Emial_URL} style={{ height: 120, width: 150, resizeMode: 'stretch', margin: 10, marginBottom: 20 }} />
            <Text style={styles.onboardingText}>
              We have sent a code to your email. Please enter code provided to reset your account password. {/*paraValues.emailId*/}
            </Text>
            <Formik
              initialValues={{
                verificationCode: '', password: '', confirmPassword: ''
              }}
              onSubmit={(values) => {
                fetch(baseUrl + 'updatePassword', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    emailId: emailId,
                    password: values.password
                  })
                })
                  .then((response) => response.json())
                  .then((json) => {
                    setModalVisible(!modalVisible);
                  });
              }}
              validationSchema={ReviewSchema}
            >
              {(props) => (
                <View>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Verification Code"
                    style={styles.inputText}
                    onChangeText={props.handleChange('verificationCode')}
                    value={props.values.verificationCode}
                    onBlur={props.handleBlur('verificationCode')}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { password.focus(); }}
                    ref={(input) => { verificationCode = input; }}
                    maxLength={4}
                  />
                  <Text style={styles.errorText}>{props.touched.verificationCode && props.errors.verificationCode}</Text>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="New Password"
                    style={styles.inputText}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                    onBlur={props.handleBlur('password')}
                    ref={(input) => { password = input; }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { confirmPassword.focus(); }}
                    maxLength={50}
                  />
                  <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    style={styles.inputText}
                    onChangeText={props.handleChange('confirmPassword')}
                    value={props.values.confirmPassword}
                    onBlur={props.handleBlur('confirmPassword')}
                    ref={(input) => { confirmPassword = input; }}
                    returnKeyType={"done"}
                    maxLength={50}
                  />
                  <Text style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.SignUpButtonStyle}
                      activeOpacity={.5}
                      onPress={props.handleSubmit}
                    >
                      <Text style={styles.TextStyle}> Okay </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Password updated successfully!</Text>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        navigation.navigate('Login');
                      }}>
                      <Text style={styles.textStyle}>Okay</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  buttonStyle: {
    marginHorizontal: 100,
    marginTop: 5,
  },
  SignUpButtonStyle: {
    marginTop: 20,
    marginHorizontal: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f7901f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',
    padding: 5,
    marginLeft: 20,
    width: 300,
    height: 40
  },
  onboardingText: {
    color: 'gray',
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  welcome: {
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 50
  },
  errorText: {
    color: 'red',
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  },
  modalText: {
    marginBottom: 35,
    textAlign: 'center',
    fontSize: 16
  },
});