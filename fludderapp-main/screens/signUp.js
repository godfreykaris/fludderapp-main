import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView,
  TouchableWithoutFeedback, Keyboard, ScrollView, Linking, BackHandler, KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import RNPickerSelect from "react-native-picker-select";
// import CountryPicker from 'react-native-country-picker-modal'
// import { CountryCode, Country } from './types'
import { CountryPicker } from "react-native-country-codes-picker";
import Loading from '../components/Loading';
import Spinner from 'react-native-loading-spinner-overlay';
// import { CallingCodePicker } from "@digieggs/rn-country-code-picker";
import Constants from 'expo-constants';

export default function SignUp({ navigation }) {

  // const uType = navigation.getParam('userType');
  // const uType = 'user'

  const lastNameRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const zipCodeRef = useRef(null);
  const userContactNumberRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [countryCode, setCountryCode] = useState('US')
  // const [country, setCountry] = useState(null)
  // const [withCountryNameButton, setWithCountryNameButton] = useState(false)
  // const [withFlag, setWithFlag] = useState(true)
  // const [withEmoji, setWithEmoji] = useState(true)
  // const [withFilter, setWithFilter] = useState(true)
  // const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  // const [withCallingCode, setWithCallingCode] = useState(false)

  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');


  // const onSelect = (country: Country) => {
  //   setCountryCode(country.cca2)
  //   setCountry(country)
  // }

  const setSignUpState = async () => {
    // console.log('DCalled');
    await AsyncStorage.setItem("signUpState", "true");
  }

  useEffect(() => {
    setSignUpState();
    const backAction = async () => {
      navigation.navigate('SignUpOptions');
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    fetch(baseUrl + 'getCategoriesForSignUp')
      .then((response) => response.json())
      .then((json) => {
        setCategories(json);
      });
    return () => {
      backHandler.remove();
    };
  }, []);

  var catlist = categories.map((data) => {

    return { label: data.domain_name.replace(/\s{2,}/g, ' '), value: data.domain_id }

  });

  const [checked, setChecked] = React.useState('user');
  const [emailError, setEmailError] = React.useState('');

  const ReviewSchema = yup.object({
    firstName: yup.string().required('Please enter first name').min(2, 'First name should contain atleast 3 characters!').test(
      'isAlphabets', 'First name sholud have alphabates only!', (val) => {
        return /^[A-Za-z ]+$/.test(val);
      }),
    lastName: yup.string().required('Please enter last name').min(2, 'Last name should contain atleast 3 characters!').test(
      'isAlphabets', 'Last name sholud have alphabates only!', (val) => {
        return /^[A-Za-z ]+$/.test(val);
      }),
    emailId: yup.string().required('Please enter email id').min(3, 'Email id should contain atleast 3 characters!')
      .test(
        'isAlphabets', 'Please enter valid email id', (val) => {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(val);
        })
      .test('checkEmailId', async function (value) {
        if (value != undefined && checked == 'professional') {
          const emailValidate = await fetch(baseUrl + 'checkEmailId', {
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
          return result.response === false
            ? this.createError({
              message: `${result.message}`,
              path: 'emailId', // Fieldname
            })
            : true;
        }
        else if (value != undefined && checked == 'user') {
          const emailValidate = await fetch(baseUrl + 'checkUserEmailId', {
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
          return result.response === false
            ? this.createError({
              message: `${result.message}`,
              path: 'emailId', // Fieldname
            })
            : true;
        }
        else
          return false;
      }),
    password: yup.string().required('Please enter password')
      .max(50, 'Password should contain less than 50 characters!')
      .min(6, 'Password should contain atleast 6 characters!'),
    confirmPassword: yup.string().required('Please enter password again')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
    zipCode: yup.number()
      .typeError('Please enter valid zip code')
      .required('Please enter zip code')
      .min(100, 'Please enter valid zip code')
      .max(100000000, 'Please enter valid zip code'),
    user_contact_number: yup.string()
      // .typeError('Please enter valid phone number')
      .required('Please enter phone number'),
    // .min(100, 'Please enter valid zip code')
    // .max(100000000, 'Please enter valid zip code'),
    schoolCode: yup.string()
      .test('validateSchoolCode', 'Please enter valid school code', async function (value) {
        if (checked == 'user') {
          if (value != undefined) {
            const sCValidate = await fetch(baseUrl + 'validateSchoolCode', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                schoolCode: value,
                emailId: this.parent.emailId
              }),
            })
            let result = await sCValidate.json();
            return result.response;
          }
          else
            return true;
        }
        else
          return true;
      }),
    // domain_id: yup.string().required('Please select category'),
    domain_id: yup.string().test(
      'notBothAtTheSameTime', // test name
      'Please select category', // validation message to the user
      // it has to be function definition to use `this`
      function (domain_id) {
        if (checked != 'user' && domain_id == undefined) {
          return false; // when user enters both userEmail & userName do not validate form
        }
        return true;
      }
    )
  })

  let Image_Http_URL = require('../assets/fLogo.jpg');

  const signInPressHandler = () => {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }
        }>
          <View style={styles.container}>
            {
              loading ?
                <Spinner
                  //visibility of Overlay Loading Spinner
                  visible={loading}
                  //Text with the Spinner
                  textContent={'   Welcome to Fludder! \n Creating your account...'}
                  //Text style of the Spinner Text
                  textStyle={{ color: '#FFF' }}
                />
                :
                null
            }
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            {/* <Image source={Image_Http_URL} style = {{height: 70, width:210, resizeMode : 'stretch', margin: 10, marginTop: 20 }} /> */}

            <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: 65, width: '65%', resizeMode: 'stretch', margin: 10, marginVertical: 30 }} />
            <Formik
              initialValues={{
                firstName: '', lastName: '', emailId: '', password: '', confirmPassword: '', schoolCode: '', domain_id: '', zipCode: ''
              }}
              onSubmit={(values) => {
                let fname = values.firstName.trim() + ' ' + values.lastName.trim();
                // let otp = '';
                setLoading(true)
                try {
                  fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      user_name: fname,
                      user_email_id: values.emailId,
                      user_password: values.password,
                      zipCode: values.zipCode,
                      user_contact_number: countryCode + values.user_contact_number,
                      schoolCode: values.schoolCode,
                      domain_id: values.domain_id,
                      userType: 'user'
                    }),
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      setLoading(false)
                      if (json.response === false) {
                        alert("OTP not sent successfully");
                      }
                      else {
                        const otp = json.otp
                        console.log("OOOOOOOOOOOtp" + otp);
                        navigation.navigate('EmailVerification', { values, otp });
                      }
                    });
                }
                catch (error) {
                  setLoading(false)
                  console.log('error : ' + error);
                  return error;
                }
              }}
              validationSchema={ReviewSchema}
            >
              {(props) => (
                <View style={styles.container}>
                  {/* <View style={styles.checkboxContainer}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        width: '50%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setChecked('user')
                        }}
                        value={props.values.user}
                      >
                        <View
                          style={{
                            height: 25,
                            width: 25,
                            borderColor: '#f7901f',
                            borderWidth: 1,
                            backgroundColor: 'white',
                            borderRadius: 13,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              height: 13,
                              width: 13,
                              backgroundColor:
                                checked == 'user' ? '#f7901f' : 'white',
                              borderRadius: 7,
                            }}>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.label}>User</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setChecked('professional')
                        }}
                        value={props.values.professional}
                      >
                        <View
                          style={{
                            height: 25,
                            width: 25,
                            borderColor: '#f7901f',
                            borderWidth: 1,
                            backgroundColor: 'white',
                            borderRadius: 13,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              height: 13,
                              width: 13,
                              backgroundColor:
                                checked == 'professional' ? '#f7901f' : 'white',
                              borderRadius: 7,
                            }}>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.label}>Professional</Text>
                    </View>
                  </View> */}
                  <TextInput
                    placeholder="First Name"
                    style={styles.inputText}
                    onChangeText={props.handleChange('firstName')}
                    value={props.values.firstName}
                    onBlur={props.handleBlur('firstName')}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { lastNameRef.current.focus(); }}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorText}>{props.touched.firstName && props.errors.firstName}</Text>
                  <TextInput
                    placeholder="Last Name"
                    style={styles.inputText}
                    onChangeText={props.handleChange('lastName')}
                    value={props.values.lastName}
                    onBlur={props.handleBlur('lastName')}
                    ref={lastNameRef}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { emailId.focus(); }}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>
                  <TextInput
                    placeholder="Email"
                    style={styles.inputText}
                    onChangeText={props.handleChange('emailId')}
                    value={props.values.emailId}
                    onBlur={props.handleBlur('emailId')}
                    autoCapitalize='none'
                    keyboardType={'email-address'}
                    ref={(input) => { emailId = input; }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { password.focus(); }}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorText}>{props.touched.emailId && props.errors.emailId}</Text>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Password"
                    style={styles.inputText}
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                    onBlur={props.handleBlur('password')}
                    ref={(input) => { password = input; }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { confirmPasswordRef.current.focus(); }}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                  <TextInput
                    secureTextEntry={true}
                    placeholder="Renter Password"
                    style={styles.inputText}
                    onChangeText={props.handleChange('confirmPassword')}
                    value={props.values.confirmPassword}
                    onBlur={props.handleBlur('confirmPassword')}
                    ref={confirmPasswordRef}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { zipCodeRef.current.focus(); }}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
                  <TextInput
                    placeholder="Zip Code"
                    style={styles.inputText}
                    onChangeText={props.handleChange('zipCode')}
                    value={props.values.zipCode}
                    onBlur={props.handleBlur('zipCode')}
                    ref={zipCodeRef}
                    returnKeyType={"done"}
                    onSubmitEditing={() => { userContactNumberRef.current.focus(); }}
                    maxLength={10}
                    keyboardType="numeric"
                    blurOnSubmit={false}
                  />
                  <Text style={styles.errorText}>{props.touched.zipCode && props.errors.zipCode}</Text>
                  {/* <TextInput
                    placeholder="Enter Phone Number"
                    style={styles.inputText}
                    onChangeText={props.handleChange('user_contact_number')}
                    value={props.values.user_contact_number}
                    onBlur={props.handleBlur('user_contact_number')}
                    // ref={(input) => { user_contact_number = input; }}
                    returnKeyType={"done"}
                    maxLength={15}
                    keyboardType="numeric"
                  /> */}
                  {/* <CountryPicker
                    {...{
                      countryCode,
                      withFilter,
                      withFlag,
                      withCountryNameButton,
                      withAlphaFilter,
                      withCallingCode,
                      withEmoji,
                      onSelect,
                    }}
                    // visible
                  /> */}
                  <View style={{ flexDirection: 'row', width: 350 }}>
                    <TouchableOpacity
                      onPress={() => setShow(true)}
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#f7901f',
                        paddingTop: 17,
                        // margin: 3,
                        width: 50,
                        height: 53,
                        textAlign: 'center'
                      }}
                    >
                      <Text style={{
                        color: 'black',
                        // fontSize: 20
                        textAlign: 'center'
                      }}>
                        {countryCode}
                      </Text>
                    </TouchableOpacity>
                    <CountryPicker
                      show={show}
                      enableModalAvoiding={true}
                      // when picker button press you will get the country object with dial code
                      pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                      }}
                      style={{
                        // Styles for whole modal [View]
                        modal: {
                          height: 400
                        },
                      }}
                    />
                    {/* <SafeAreaView>
                      <CallingCodePicker onValueChange={() => {}} />
                    </SafeAreaView> */}
                    <TextInput
                      placeholder="Phone Number"
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#f7901f',
                        padding: 5,
                        // margin: 3,
                        width: 300,
                        height: 53
                      }}
                      onChangeText={props.handleChange('user_contact_number')}
                      value={props.values.user_contact_number}
                      onBlur={props.handleBlur('user_contact_number')}
                      ref={userContactNumberRef}
                      returnKeyType={"done"}
                      maxLength={15}
                      keyboardType="numeric"
                    />
                  </View>
                  <Text style={styles.errorText}>{props.touched.user_contact_number && props.errors.user_contact_number}</Text>
                  {/* {
                    checked === 'user' ?
                      <View>
                        <TextInput
                          placeholder="Enter School/Organization Code (if applicable)"
                          style={styles.inputText}
                          onChangeText={props.handleChange('schoolCode')}
                          value={props.values.schoolCode}
                          onBlur={props.handleBlur('schoolCode')}
                        // ref={(input) => { schoolCode = input; }}
                        // returnKeyType = {"next"}
                        />
                        <Text style={styles.errorText}>{props.touched.schoolCode && props.errors.schoolCode}</Text>
                      </View>
                      : null
                  } */}

                  {
                    checked !== 'user' ?
                      <View>
                        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#f7901f', overflow: 'hidden', paddingHorizontal: 27 }}>
                          {/* <RNPickerSelect
                          style={style}
                          placeholder={{
                              label: 'Select a category',
                              value: null
                          }}
                          onValueChange={(value) => console.log(value)}
                          // onChangeText={props.handleChange('domain_id')}
                          // onBlur={props.handleBlur('domain_id')}
                          // value={props.values.domain_id} 
                          items={catlist}
                        /> */}
                          <RNPickerSelect
                            style={style}
                            placeholder={{
                              label: 'Select a category',
                              value: ''
                            }}
                            // onValueChange={(value) => console.log(value)}
                            onValueChange={(itemValue) => {
                              props.setFieldValue('domain_id', itemValue)
                              // console.log(itemValue)
                            }
                            }
                            onChangeText={props.handleChange('domain_id')}
                            onBlur={props.handleBlur('domain_id')}
                            // value={props.values.domain_id} 
                            items={catlist}
                          />
                        </View>
                        <Text style={styles.errorText}>{props.touched.domain_id && props.errors.domain_id}</Text>
                      </View>
                      : null
                  }

                  <Text style={styles.onboardingText}>
                    By proceeding you also agree to the terms of services and <Text style={{ color: 'blue' }}
                      onPress={() => Linking.openURL('https://acedmyinterview.com/privacy-policy/')}>privacy policy.</Text>
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.SignUpButtonStyle}
                      activeOpacity={.5}
                      onPress={props.handleSubmit}
                    >
                      <Text style={styles.TextStyle}> Sign Up </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.signInQuestionText}>
                Already have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={.5}
                onPress={signInPressHandler}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = {
  placeholder: {
    color: '#A9A9A9'
  },
  inputAndroid: {
    // paddingHorizontal: 40,
    // paddingTop: 10,
    // paddingBottom: 10,
    paddingLeft: 150,
    paddingRight: 150,
    // paddingVertical: 40,
    // paddingHorizontal: 20,
    color: '#A9A9A9'
  },
  inputIOS: {
    //  padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    //  paddingLeft: 60,
    //  paddingRight: 60,
    //  paddingVertical: 50,
    paddingHorizontal: 90,
    color: 'black',
    textAlign: 'left'
  },

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f7901f',
    padding: 5,
    // margin: 3,
    width: 350,
    height: 53
  },
  onboardingText: {
    color: 'gray',
    padding: 10,
    alignItems: "center",
    textAlign: 'center'
  },
  SignUpButtonStyle: {
    marginTop: 5,
    marginHorizontal: 100,
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
    paddingHorizontal: 50
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    padding: 5,
    marginRight: 20
  },
  signInText: {
    color: "#f7901f"
  },
  signInText: {
    color: '#f7901f',
    padding: 5,
    alignItems: "center"
  },
  signInQuestionText: {
    color: 'gray',
    padding: 5,
    alignItems: "center"
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
});