import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { Formik } from "formik";
import Footer from "../components/footer";
import RNPickerSelect from "react-native-picker-select";
import RadioButtonRN from "radio-buttons-react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import ToggleSwitch from "toggle-switch-react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import Checkbox from 'expo-checkbox';
import Constants from 'expo-constants';

export default function EditAdvancedProfile({ navigation }) {
  const profile = navigation.getParam("profile");
  const userType = navigation.getParam("userType");
  const userId = navigation.getParam("userId");
  const [loading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(
    profile.userWeekendAvailability == 1 ? true : false
  );
  const [isCheckedDrivingLicense, setCheckedDrivingLicense] = useState(
    profile.userDrivingLicenseFlag == 1 ? true : false
  );

  const data = [
    { label: "Available in weekend", value: 1 },
    { label: "Not available in weekend", value: 2 },
  ];
  const data1 = [
    { label: "I have driver's License", value: 1 },
    { label: "No, I don't have driver's License", value: 2 },
  ];
  const data2 = [
    { label: "Yes, make my profile discoverable", value: 1 },
    { label: "No, don't make my profile discoverable", value: 2 },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [jdModalVisible, setJdModalVisible] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [resumeLable, setResumeLable] = useState("Upload Resume");
  const [makeProfileDiscoverable, setMakeProfileDiscoverable] = useState(
    profile.userDiscoverableFlag == 1 ? true : false
  );
  const [selectedItems, setSelectedItems] = useState(
    profile.userJobDescription
      ? profile.userJobDescription.split(",").map(Number)
      : []
  );
  const [maxItems, setMaxItems] = useState([]);
  const [categoriesAndJobTitles, setCategoriesAndJobTitles] = useState([]);

  const maxItem = 5;
  const onSelectedItemsChange = (selectedItems) => {
    if (selectedItems.length >= maxItem) {
      if (selectedItems.length === maxItem) {
        setSelectedItems(selectedItems);
      }
      setMaxItems(true);
      return;
    }
    setMaxItems(false);
    setSelectedItems(selectedItems);
  };

  useEffect(() => {
    if (profile.userResume != "") setResumeLable("Upload Resume");
    fetch(webBaseUrl + "getCategoriesAndJobTitles")
      .then((response) => response.json())
      .then((json) => {
        setCategoriesAndJobTitles(json);
      });
  }, []);

  const items = [
    // this is the parent or 'item'
    {
      name: "Job Description you are interested in",
      id: 0,
      // these are the children or 'sub items'
      children: categoriesAndJobTitles.map((jobTitle, i) => ({
        name: jobTitle.jobTitle,
        id: i,
      })),
    },
  ];

  const uploadResume = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setFileName(result.name);
    setFilePath(result.uri);
    setResumeLable("Upload Resume");
  };

  const pressHandler = () => {
    navigation.push("UserAdvancedProfile", { profile, userType, userId });
  };

  const degree = [
    { label: "No formal education", value: "No formal education" },
    { label: "Secondary education or high school", value: "Secondary education or high school" },
    { label: "GED", value: "GED" },
    { label: "Vocational qualification", value: "Vocational qualification" },
    { label: "Bachelor's degree", value: "Bachelor's degree" },
    { label: "Master's degree", value: "Master's degree" },
    { label: "Doctorate or higher", value: "Doctorate or higher" },
  ]

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
      {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
      <View style={{ marginTop: Constants.statusBarHeight }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={{ backgroundColor: "#fff" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              <View style={styles.categoryBox}>
                <Text style={styles.category}>
                  <FontAwesome5 name="user-edit" size={18} color="white" />
                  &nbsp;Employment Profile
                </Text>
              </View>
              <Formik
                initialValues={{
                  userDiscoverableFlag: profile.userDiscoverableFlag,
                  userJobDescriptionText: profile.userJobDescriptionText,
                  userLevelOfEducation: profile.userLevelOfEducation,
                  userPositionLookingFor: profile.userPositionLookingFor,
                  userLocationPreference: profile.userLocationPreference,
                  userWeekendAvailability: profile.userWeekendAvailability,
                  userWorkingHours: profile.userWorkingHours,
                  userTypeOfWorkLookingFor: profile.userTypeOfWorkLookingFor,
                  userDrivingLicenseFlag: profile.userDrivingLicenseFlag,
                }}
                onSubmit={(values) => {
                  console.log(values.userJobDescriptionText);
                  if (selectedItems.length == 0 && makeProfileDiscoverable == true)
                    setJdModalVisible(true);
                  else {
                    let tempUserDiscoverableFlag;
                    if (makeProfileDiscoverable == true)
                      tempUserDiscoverableFlag = 1;
                    else tempUserDiscoverableFlag = 2;
                    let formData = new FormData();
                    if (fileName != null) {
                      formData.append("resumeFile", {
                        tmp_name: fileName,
                        name: fileName,
                        uri: filePath,
                        type: "video/mp4",
                      });
                    }
                    formData.append("userId", userId);
                    formData.append("userDiscoverableFlag" ,tempUserDiscoverableFlag);
                    formData.append("userJobDescription", selectedItems.toString());
                    formData.append("userJobDescriptionText", values.userJobDescriptionText);
                    formData.append("userLevelOfEducation", values.userLevelOfEducation);
                    formData.append("userPositionLookingFor",values.userPositionLookingFor);
                    formData.append("userLocationPreference", values.userLocationPreference);
                    formData.append("userWeekendAvailability", values.userWeekendAvailability);
                    formData.append("userWorkingHours", values.userWorkingHours);
                    formData.append("userTypeOfWorkLookingFor", values.userTypeOfWorkLookingFor);
                    formData.append("userDrivingLicenseFlag", values.userDrivingLicenseFlag);
                    setLoading(true)
                    fetch(baseUrl + "updateAdvancedProfile", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                      },
                      body: formData,
                    })
                      .then((response) => response.json())
                      .then((json) => {
                        if (json.response == false) {
                          alert("Profile not updated successfully.");
                        }
                        else {
                          setLoading(false)
                          setModalVisible(!modalVisible);
                        }
                      });
                  }
                }}
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
                    {/* <RadioButtonRN
                      activeColor="#f7901f"
                      deactiveColor="#f7901f"
                      boxActiveBgColor="#fff"
                      boxStyle={{ height: 52, width: 340, marginBottom: 20 }}
                      textStyle={{ fontSize: 16, color: "black" }}
                      data={data2}
                      initial={parseInt(props.values.userDiscoverableFlag)}
                      selectedBtn={(e) => {
                        props.setFieldValue("userDiscoverableFlag", e.value);
                      }}
                    /> */}
                    <ToggleSwitch
                      isOn={makeProfileDiscoverable}
                      onColor="#37266b"
                      // offColor="red"
                      label="Make my profile discoverable"
                      labelStyle={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: 16,
                        marginBottom: 10,
                      }}
                      trackOnStyle={{ marginBottom: 15 }}
                      trackOffStyle={{ marginBottom: 15 }}
                      size="large"
                      onToggle={(isOn) => setMakeProfileDiscoverable(isOn)}
                    />
                    {/* {makeProfileDiscoverable == true ? ( */}
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#f7901f",
                          marginBottom: 20,
                          width: 340,
                          height: "auto",
                        }}
                      >
                        <SectionedMultiSelect
                          items={items}
                          IconRenderer={MaterialIcons}
                          uniqueKey="id"
                          subKey="children"
                          selectText="Job Description you are interested in"
                          showDropDowns={true}
                          readOnlyHeadings={true}
                          onSelectedItemsChange={onSelectedItemsChange}
                          selectedItems={selectedItems}
                          renderSelectText={() => (
                            <Text style={{ color: "black", fontSize: 16 }}>
                              Job Description you are interested in{" "}
                            </Text>
                          )}
                          confirmText={`${selectedItems.length}/${maxItem} - ${maxItems ? "Max selected" : "Confirm"
                            }`}
                          styles={{
                            // chipText: {
                            //   maxWidth: Dimensions.get('screen').width - 90,
                            // },
                            // itemText: {
                            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
                            // },
                            selectedItemText: {
                              color: "blue",
                            },
                            // subItemText: {
                            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
                            // },
                            selectedSubItemText: {
                              color: "blue",
                            },
                          }}
                        />
                      </View>
                    {/* ) : null} */}

                    <TextInput
                      placeholder={"Tell us more about the role you are looking for. \ne.g. An Accounting Undergrad looking to work as Administrative staff in Retail, Insurance or Healthcare"}
                      style={styles.inputText1}
                      onChangeText={props.handleChange('userJobDescriptionText')}
                      value={props.values.userJobDescriptionText}
                      onBlur={props.handleBlur('userJobDescriptionText')}
                      multiline={true}
                      returnKeyLabel='Done' 
                      returnKeyType='done' 
                      onSubmitEditing={Keyboard.dismiss}
                      // onSubmitEditing={() => { contactNumberRef.current.focus(); }}
                      // ref={aboutMeRef}
                      blurOnSubmit={false}
                    />

                    <View
                      style={{
                        fontSize: 8,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#f7901f",
                        overflow: "hidden",
                        marginBottom: 20,
                        height: 50,
                      }}
                    >
                      <RNPickerSelect
                        style={style}
                        value={props.values.userLevelOfEducation}
                        onValueChange={(value) => {
                          props.setFieldValue("userLevelOfEducation", value);
                        }}
                        placeholder={{
                          label: "Select Level of Education",
                          value: null,
                          color: "#abb0ac",
                          // inputLabel: false
                        }}
                        items={degree}
                      />
                    </View>
                    <View
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#f7901f",
                        overflow: "hidden",
                        marginBottom: 20,
                        height: 50,
                      }}
                    >
                      <RNPickerSelect
                        style={style}
                        value={props.values.userPositionLookingFor}
                        onValueChange={(value) => {
                          props.setFieldValue("userPositionLookingFor", value);
                        }}
                        placeholder={{
                          label: "Select Desired Work Frequency",
                          value: null,
                          color: "#abb0ac",
                        }}
                        items={[
                          { label: "Full-time", value: "Full-time" },
                          { label: "Part-time", value: "Part-time" },
                          {
                            label: "Either full-time or part-time",
                            value: "Either full-time or part-time",
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#f7901f",
                        overflow: "hidden",
                        marginBottom: 20,
                        height: 50,
                      }}
                    >
                      <RNPickerSelect
                        style={style}
                        value={props.values.userLocationPreference}
                        onValueChange={(value) => {
                          props.setFieldValue("userLocationPreference", value);
                        }}
                        placeholder={{
                          label: "Select Desired Work Location",
                          value: null,
                          color: "#abb0ac",
                        }}
                        items={[
                          { label: "One location", value: "One location" },
                          { label: "Multiple locations", value: "Multiple locations" },
                          { label: "Remote", value: "Remote" },
                          { label: "Partial remote", value: "Partial remote" },
                          { label: "On-the-road", value: "On-the-road" },
                          { label: "It doesn't matter", value: "It doesn't matter" }
                        ]}
                      />
                    </View>

                    {/* <View
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#f7901f",
                        overflow: "hidden",
                        marginBottom: 20,
                        height: 50,
                      }}
                    >
                      <RNPickerSelect
                        style={style}
                        value={props.values.userWorkingHours}
                        onValueChange={(value) => {
                          props.setFieldValue("userWorkingHours", value);
                        }}
                        placeholder={{
                          label: "Desired Shift Length",
                          value: null,
                        }}
                        items={[
                          { label: "8 Hours", value: "8 Hours" },
                          { label: "10 Hours", value: "10 Hours" },
                          { label: "12 Hours", value: "12 Hours" },
                        ]}
                      />
                    </View> */}
                    {/* <View
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#f7901f",
                        overflow: "hidden",
                        marginBottom: 20,
                        height: 50,
                      }}
                    >
                      <RNPickerSelect
                        style={style}
                        value={props.values.userTypeOfWorkLookingFor}
                        onValueChange={(value) => {
                          props.setFieldValue(
                            "userTypeOfWorkLookingFor",
                            value
                          );
                        }}
                        placeholder={{
                          label: "Desired Position Type",
                          value: null,
                        }}
                        items={[
                          { label: "Contract", value: "Contract" },
                          { label: "Temporary", value: "Temporary" },
                          { label: "Internship", value: "Internship" },
                        ]}
                      />
                    </View> */}
                    <View
                      style={{
                        // borderRadius: 10,
                        // borderWidth: 1,
                        // borderColor: "#f7901f",
                        overflow: "hidden",
                        // marginBottom: 10,
                        height: 50,
                        width: 340,
                        flexDirection: 'row'
                      }}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={() => {
                          if (isChecked == true) {
                            props.setFieldValue("userWeekendAvailability", 2)
                            setChecked(false)
                          }
                          else {
                            props.setFieldValue("userWeekendAvailability", 1)
                            setChecked(true)
                          }
                        }}
                        color={isChecked ? '#f7901f' : '#f7901f'}
                      />
                      <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 16, color: '#A8A8A8' }}>Weekend Availability</Text>
                    </View>
                    <View
                      style={{
                        // borderRadius: 10,
                        // borderWidth: 1,
                        // borderColor: "#f7901f",
                        overflow: "hidden",
                        marginBottom: 20,
                        height: 50,
                        width: 340,
                        flexDirection: 'row'
                      }}
                    >
                      <Checkbox
                        style={styles.checkbox}
                        value={isCheckedDrivingLicense}
                        onValueChange={() => {
                          if (isCheckedDrivingLicense == true) {
                            props.setFieldValue("userDrivingLicenseFlag", 2)
                            setCheckedDrivingLicense(false)
                          }
                          else {
                            props.setFieldValue("userDrivingLicenseFlag", 1)
                            setCheckedDrivingLicense(true)
                          }
                        }}
                        color={isCheckedDrivingLicense ? '#f7901f' : '#f7901f'}
                      />
                      <Text style={{ marginTop: 15, marginLeft: 10, fontSize: 16, color: '#A8A8A8' }}>Valid Driver’s License</Text>
                    </View>
                    {/* <RadioButtonRN
                      activeColor="#f7901f"
                      deactiveColor="#f7901f"
                      boxActiveBgColor="#fff"
                      boxStyle={{ height: 50, width: 340, marginBottom: 20 }}
                      textStyle={{ fontSize: 16, color: "black" }}
                      data={data1}
                      initial={parseInt(props.values.userDrivingLicenseFlag)}
                      selectedBtn={(e) => {
                        props.setFieldValue("userDrivingLicenseFlag", e.value);
                      }}
                    /> */}
                    <TouchableOpacity
                      style={styles.SignUpButtonStyle}
                      activeOpacity={0.5}
                      onPress={uploadResume}
                    >
                      <Text style={styles.TextStyle}>
                        <FontAwesome5 name="upload" size={18} color="white" />
                        &nbsp;{resumeLable}
                      </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={0.5}
                        onPress={props.handleSubmit}
                      >
                        <Text style={styles.TextStyle}>
                          <MaterialIcons
                            name="save-alt"
                            size={20}
                            color="white"
                          />
                          &nbsp;Save
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={0.5}
                        onPress={pressHandler}
                      >
                        <Text style={styles.TextStyle}>
                          <FontAwesome5
                            name="times-circle"
                            size={20}
                            color="white"
                          />
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
                  onRequestClose={() => { }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        Employment Profile updated successfully!
                      </Text>
                      <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          backgroundColor: "#37266b",
                        }}
                        onPress={() => {
                          setModalVisible(!modalVisible);
                          navigation.push("UserAdvancedProfile", {
                            profile,
                            userType,
                            userId,
                          });
                          // navigation.navigate('UserAdvancedProfile', { profile, userType, userId });
                        }}
                      >
                        <Text style={styles.textStyle}>Okay</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={jdModalVisible}
                  onRequestClose={() => { }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalRedText}>
                        If you want to make your profile discoverable, you must
                        select atleast one job description.{" "}
                      </Text>
                      <TouchableHighlight
                        style={{
                          ...styles.openButton,
                          backgroundColor: "#37266b",
                        }}
                        onPress={() => {
                          setJdModalVisible(!jdModalVisible);
                        }}
                      >
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
    color: "#A9A9A9",
  },
  inputAndroid: {
    width: 340,
    color: "black",
    fontSize: 16,
  },
  inputIOS: {
    width: 340,
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    // color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7901f",
    padding: 5,
    width: 340,
    height: 50,
  },
  SignUpButtonStyle: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#f7901f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 50,
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    margin: 8,
  },
  categoryBox: {
    margin: 10,
    padding: 10,
    alignSelf: "stretch",
    backgroundColor: "#f7901f",
    marginBottom: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  category: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
    fontSize: 16,
  },
  modalRedText: {
    marginBottom: 35,
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  checkbox: {
    width: 25,
    height: 25,
    marginTop: 12
  },
  inputText1: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f7901f',
    padding: 5,
    margin: 3,
    width: 340,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20
  },
});
