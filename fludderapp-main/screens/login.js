import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, 
          TouchableWithoutFeedback, Keyboard, ScrollView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Login ({ navigation }) {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [userType, setUserType] = useState();
  const [userInformationId, setUserInformationId] = useState();

  const setSignUpState = async() => {
    // console.log('DCalled');
    await AsyncStorage.setItem("signUpState", "true");
  }

  useEffect(() => {
    setSignUpState();
    const backAction = () => {
      BackHandler.exitApp() 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    registerForPushNotificationsAsync().then(token => {console.log("token : ",token);setExpoPushToken(token)});
      
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // console.log(response);
      });
  
      return () => {
        backHandler.remove();
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };

    }, []);

    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        // console.log("Constants.isDevice"+Constants.isDevice);
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        // console.log("finalStatus"+finalStatus);
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })).data;
        // console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
      
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      return token;
    }

    const ReviewSchema = yup.object({
      emailId: yup.string().required('Please enter email id').min(3)
      .test('checkEmailId', async function(value) {
        if(value!=undefined) {
            const emailValidate = await fetch(baseUrl+'checkLoginEmailId', {
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
              // return result.response === false
              // ? this.createError({
              //     message: `${result.message}`,
              //     path: 'emailId', // Fieldname
              //   })
              // : true;
              if(result.response === false) {
                return this.createError({
                    message: `${result.message}`,
                    path: 'emailId', // Fieldname
                  })
              }
              else{
                await AsyncStorage.setItem('userType',result.userType.toString());
                setUserType(result.userType.toString());
                return true;
              }
            }
            else
              return false;
      }), 
      password: yup.string().required('Please enter password.').min(3)
      .test('checkPassword', 'Please enter correct password.', async function(value) {
        let newUserType = await AsyncStorage.getItem('userType');
        
        if(value!=undefined && newUserType=="U") {
            const checkPassword = await fetch(baseUrl+'checkPassword', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_password: value,
                  user_email_id: this.parent.emailId
                }),
              })
              let result = await checkPassword.json();
              // return result.response === false
              // ? this.createError({
              //     message: `${result.message}`,
              //     path: 'password', // Fieldname
              //   })
              // : true;
              if(result.response === false) {
                return this.createError({
                      message: `${result.message}`,
                      path: 'password', // Fieldname
                    })
              }
              else {
                await AsyncStorage.setItem('userType',result.userType.toString());
                await AsyncStorage.setItem('loginId',result.loginId.toString());
                await AsyncStorage.setItem('userInformationId',result.user_information_id.toString());
                console.log(result.user_information_id.toString());
                await AsyncStorage.setItem('user_name',result.user_name.toString());
                await AsyncStorage.setItem('email_id',result.email_id.toString());
                await AsyncStorage.setItem('password',result.password.toString());
                return true;
              }
            }
            else if(value!=undefined && newUserType=="P") {
              const checkPassword = await fetch(baseUrl+'professionalCheckPassword', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    user_password: value,
                    user_email_id: this.parent.emailId
                  }),
                })
                let result = await checkPassword.json();
                // return result.response === false
                // ? this.createError({
                //     message: `${result.message}`,
                //     path: 'password', // Fieldname
                //   })
                // : true;
                if(result.response === false) {
                  this.createError({
                    message: `${result.message}`,
                    path: 'password', // Fieldname
                  })
                }
                else{
                  console.log("Result :"+result.professionalHRFlag);
                  await AsyncStorage.setItem('userType',result.userType.toString());
                  await AsyncStorage.setItem('loginId',result.loginId.toString());
                  await AsyncStorage.setItem('professionalId',result.professional_id.toString());
                  await AsyncStorage.setItem('professionalHRFlag',result.professionalHRFlag.toString());
                  return true;
                }
              }
            else {
              return false;
            }
      }), 
    })

    const signUpPressHandler = () => {
      navigation.navigate('SignUp');
    }

    const forgotPasswordHandler = () => {
      navigation.navigate('ForgotPasswordVerificationCode');
    }

    // let Image_Http_URL ={ uri: 'https://fludder.io/admin/assets/images/Fludder-Dashboard-logo.jpg'};
  let Image_Http_URL = require('../assets/fLogo.jpg');

  return (
    <ScrollView style={{backgroundColor: '#fff'}} keyboardShouldPersistTaps='always'>
      <TouchableWithoutFeedback onPress ={ () => {
          Keyboard.dismiss();
        }
      }>
        <Formik 
          initialValues={{
            emailId: '', password: ''
          }}
          onSubmit={ async (values) => {
            
            await AsyncStorage.setItem("loginState", "true");
            let val = await AsyncStorage.getItem("loginState");

            await AsyncStorage.setItem('isLoggedIn','1');
            // console.log("Login "+await AsyncStorage.getItem('isLoggedIn'))

            let loginId = await AsyncStorage.getItem('loginId')
            loginId = loginId.toString().replace(/"/g, "");
      
            console.log("Login ID: "+loginId+"      LoginToken: "+expoPushToken);

            fetch(baseUrl+'updateDeviceToken', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                deviceToken: expoPushToken,
                loginId: loginId
              })
            })
            .then((response) => response.json())
            .then((json) => {
                // alert(JSON.stringify(json));
            });
            console.log(AsyncStorage.getItem('userInformationId'));
            if(userType==='P')
              navigation.navigate('Categories', {values});
            else
              navigation.push('NewHomeScreen');
          }}
          validationSchema={ReviewSchema}
        >
          {(props) => (
            <View style={{flex:1}}>
              <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                <View style={{ backgroundColor: '#ffffff', height: 34}} />
                {/* <Image source={Image_Http_URL} style = {{height: 70, width:210, resizeMode : 'stretch', margin: 10, marginBottom: 30, marginTop: 10 }} /> */}
                <Image source={require('../assets/Fludder-Logo-Transparant.png')} style = {{height: 70, width:'70%', resizeMode : 'stretch', margin: 10, marginBottom: 30, marginTop: 40 }} />
                <Text style={styles.welcome}>Login</Text>
                <TextInput
                  autoCapitalize= 'none'
                  placeholder="Email"
                  style={styles.inputText}
                  onChangeText={props.handleChange('emailId')}
                  value={props.values.emailId} 
                  onBlur={props.handleBlur('emailId')}
                  keyboardType={'email-address'}
                  returnKeyType = {"next"}
                  onSubmitEditing={() => { password.focus(); }}
                  ref={(input) => { emailId = input; }}
                />
                <Text style={styles.errorText}>{props.touched.emailId && props.errors.emailId}</Text>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  style={styles.inputText}
                  onChangeText={props.handleChange('password')}
                  value={props.values.password} 
                  onBlur={props.handleBlur('password')}
                  returnKeyType = {"done"}
                  ref={(input) => { password = input; }}
                />
                <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                <View>
                  <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity = { .5 }
                    onPress={ props.handleSubmit }
                  >
                      <Text style={styles.TextStyle}> Sign In </Text>
                  </TouchableOpacity> 
                </View> 
                <TouchableOpacity
                    activeOpacity = { .5 }
                    onPress={ forgotPasswordHandler }
                  >
                  <Text style={styles.onboardingText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection:"row",}}>
                  <TouchableOpacity
                    activeOpacity = { .5 }
                    onPress={ signUpPressHandler }
                  >
                    <Text style={styles.signInText}>or create an account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
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
      color:'gray',
      marginTop: 20,
      marginBottom: 10,
      alignItems: "center"
    },
    welcome: {
      fontWeight: 'bold',
      color: '#37266b', // Blue
      marginBottom: 60,
      fontSize:30
    },
    SignUpButtonStyle: {
      marginTop:20,
      marginHorizontal: 100,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#f7901f',
      borderRadius:20,
      borderWidth: 1,
      borderColor: '#fff'
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
        paddingHorizontal:50
    },
    errorText: {
      color: 'red',
    },
    signInText: {
      color:'#f7901f',
      // padding:5,
      alignItems: "center",
      fontSize: 20,
    },
  });