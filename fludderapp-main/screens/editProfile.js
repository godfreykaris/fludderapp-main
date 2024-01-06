import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Modal, TouchableHighlight, KeyboardAvoidingView
} from 'react-native';
// import { RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import Footer from '../components/footer';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';

export default function EditProfile({ navigation }) {

  const lastNameRef = useRef(null);
  const aboutMeRef = useRef(null);
  const contactNumberRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const zipCodeRef = useRef(null);
  const degreeOrSpecialityRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const profile = navigation.getParam('profile');
  const userType = navigation.getParam('userType');
  const userId = navigation.getParam('userId');

  let ddd;
  const getUserFirstName = () => {
    userType === 'P' ?
      ddd = profile.professional_name.split(" ")[0]
      :
      ddd = profile.user_name.split(" ")[0]
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getUserLastName = () => {
    userType === 'P' ?
      ddd = profile.professional_name.split(" ")[1]
      :
      ddd = profile.user_name.split(" ")[1]
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  // const getRole = () => {
  //   ddd = profile.professional_current_role
  //   if(ddd==null)
  //     return "";
  //   else
  //     return ddd;
  // }

  const getAboutMe = () => {
    userType === 'P' ?
      ddd = profile.professional_description
      :
      ddd = profile.user_description
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getContactNumber = () => {
    userType === 'P' ?
      ddd = profile.professional_contact_number
      :
      ddd = profile.user_contact_number
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getDegreeOrSpeciality = () => {
    userType === 'P' ?
      ddd = profile.professional_specialties
      :
      ddd = profile.user_degree
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getState = () => {
    // userType==='P' && profile.professional_city ?
    //   ddd = profile.professional_city.split(" ")[0]
    // :
    //   ddd = profile.user_city.split(" ")[0]
    // if(ddd==null)
    //   return "";
    // else
    //   return ddd;
    if (userType === 'P' && profile.professional_city)
      ddd = profile.professional_city.split(", ")[0]
    else if (profile.user_city)
      ddd = profile.user_city.split(", ")[0]
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getCity = () => {
    // userType==='P' && profile.professional_city ?
    //   ddd = profile.professional_city.split(" ")[1]
    // :
    //   ddd = profile.user_city.split(" ")[1]
    // if(ddd==null)
    //   return "";
    // else
    //   return ddd;
    if (userType === 'P' && profile.professional_city)
      ddd = profile.professional_city.split(", ")[1]
    else if (profile.user_city)
      ddd = profile.user_city.split(", ")[1]
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getZipCode = () => {
    userType === 'P' ?
      ddd = profile.professionalZipCode
      :
      ddd = profile.userZipCode
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  const getExperience = () => {
    ddd = profile.professional_experience
    if (ddd == null)
      return "";
    else
      return ddd;
  }

  // const getCompany = () => {
  //   ddd = profile.company
  //   if(ddd==null)
  //     return "";
  //   else
  //     return ddd;
  // }
  const ReviewSchema = yup.object({
    firstName: yup.string().required('Please enter first name').min(2, 'First name should contain atleast 3 characters!').test(
      'isAlphabets', 'First name sholud have alphabates only!', (val) => {
        return /^[A-Za-z ]+$/.test(val);
      }),
    lastName: yup.string().required('Please enter last name').min(2, 'Last name should contain atleast 3 characters!').test(
      'isAlphabets', 'Last name sholud have alphabates only!', (val) => {
        return /^[A-Za-z ]+$/.test(val);
      }),

    // fullName: yup.string()
    //   .required('Please enter full name')
    //   .min(2, 'Full name should contain atleast 3 characters!')
    //   .test('isAlphabets', 'Full name sholud have alphabates only!', (val) => {
    //     return /^[A-Za-z ]+$/.test(val);
    // }),
    // role: yup.string()
    //   .required('Please enter your current role'),
    // aboutMe: yup.string()
    //   .required('Please enter about yourself'),
    contactNumber: yup.string()
      .required('Please enter your contact number'),
    // degreeOrSpeciality: yup.string()
    //   .required('Please enter your degree & speciality'),
    // state: yup.string()
    //   .required('Please enter your state'),
    // city: yup.string()
    //   .required('Please enter your city'),
    zipCode: yup.string()
      .required('Please enter your zip code'),
    // experience: yup.string()
    //   .required('Please enter your experience'),
    //   experience: yup.string().test(
    //   'notBothAtTheSameTime', // test name
    //   'Please enter your experience', // validation message to the user
    //   // it has to be function definition to use `this`
    //   function(userType) {
    //     if (userType==='P') {
    //       return false; // when user enters both userEmail & userName do not validate form
    //     }
    //     return true;
    //   }
    // )
    // company: yup.string()
    //   .required('Please enter your company name'),
  })

  const pressHandler = () => {
    if (userType === 'P')
      navigation.push('ProfessionalProfile', { userType, userId });
    else
      navigation.push('UserProfile', { userType, userId });
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
      {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
      <View style={{ marginTop: Constants.statusBarHeight }} />
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
              {/* <Image source={Image_Http_URL} style = {{height: 50, width:150, resizeMode : 'stretch', margin: 10 }} /> */}
              <View style={styles.categoryBox}>
                <Text style={styles.category}>
                  <FontAwesome5 name="user-edit" size={18} color="white" />
                  &nbsp;Edit Profile
                </Text>
              </View>
              <Formik
                initialValues={{
                  firstName: getUserFirstName(), lastName: getUserLastName(), aboutMe: getAboutMe(),
                  contactNumber: getContactNumber(), degreeOrSpeciality: getDegreeOrSpeciality(),
                  state: getState(), city: getCity(), zipCode: getZipCode(), experience: getExperience(),
                  // company: getCompany(), role: getRole()
                }}
                onSubmit={(values) => {
                  let userCityAndState = '';
                  if (values.city != '' && values.state != '')
                    userCityAndState = values.city + ', ' + values.state;
                  else if (values.city != '' && values.state == '')
                    userCityAndState = values.city
                  else if (values.city == '' && values.state != '')
                    userCityAndState = values.state
                  else
                    userCityAndState = null;
                  setLoading(true)
                  fetch(baseUrl + 'updateProfile', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userType: userType,
                      userId: userId,
                      user_name: values.firstName.trim() + ' ' + values.lastName.trim(),
                      role: "",
                      aboutMe: values.aboutMe,
                      contactNumber: values.contactNumber,
                      degreeOrSpeciality: values.degreeOrSpeciality,
                      cityAndState: userCityAndState,
                      zipCode: values.zipCode,
                      experience: values.experience,
                      company: "",
                    }),
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      setLoading(false)
                      if (json.response == false) {
                        alert("Profile not updated successfully.");
                        // navigation.navigate('ProfessionalProfile', {userType, userId});
                      }
                      else {
                        // alert("Profile updated successfully.")
                        setModalVisible(!modalVisible);
                        // navigation.navigate('ProfessionalProfile', {userType, userId});
                      }
                    });
                }}
                validationSchema={ReviewSchema}
              >
                {(props) => (
                  <View style={styles.container}>
                    {
                      loading ?
                        <Spinner
                          //visibility of Overlay Loading Spinner
                          visible={loading}
                          //Text with the Spinner
                          textContent={'Updating profile information...'}
                          //Text style of the Spinner Text
                          textStyle={{ color: '#FFF' }}
                        />
                        :
                        null
                    }
                    <TextInput
                      placeholder="First Name"
                      style={styles.inputText}
                      onChangeText={props.handleChange('firstName')}
                      value={props.values.firstName}
                      onBlur={props.handleBlur('firstName')}
                      returnKeyType={"next"}
                      onSubmitEditing={() => { lastNameRef.current.focus(); }}
                      // ref={(input) => { firstNameRef = input; }} 
                      blurOnSubmit={false}
                    />
                    <Text style={styles.errorText}>{props.touched.firstName && props.errors.firstName}</Text>
                    <TextInput
                      placeholder="Last Name"
                      style={styles.inputText}
                      onChangeText={props.handleChange('lastName')}
                      value={props.values.lastName}
                      onBlur={props.handleBlur('lastName')}
                      returnKeyType={"next"}
                      onSubmitEditing={() => { aboutMeRef.current.focus(); }}
                      ref={lastNameRef}
                      blurOnSubmit={false}
                    />
                    <Text style={styles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>
                    {/* {
                      userType === 'P' ?
                        <View>
                          <TextInput
                            placeholder="Enter Current Role"
                            style={styles.inputText}
                            onChangeText={props.handleChange('role')}
                            value={props.values.role} 
                            onBlur={props.handleBlur('role')}
                          />
                        </View>
                        :
                          null
                    }
                    <Text style={styles.errorText}>{props.touched.role && props.errors.role}</Text> */}
                    <TextInput
                      placeholder="Tell us about yourself and how you stand out from other candidates"
                      style={styles.inputText1}
                      onChangeText={props.handleChange('aboutMe')}
                      value={props.values.aboutMe}
                      onBlur={props.handleBlur('aboutMe')}
                      multiline={true}
                      returnKeyType={"next"}
                      onSubmitEditing={() => { contactNumberRef.current.focus(); }}
                      ref={aboutMeRef}
                      blurOnSubmit={false}
                    />
                    <Text style={styles.errorText}>{props.touched.aboutMe && props.errors.aboutMe}</Text>
                    <TextInput
                      placeholder="Mobile Number"
                      style={styles.inputText}
                      onChangeText={props.handleChange('contactNumber')}
                      value={props.values.contactNumber}
                      onBlur={props.handleBlur('contactnumber')}
                      returnKeyType={"next"}
                      onSubmitEditing={() => { stateRef.current.focus(); }}
                      ref={contactNumberRef}
                      blurOnSubmit={false}
                    />
                    <Text style={styles.errorText}>{props.touched.contactNumber && props.errors.contactNumber}</Text>
                    <TextInput
                      placeholder="State"
                      style={styles.inputText}
                      onChangeText={props.handleChange('state')}
                      value={props.values.state}
                      onBlur={props.handleBlur('state')}
                      returnKeyType={"next"}
                      onSubmitEditing={() => { cityRef.current.focus(); }}
                      ref={stateRef}
                      blurOnSubmit={false}
                    />
                    <Text style={styles.errorText}>{props.touched.state && props.errors.state}</Text>
                    <TextInput
                      placeholder="City"
                      style={styles.inputText}
                      onChangeText={props.handleChange('city')}
                      value={props.values.city}
                      onBlur={props.handleBlur('city')}
                      returnKeyType={"next"}
                      onSubmitEditing={() => { zipCodeRef.current.focus(); }}
                      ref={cityRef}
                      blurOnSubmit={false}
                    />
                    <Text style={styles.errorText}>{props.touched.city && props.errors.city}</Text>
                    <TextInput
                      placeholder="Zip Code"
                      style={styles.inputText}
                      onChangeText={props.handleChange('zipCode')}
                      value={props.values.zipCode}
                      onBlur={props.handleBlur('zipCode')}
                      returnKeyType={"done"}
                      onSubmitEditing={() => { degreeOrSpecialityRef.current.focus(); }}
                      ref={zipCodeRef}
                      blurOnSubmit={false}
                      keyboardType="numeric"
                    />
                    <Text style={styles.errorText}>{props.touched.zipCode && props.errors.zipCode}</Text>
                    <TextInput
                      placeholder="Degree or Specialty"
                      style={styles.inputText}
                      onChangeText={props.handleChange('degreeOrSpeciality')}
                      value={props.values.degreeOrSpeciality}
                      onBlur={props.handleBlur('degreeOrSpeciality')}
                      ref={degreeOrSpecialityRef}
                    />
                    <Text style={styles.errorText}>{props.touched.degreeOrSpeciality && props.errors.degreeOrSpeciality}</Text>
                    {
                      userType === 'P' ?
                        // <View>
                        <TextInput
                          placeholder="Employment Experience "
                          style={styles.inputText}
                          onChangeText={props.handleChange('experience')}
                          value={props.values.experience}
                          onBlur={props.handleBlur('experience')}
                        />
                        // </View>
                        :
                        null
                    }
                    <Text style={styles.errorText}>{props.touched.experience && props.errors.experience}</Text>
                    {/* <Text style={styles.errorText}>{props.touched.experience && props.errors.experience}</Text> */}
                    {/* {
                      userType === 'P' ?
                        <View>
                          <TextInput
                            placeholder="Enter Company"
                            style={styles.inputText}
                            onChangeText={props.handleChange('company')}
                            value={props.values.company} 
                            onBlur={props.handleBlur('company')}
                          />
                        </View>
                        :
                          null
                    }
                    <Text style={styles.errorText}>{props.touched.company && props.errors.company}</Text> */}
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={props.handleSubmit}
                      >
                        <Text style={styles.TextStyle}>
                          <MaterialIcons name="save-alt" size={20} color="white" />
                          &nbsp;Save
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={pressHandler}
                      >
                        <Text style={styles.TextStyle}>
                          <MaterialIcons name="cancel" size={20} color="white" />
                          &nbsp;Cancel
                        </Text>
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
                      <Text style={styles.modalText}>Profile updated successfully!</Text>
                      <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          // navigation.navigate('ProfessionalProfile', {userType, userId});
                          if (userType === 'P')
                            navigation.push('ProfessionalProfile', { userType, userId });
                          else
                            navigation.push('UserProfile', { userType, userId });
                        }}>
                        <Text style={styles.textStyle}>Okay</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer navigation={navigation} />
    </View>
  );
}

const style = {
  placeholder: {
    color: '#A9A9A9'
  },
  inputAndroid: {
    //  padding: 10,
    //  paddingTop: 10,
    //  paddingBottom: 50,
    //  paddingLeft: 170,
    //  paddingRight: 170,
    width: 340,
    color: 'black',
    fontSize: 8
  },
  inputIOS: {
    //  padding: 10,
    //  paddingTop: 10,
    //  paddingBottom: 10,
    //  paddingLeft: 60,
    //  paddingRight: 60,
    //  paddingVertical: 50,
    //  paddingHorizontal: 90,
    //  color: 'black',
    //  textAlign: 'left',
    width: 340,
    color: 'black',
  },

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    // width: "100%"
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f7901f',
    padding: 5,
    // margin: 3,
    width: 340,
    height: 50
  },
  inputText1: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f7901f',
    padding: 5,
    margin: 3,
    width: 340,
    height: 100,
    textAlignVertical: 'top'
  },
  onboardingText: {
    color: 'gray',
    padding: 10,
    alignItems: "center"
  },
  SignUpButtonStyle: {
    marginTop: 10,
    marginHorizontal: 10,
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
    paddingHorizontal: 40,
    fontWeight: 'bold',
    fontSize: 18
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
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
  },
  categoryBox: {
    // margin:10,
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#f7901f',
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 10
  },
  category: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
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