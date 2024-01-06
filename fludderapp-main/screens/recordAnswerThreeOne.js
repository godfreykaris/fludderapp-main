import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import Axios from "axios";
import { Camera } from 'expo-camera';
import { ProgressBar } from "react-native-paper";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';

export default function recordAnswerThreeOne({ navigation }) {

  useKeepAwake();

  const filename = Date.now().toString();
  const [selectedVideo, setUploadVideo] = useState('');
  const [percent, setPercent] = useState(0);

  const question = navigation.getParam('question');
  const domain = navigation.getParam('domain');
  const [uploadedVideoName, setUploadedVideoName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('RecordAnswerCountDown', { question, domain })
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    console.log("selectedVideo : "+selectedVideo);
    console.log("uploadedVideoName : "+uploadedVideoName);
    console.log("isCancelVideoRecording : "+isCancelVideoRecording);
    if (selectedVideo !== '' && uploadedVideoName !== '' && isCancelVideoRecording === false) {
      uploadVideo();
    }
  }, [selectedVideo], [uploadedVideoName]); // run whenever beerCount is changed

  const uploadVideo = () => {
    let formData = new FormData();
    formData.append("videoFile", {
      tmp_name: uploadedVideoName,
      name: uploadedVideoName,
      uri: selectedVideo,
      type: "video/mp4",
    });
    console.log(formData);
    setLoading(true);
    if(uploadedVideoName!=='') {
      Axios.request({
        method: "post",
        url: "https://fludder.io/admin/api/uploadVideo",
        data: formData,
        onUploadProgress: (p) => {
          setLoading(false);
          console.log("Ddddddddddddddd : ");
          setPercent(parseInt((100 * p.loaded) / p.total));
        },
      }).then((data) => {
        setLoading(false);
        navigation.navigate('RecordAnswerFour', { question, selectedVideo, uploadedVideoName, domain });
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    }
    else {
      alert('Something went wrong! Please try again.');
      navigation.push('RecordAnswerCountDown', { question, domain });
    }
  };
  const [hasPermission, setHasPermission] = useState(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const cameraRef = useRef(null);
  const [record, setRecord] = useState(null);
  const [isCancelVideoRecording, setIsCancelVideoRecording] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
    })();
  }, []);

  // useEffect(() => {

    const takeVideo = async () => {
      
      if (cameraRef.current) {
        try {
          setIsPlaying(true);
          const videoRecordPromise = await cameraRef.current.recordAsync({
            // VideoQuality:['480p'],
            maxDuration:60,
            // maxFileSize:200,
            mute:false,
            // videoBitrate:5000000
            quality: Camera.Constants.VideoQuality["4:3"]
          });
          if (videoRecordPromise) {
            const data = videoRecordPromise;
            console.log("Data : "+data);
            if (data) {
              let vNameArray = data.uri.split("/");
              let vNameLenght = vNameArray.length;
              let vName = vNameArray[vNameLenght - 1];
              if(data.uri !== '') {
                setUploadedVideoName(vName);
                setUploadVideo(data.uri);
              }
            }
          }
        } catch (error) {
          console.log("errors for failed promise", error);
        }
      } 
    }

  //   takeVideo();
  // }, [cameraRef.current]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasAudioPermission === false) {
    return <Text>No access to audio</Text>;
  }

  const stopVideo = async () => {
    // setIsPlaying(false);
    // camera.stopRecording();
    if (cameraRef.current) {
      console.log("11 : cameraRef.current"+cameraRef.current);
      cameraRef.current.stopRecording();
      setIsPlaying(false);
    }
  }


  const cancelVideoRecording = async () => {
    // setIsPlaying(false);
    setIsCancelVideoRecording(true);
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
    // navigation.push('RecordAnswerCountDown', { question, domain });
    navigation.navigate('Questions',{domain});
  }
  return (
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={'Please wait while we are uploading your answer...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      {
        percent === 0 ?
          <View style={styles.container}>
            <View style={{ marginBottom: 10, marginTop: 60, alignItems: 'center' }}>
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={60}
                colors={[
                  ['#37266b', 1],
                  // ['#F7B801', 0.4],
                  // ['#A30000', 0.2],
                ]}
                onComplete={() => cameraRef.current.stopRecording()}
                size={50}
                strokeWidth={5}
              >
                {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{ color: animatedColor, fontSize: 10 }}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
            </View>
            <Text style={{fontSize:20, textAlign:'center', fontWeight: 'bold', marginTop: 20, marginBottom: 10, padding: 10}}>{question.question }</Text>
            <Camera
              ref={cameraRef}
              style={styles.camera} type={"front"}
              keepAwake={true}>
            </Camera>
            {/* <Button title="Take video" onPress={() => takeVideo()} />
          <Button title="Stop Video" onPress={() => stopVideo()} /> */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 40 }}>
              <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity = { .5 }
                    onPress={ () => takeVideo() }
                >
                  <Text style={styles.ButtonTextStyle}> Start </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SignUpButtonStyle}
                activeOpacity={.5}
                onPress={() => stopVideo()}
              >
                <Text style={styles.ButtonTextStyle}> Stop </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.SignUpButtonStyle}
                activeOpacity={.5}
                onPress={() => cancelVideoRecording()}
              >
                <Text style={styles.ButtonTextStyle}> Cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ marginVertical: 50 }}>Please wait while we upload your answer.</Text>
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
          </View>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  SignUpButtonStyle: {
    // marginTop:30,
    marginHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#37266b',
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
  ButtonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: '7%',
    fontSize: 17
  },
});