import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
// import { Camera } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import * as Permissions from 'expo-permissions';
// import Footer from '../components/footer';
// import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { ProgressBar } from "react-native-paper";

export default function TestCat({ navigation }) {

  const [selectedVideo, setUploadVideo] = useState(null);
  const [percent, setPercent] = useState(0);

  const question = "Dddd";
  const domain = 1;
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

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const {
  //         status,
  //       } = await ImagePicker.requestCameraPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //       else{
  //         let result;
  //         console.log(flag)
  //         if(flag==="G") {
  //           console.log("Gallery")
  //           result = await ImagePicker.launchImageLibraryAsync({
  //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //             allowsEditing: true,
  //             aspect: [4, 3],
  //             quality: 1,
  //           });
  //         }
  //         else {
  //           console.log("Camera")
  //           result = await ImagePicker.launchCameraAsync({
  //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //             allowsEditing: true,
  //             aspect: [4, 3],
  //             quality: 1,
  //           });
  //         }
  //         // console.log("Video Name Is: ",result.name)
  //         // console.log("Selected Video " + JSON.stringify(result.uri));
      
  //         if (!result.cancelled) {
  //           let vNameArray = JSON.stringify(result.uri).split("/");
  //           let vNameLenght = vNameArray.length;
  //           let vName = vNameArray[vNameLenght-1];
  //           // console.log("Before", vName);
  //           setUploadedVideoName(vName);
  //           // console.log("After",uploadedVideoName);
  //           setUploadVideo(result.uri);
  //           // uploadVideo();
  //         }
  //         else {
  //           navigation.push('ProfessionalProfile', {userType, userId})
  //         }
  //       }
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   if (selectedVideo != null && uploadedVideoName!=null) {
  //     console.log("Starting upload D D");
  //     uploadVideo();
  //   }
  // }, [selectedVideo],[uploadedVideoName]); // run whenever beerCount is changed



  
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

  // const pressHandler = () => {
  //   navigation.navigate('RecordAnswerOne');
  // }  

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

  // const uploadVideo = () => {
  //   // console.log("In")
  //   let formData = new FormData();
  //   formData.append("videoFile", {
  //     tmp_name: uploadedVideoName,
  //     name: uploadedVideoName,
  //     uri: selectedVideo,
  //     type: "video/mp4",
  //   });
  //   formData.append("userId", userId);
  //   formData.append("userType", userType);
  //   // navigation.navigate('RecordAnswerFour',{question, selectedVideo, uploadedVideoName});
  //   // Axios.post("http://app.fludderapp.com/api/uploadVideo", formData);

  //   Axios.request({
  //     method: "post",
  //     url: "https://fludder.io/admin/api/uploadImage",
  //     data: formData,
  //     onUploadProgress: (p) => {
  //       //
  //       // console.log((100 * p.loaded) / p.total);
  //       setPercent(parseInt((100 * p.loaded) / p.total));
  //     },
  //   }).then((data) => {
  //     // console.log("response " + JSON.stringify(data.data));
  //     // ToastAndroid.show(data.data.message, ToastAndroid.SHORT);
  //     navigation.push('ProfessionalProfile', {userType, userId})
  //   });
  // };
  return (
    // <View style={{flex: 1}}>
    //   <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
    //   <View style={{ backgroundColor: '#f7901f', height: 24 }} />
    //   <SafeAreaView style={{ flex: 1 }}>
        
    //       {loading ? (
    //       // <View style={[styles.actiContainer, styles.horizontal]}>
    //         // <ActivityIndicator 
    //           // size="large" 
    //           // color="#00ff00" 
    //           // style={{opacity: setLoading ? 1.0 : 0.0}} animating={true} size="large"
    //           // textContent={'Uploading Video...'}
    //           // textStyle={styles.fludder}
    //         // />
    //       // </View>
    //       <View style={styles.pcontainer}>
    //         <Text>
    //           Uploading Video.....
    //         </Text>
    //         {/* <View style={styles.progressBar}>
    //           <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "#8BED4F", width: "50%"}}/>
    //         </View>
    //         <Text>50%</Text> */}
    //       </View>
    //       ) : (
    //         <>
    //           <View style={styles.container}>
    //           <View style={{ flex: 1, backgroundColor: '#fff'}}>
    //             <Camera style={{ flex: 1, maxHeight: 450, marginTop: 50, margin:10 }} type={type} ref={ref => {
    //               setCameraRef(ref) ;}}>
    //               <View
    //                 style={{
    //                   flex: 1,
    //                   backgroundColor: 'transparent',
    //                   flexDirection: 'row',
    //                 }}>
    //                 <View
    //                   style={{
    //                     alignSelf: 'flex-end',
    //                     alignItems: 'center',
    //                     flexDirection: 'row',
    //                     marginHorizontal: 100
    //                   }}
    //                 >
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       setType(
    //                         type === Camera.Constants.Type.back
    //                           ? Camera.Constants.Type.front
    //                           : Camera.Constants.Type.back
    //                       );
    //                     }}>
    //                     <Text style={{ fontSize: 18, marginBottom: 10, padding:20, color: 'white' }}> Flip </Text>
    //                   </TouchableOpacity>
    //                   <TouchableOpacity onPress={async() => {
    //                     if(!recording){
    //                       setRecording(true)
    //                       let video = await cameraRef.recordAsync().then(data => {
    //                         MediaLibrary.saveToLibraryAsync(data.uri);
    //                         videoPath = data.uri.split('/');
    //                         setUploadedVideoName(videoPath[videoPath.length-1]);
    //                         setvideoUrl(data.uri)
    //                       });
    //                     } else {
    //                         setRecording(false)
    //                         cameraRef.stopRecording()
    //                     }
    //                   }}>
    //                     <View style={{ 
    //                       borderWidth: 2,
    //                       borderRadius:50,
    //                       borderColor: 'white',
    //                       height: 50,
    //                       width:50,
    //                       display: 'flex',
    //                       justifyContent: 'center',
    //                       alignItems: 'center'}}
    //                     >
    //                       <View style={{
    //                         borderWidth: 2,
    //                         borderRadius:50,
    //                         borderColor: recording ? "red":'white',
    //                         height: 40,
    //                         width:40,
    //                         backgroundColor: recording ? "red":'white',}} >
    //                       </View>
    //                     </View>
    //                   </TouchableOpacity>
    //                 </View>
    //               </View>
    //             </Camera>
    //             <View style={{ flexDirection:"row" }}>
    //               <TouchableOpacity
    //                 style={styles.SkipButtonStyle}
    //                 activeOpacity = { .5 }
    //                 onPress = {pressHandler}
    //               >
    //                 <Text style={styles.TextStyle}> Cancel </Text>
    //               </TouchableOpacity>
    //               <TouchableOpacity
    //                 style={styles.NextButtonStyle}
    //                 activeOpacity = { .5 }
    //                 onPress={ pressHandler1 }
    //               >
    //                 <Text style={styles.TextStyle}> Finish </Text>
    //               </TouchableOpacity>
    //             </View> 
    //           </View>
    //           <Footer navigation={navigation} />
    //           </View>
    //         </>
    //       )}
        
    //   </SafeAreaView>
    //   {/*  */}
    // </View>
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
    //   <Text style={{ marginVertical: 50 }}>{`${percent} %  uploaded  `}</Text>
    //   <View style={{ width: "100%", padding: 20 }}>
    //     <ProgressBar
    //       progress={percent / 100}
    //       color="#f7901f"
    //       style={{
    //         height: 20,
    //         marginVertical: 50,
    //         borderRadius: 20,
    //         width: "100%",
    //       }}
    //     />
    //   </View>

    //   {/* {selectedVideo && (
    //     <Image
    //       source={{ uri: selectedVideo }}
    //       style={{ backgroundColor: "red", width: 200, height: 200 }}
    //     />
    //   )} */}
    // </View>
    <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Choose an option!</Text>
                    <View style={{flexDirection:"row"}}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                            onPress={() => {
                                let flag = 'C';
                                setModalVisible(!modalVisible);
                                navigation.push('EditProfilePicture', {profile, userType, userId, flag});
                            }}>
                            <Text style={styles.textStyle}>Camera</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                            onPress={ async () => {
                                let flag = 'G';
                                setModalVisible(!modalVisible);
                                navigation.push('EditProfilePicture', {profile, userType, userId, flag});
                            }}>
                            <Text style={styles.textStyle}>Gallery</Text>
                        </TouchableHighlight>
                        { profilePicture!= 'profile-icon.png' ?
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                onPress={ async () => {
                                    let flag = 'G';
                                    setModalVisible(!modalVisible);
                                    deleteProfilePicture(userType, userId);
                                    // navigation.navigate('ProfessionalProfile', { userType, userId });
                                    navigation.push('ProfessionalProfile', {userType, userId})
                                }}>
                                <Text style={styles.textStyle}>Remove</Text>
                            </TouchableHighlight>
                            :
                            null
                        }
                    </View>
                  </View>
                </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    marginBottom: 45,
  },
  profilePictureBox: {
      margin:7,
      alignSelf: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#37266b',
      borderRadius: 10
  },
  profileTextBox: {
      margin:7,
      alignSelf: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: '#f6f6f6',
      borderRadius: 10
  },
  SignUpButtonStyle: {
    marginTop:30,
    marginHorizontal: 5,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#37266b',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      paddingHorizontal:50,
      fontSize: 17
  },
  ButtonTextStyle:{
      color:'#fff',
      textAlign:'center',
      paddingHorizontal:'7%',
      fontSize: 17
  },
  EditButtonTextStyle:{
      color:'#fff',
      textAlign:'center',
      paddingHorizontal:'13%',
      fontSize: 17
  },
  questionBox: {
      margin:10,
      padding: 10,
      alignSelf: 'stretch',
      backgroundColor: '#f6f6f6'
  },
  categoryBox: {
      margin:"1.5%",
      padding: 10,
      alignSelf: 'stretch',
      backgroundColor: '#f7901f',
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
    // marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 40,
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
    backgroundColor: '#f7901f',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5
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
    fontSize: 16,
    fontWeight: "bold"
  },
});