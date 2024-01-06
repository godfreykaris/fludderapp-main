import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import Footer from '../components/footer';
import { StatusBar } from 'expo-status-bar';
import VideoPlayer from 'expo-video-player';
import Checkbox from 'expo-checkbox';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

// import AnimatedCheckbox from 'react-native-checkbox-reanimated';

export default function recordAnswerFour({ navigation }) {

  let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxPress = () => { setChecked(prev => { return !prev }) }

  const refVideo = useRef(null);

  const { width: screenWidth } = useWindowDimensions();

  // useEffect(() => {
  //   return async () => {
  //     if (refVideo && refVideo!=null)
  //       refVideo.current.pauseAsync();
  //   };
  // }, [refVideo.current]);


  const question = navigation.getParam('question');
  const domain = navigation.getParam('domain');
  const videoUrl = navigation.getParam('selectedVideo');
  const uploadedVideoName = navigation.getParam('uploadedVideoName');
  const [isFullScree, setIsFullScreen] = useState(false);


  // const [userInformationId, setUserInformationId] = useState('');

  const pressHandler = () => {
    //   if (refVideo && refVideo!=null)
    //     refVideo.current.pauseAsync();
    //   // navigation.push('RecordAnswerCountDown',{question, domain});
    navigation.navigate('Questions', { domain });
  }

  const pressHandler1 = async () => {
    if (refVideo && refVideo.current)
      refVideo.current.pauseAsync();
    // let uId = await AsyncStorage.getItem('userInformationId');
    // console.log("User ID",uId);
    // setUserInformationId(uId)

    // fetch('http://app.fludderapp.com/api/submitAnswer', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_information_id: await AsyncStorage.getItem('userInformationId'),
    //     professional_id: question.professional_id,
    //     question_id: question.question_id,
    //     domain_id: question.domain_id,
    //     user_answer_video: 'Learn.mp4',
    //     user_answer_sent_for_review_flag: 'Y',
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // alert(json.user_information_id);
    //   });


    let userId = await AsyncStorage.getItem('userInformationId');
    // let data = {
    //   "user_information_id": userId,
    //   "professional_id": question.professional_id,
    //   "domain_id": question.domain_id,
    //   "question_id": question.question_id,
    //   "user_answer_video": uploadedVideoName,
    //   "user_answer_sent_for_review_flag": "Y"
    // }
    // console.log("For FormData",data);
    // let formData = new FormData();
    // formData.append("videoFile", {
    //     tmp_name: uploadedVideoName,
    //     name: uploadedVideoName,
    //     uri: videoUrl,
    //     type: 'video/mp4'
    // });
    // formData.append("data", JSON.stringify(data));
    // // formData.append("user_information_id", userId,);
    // // formData.append("professional_id", question.professional_id,);
    // // formData.append("domain_id", question.domain_id,);
    // // formData.append("question_id", question.question_id,);
    // // formData.append("user_answer_video", uploadedVideoName,);
    // // formData.append("user_answer_sent_for_review_flag", "Y");
    // try {
    //     console.log("Form Data",formData)
    //     let response = fetch('http://app.fludderapp.com/api/submitAnswer', {
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         body: formData
    //     })
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log("In Response")
    //       alert("DDDDDDDd",response.json())
    //       return response.json();
    //     }); 
    // }
    // catch (error) {
    //     console.log('error : ' + error);
    //     return error;
    // }

    fetch(baseUrl + 'submitAnswer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_information_id": userId,
        "professional_id": question.professional_id,
        "domain_id": question.domain_id,
        "question_id": question.question_id,
        "user_answer_video": uploadedVideoName,
        "user_answer_sent_for_review_flag": "Y",
        "userAnswerMakePriveteFlag": isChecked
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // alert(json.user_name);
      });
    // if (refVideo && refVideo!=null)
    //   refVideo.current.pauseAsync();
    navigation.navigate('RecordAnswerFive', { domain });
  }
  if (!fontsLoaded && loading)
    return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
  else
    return (
      <View style={{ flex: 1 }}>
        {
          isFullScree == false ?
            <View style={{ flex: 1 }}>
              <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
              {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
              <View style={{ marginTop: Constants.statusBarHeight }} />
              <View style={styles.container}>
                <View style={styles.categoryBox}>
                  <Text style={styles.category}>Review Your Answer</Text>
                </View>
                <Image source={require('../assets/right-sign-icon.png')} style={{ height: 80, width: 80, resizeMode: 'stretch' }} />
                <Text style={{ padding: 10, fontSize: 18, marginBottom: 5, fontFamily: 'Poppins_600SemiBold' }}> Thank you for recording your answer. </Text>
                <Text style={{ padding: 10, fontSize: 14, marginBottom: 20, textAlign: "center", fontFamily: 'Poppins_400Regular' }}>
                  Save your video answer to your profile and have it automatically reviewed by an HR Pro within our network. If you don't want your video reviewed, make sure to select "Make Video Private".
                </Text>
                <VideoPlayer
                  videoProps={{
                    shouldPlay: true,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    source: {
                      uri: videoUrl,
                    },
                    ref: refVideo
                  }}
                  fullscreen={{
                    enterFullscreen: async () => {
                      setIsFullScreen(!isFullScree)
                      refVideo.current.setStatusAsync({
                        shouldPlay: true,
                      })
                    },
                    exitFullscreen: async () => {
                      setIsFullScreen(!isFullScree)
                      refVideo.current.setStatusAsync({
                        shouldPlay: false,
                      })
                    },
                    isFullScree,
                  }}
                  style={{
                    width: screenWidth,
                    height: (screenWidth * 9) / 16
                  }}
                // inFullscreen={isFullScree}
                // videoBackground='transparent'
                // height={230}
                // showControlsOnLoad={true}
                // showFullscreenButton={true}
                // switchToLandscape ={ () => { setIsFullScreen(true) }	}
                />
                <View style={{ marginVertical: 20, flexDirection: 'row' }}>
                  {/* <Pressable onPress={handleCheckboxPress} style={styles.checkbox}> */}
                  <Text>Make Video Private&nbsp;</Text>
                  {/* <AnimatedCheckbox checked={checked} highlightColor="#4444ff" checkmarkColor="#ffffff" boxOutlineColor="#4444ff" />  */}
                  {/* </Pressable> */}
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                  />
                </View>
                <TouchableOpacity
                  style={styles.SignUpButtonStyle}
                  activeOpacity={.5}
                  onPress={pressHandler}
                >
                  <Text style={styles.TextStyle}> Retake </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.SignUpButtonStyle}
                  activeOpacity={.5}
                  onPress={pressHandler1}
                >
                  <Text style={styles.TextStyle}> Save </Text>
                </TouchableOpacity>
              </View>
              <Footer navigation={navigation} />
            </View>
            :
            <VideoPlayer
              videoProps={{
                shouldPlay: true,
                resizeMode: Video.RESIZE_MODE_CONTAIN,
                source: {
                  uri: videoUrl,
                },
                ref: refVideo
              }}
              fullscreen={{
                enterFullscreen: async () => {
                  setIsFullScreen(!isFullScree)
                  //   refVideo.current.setStatusAsync({
                  //     shouldPlay: true,
                  //   })
                },
                exitFullscreen: async () => {
                  setIsFullScreen(!isFullScree)
                  //   refVideo.current.setStatusAsync({
                  //     shouldPlay: false,
                  //   })
                },
                isFullScree,
              }}
            // inFullscreen={true}
            // switchToPortrait ={ () => { setIsFullScreen(false) }	}
            // videoBackground='transparent'
            // height={220}
            // showControlsOnLoad={true}
            // showFullscreenButton={true}
            />
        }
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  SignUpButtonStyle: {
    marginTop: 10,
    marginHorizontal: 100,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#37266b', // Blue
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff'
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 50,
    fontSize: 17
  },
  categoryBox: {
    margin: 10,
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#f7901f',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30
  },
  category: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  checkbox: {
    width: 20,
    height: 20
  }
});