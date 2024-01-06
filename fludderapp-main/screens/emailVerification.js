import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Constants from 'expo-constants';

export default function EmailVerification({ navigation }) {

  const otp = navigation.getParam('otp');
  const [modalVisible, setModalVisible] = useState(false);
  const values = navigation.getParam('values');

  const handleBack = () => {
    navigation.navigate('SignUp');
  }

  const resendCode = () => {
    try {
      fetch(baseUrl + 'resendCode', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp: otp,
          user_email_id: values.emailId,
          user_contact_number: values.user_contact_number
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.response == false) {
            alert("OTP not sent successfully");
          }
          else
            setModalVisible(!modalVisible);
        });
    }
    catch (error) {
      console.log('error : ' + error);
      return error;
    }
  }

  const ReviewSchema = yup.object({
    verificationCode: yup.string().required('Please enter verification code!')
      .min(4, 'Please enter 4 digit verification code!')
      .max(4, 'Please enter 4 digit verification code!')
      .test('checkVerificationCode', 'Please enter correct verification code!', async function (value) {
        if (value != undefined) {
          const verificationCodeValidate = await fetch(baseUrl + 'checkVerificationCode', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              verificationCode: value
            }),
          })
          let result = await verificationCodeValidate.json();
          // alert(result.response);
          return result.response;
        }
        else
          return false;
      }),
  })

  // const [fullName, setFullName] = '';

  // let Image_Emial_URL = { uri: 'https://fludder.io/admin/assets/images/Fludder-SignUp-Email-Send-01.png' };
  // let Image_Http_URL ={ uri: 'https://emjex.com/fludderadmin/assets/images/Fludder-Email-Confermation-01.png'};

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
      <View style={{ marginTop: Constants.statusBarHeight }} />
      {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
      <View style={styles.container}>
        <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: 70, width: 260, resizeMode: 'stretch', margin: 20 }} />
        {/* <Text style={styles.welcome}>Email Confirmation</Text> */}
        <Image source={require('../assets/SMSVerification.png')} style={{ height: 150, width: 150, resizeMode: 'stretch', marginLeft: 30 }} />
        <Text style={styles.onboardingText}>
          A code has been sent to your mobile & email. Thank you!
          {"\n"}Please enter code provided to activate your account.
        </Text>
        <Formik
          initialValues={{
            verificationCode: '',
          }}
          onSubmit={(values) => {
            fetch(baseUrl + 'verifyUser', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                // emailId: paraValues.emailId,
                verificationCode: values.verificationCode,
              }),
            })
              .then((response) => response.json())
              .then(() => {
                // alert(json.user_name);
              });
            navigation.navigate('Login');
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
                keyboardType="numeric"
              />
              <Text style={styles.errorText}>{props.touched.verificationCode && props.errors.verificationCode}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.SignUpButtonStyle}
                  activeOpacity={.5}
                  onPress={handleBack}
                >
                  <Text style={styles.TextStyle}> Back </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.SignUpButtonStyle}
                  activeOpacity={.5}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.TextStyle}> Okay </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.SignUpButtonBlueStyle}
                  activeOpacity={.5}
                  onPress={resendCode}
                >
                  <Text style={styles.TextStyle}> Resend </Text>
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
                <Text style={styles.modalText}>OTP Sent successfully!</Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    // navigation.navigate('ProfessionalProfile', {userType, userId});
                    // navigation.push('ProfessionalProfile', {userType, userId})
                  }}>
                  <Text style={styles.textStyle}>Okay</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
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
    marginHorizontal: 50,
    marginTop: 5,
  },
  SignUpButtonStyle: {
    marginTop: 30,
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f7901f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  SignUpButtonBlueStyle: {
    marginTop: 30,
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#37266b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',
    padding: 5,
    margin: 10,
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
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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