import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import * as Permissions from 'expo-permissions';
// import Footer from '../components/footer';
// import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { ProgressBar } from "react-native-paper";

export default function EditProfilePicture({ navigation }) {
  

  // const [modalVisible, setModalVisible] = useState(false);

  const [selectedVideo, setUploadVideo] = useState(null);
  const [percent, setPercent] = useState(0);

  const userType = navigation.getParam('userType');
  const userId = navigation.getParam('userId');
  const flag = navigation.getParam('flag');

  // const [hasPermission, setHasPermission] = useState(null);
  // const [videoUrl, setvideoUrl] = useState('');
  // const [type, setType] = useState(Camera.Constants.Type.back);
  // const [cameraRef, setCameraRef] = useState(null);
  // const [recording, setRecording] = useState(false);
  const [uploadedVideoName, setUploadedVideoName] = useState(null);

  // let userInforamationId; 
  // let videoPath

  // const App = () => {
    // const [loading, setLoading] = useState(false);
  // }

  // const startLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraPermissionsAsync();
        const {
          status1,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // setTimeout(() => {
        //   alert("In Delay")
        // }, 2000);
        console.log("Status : "+status);
        if (status !== "granted" && status1 !== 'granted') { 
          // alert("Sorry, we need camera roll permissions to make this work!");
          // setModalVisible(!modalVisible);
        }
        else{
          let result;
          if(flag=='G') {
            console.log("Gallery : "+status);
            result = await ImagePicker.launchImageLibraryAsync({ //launchImageLibraryAsync, launchCameraAsync
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
          }
          else{
            console.log("Camera : "+status);
            result = await ImagePicker.launchCameraAsync({ //launchImageLibraryAsync, launchCameraAsync
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
          }
          // console.log("Video Name Is: ",result.name)
          // console.log("Selected Video " + JSON.stringify(result.uri));
      
          if (!result.canceled) {
            let duri = result.assets.map(a => a.uri)
            let vNameArray = JSON.stringify(duri[0]).split("/");
            let vNameLenght = vNameArray.length;
            let vName = vNameArray[vNameLenght-1];
            // console.log("Before", vName);
            setUploadedVideoName(vName);
            // console.log("After",uploadedVideoName);
            setUploadVideo(duri[0]);
            // uploadVideo();
          }
          else{
            // navigation.navigate('ProfessionalProfile');
            if(userType==='P')
            navigation.push('ProfessionalProfile', {userType, userId});
        else
            navigation.push('UserProfile', {userType, userId});
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedVideo != null && uploadedVideoName!=null) {
      uploadVideo();
    }
  }, [selectedVideo],[uploadedVideoName]); // run whenever beerCount is changed



  
  // const pressHandler1 = () => {
  //   setLoading(true);
  //   let formData = new FormData();
  //   formData.append("videoFile", {
  //       tmp_name: uploadedVideoName,
  //       name: uploadedVideoName,
  //       uri: videoUrl,
  //       type: 'video/mp4'
  //   });
  //   try {
  //       fetch('http://app.fludderapp.com/api/uploadVideo', {
  //           method: 'post',
  //           headers: {
  //               'Content-Type': 'multipart/form-data',
  //           },
  //           body: formData
  //       })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setLoading(false);
  //         console.log(json.message,"DdD")
  //         navigation.navigate('RecordAnswerFour',{question, videoUrl, uploadedVideoName});
  //       }); 
  //   }
  //   catch (error) {
  //       console.log('error : ' + error);
  //       return error;
  //   }
  // }

  const pressHandler = () => {
    navigation.navigate('RecordAnswerOne');
  }  

  // useEffect(() => {
  //   (async () => {
  //     const permission = Permissions.getAsync(Permissions.CAMERA_ROLL);
  //     if (permission.status !== 'granted') {
  //       const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //       if (newPermission.status === 'granted') {
  //         setHasPermission('granted');
  //       }
  //   }
  //   else
  //     setHasPermission('granted');
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const uploadVideo = () => {
    let formData = new FormData();
    formData.append("videoFile", {
      tmp_name: uploadedVideoName,
      name: uploadedVideoName,
      uri: selectedVideo,
      type: "video/mp4",
    });
    formData.append("userId", userId);
    formData.append("userType", userType);
    console.log("Image = ",formData);

    // Axios.post("http://app.fludderapp.com/api/uploadVideo", formData);

    Axios.request({
      method: "post",
      url: "https://fludder.io/admin/api/uploadImage",
      data: formData,
      onUploadProgress: (p) => {
        //
        console.log((100 * p.loaded) / p.total);
        setPercent(parseInt((100 * p.loaded) / p.total));
      },
    }).then((data) => {
      // console.log("response " + JSON.stringify(data.data));
      // ToastAndroid.show(data.data.message, ToastAndroid.SHORT);
      // navigation.navigate('RecordAnswerFour',{question, selectedVideo, uploadedVideoName});
      // navigation.navigate('ProfessionalProfile');
      if(userType==='P')
            navigation.push('ProfessionalProfile', {userType, userId});
        else
            navigation.push('UserProfile', {userType, userId});
    });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        <Text style={{ marginVertical: 50 }}>{`${percent} %  uploaded  `}</Text>
        <View style={{ width: "100%", padding: 20 }}>
          <ProgressBar
            progress={percent / 100}
            color="#f7901f"
            style={{
              height: 20,
              marginVertical: 50,
              borderRadius: 20,
              width: "100%",
            }}
          />
        </View>

        {/* {selectedVideo && (
          <Image
            source={{ uri: selectedVideo }}
            style={{ backgroundColor: "red", width: 200, height: 200 }}
          />
        )} */}

      {/* <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sorry, we need camera roll permissions to make this work!</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Okay</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View> */}
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
    color:'#37266b',
  },
  welcome: {
    fontWeight: 'bold',
    color: '#f7901f',
    marginTop:150,
  },
  onboarding: {
    color:'#37266b',
    marginTop:90,
  },
  onboardingText: {
    color:'gray',
    padding:20,
    alignItems: "center"
  },
  SkipButtonStyle: {
    marginTop:5,
    marginHorizontal: 50,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#37266b',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  NextButtonStyle: {
    marginTop:5,
    marginHorizontal: 50,
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
      paddingHorizontal:30
  },
  pcontainer: {
    flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
   padding: 8,
  },
  progressBar: {
   height: 20,
   width: '100%',
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 2,
   borderRadius: 5,
   flexDirection:'row'
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