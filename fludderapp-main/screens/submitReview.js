import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, FlatList, useWindowDimensions, Modal,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import { Formik } from 'formik';
import * as yup from 'yup';
import VideoPlayer from 'expo-video-player';
import PlayerReference from './PlayerReference';
import Constants from 'expo-constants';

export default function submitReview({ navigation }) {

    const [makeVideoInappropriateModalVisible, setMakeVideoInappropriateModalVisible] = useState(false);
    const refVideo = useRef(null);

    const { width: screenWidth } = useWindowDimensions();

    // useEffect(() => {
    //     return async () => {
    //         if(refVideo && refVideo.current)
    //         refVideo.current.pauseAsync();
    //     };
    // }, []);

    // PlayerReference.getInstance().setRefVideo(refVideo);

    const [isFullScree, setIsFullScreen] = useState(false);
    // const[isPaused, setIsPaused] = useState(false);

    const answer = navigation.getParam('answer');
    answer.user_answer_video = answer.user_answer_video.substr(0, answer.user_answer_video.lastIndexOf(".")) + ".mp4";
    console.log(answer.user_answer_video);
    // const pressHandler = () => {
    // setIsPaused(true);
    // alert("Paused");
    // video.pauseAsync();
    // navigation.push('SubmitReviewSuccess');
    // refVideo.current.pauseAsync();
    // }

    const ReviewSchema = yup.object({
        review: yup.string().required('Please enter review').min(3)
    });

    const openVideoInappropriateModel = () => {
        setMakeVideoInappropriateModalVisible(true)
    }

    const makeVideoInappropriate = (user_answer_and_review_id) => {
        fetch(baseUrl + 'makeVideoInappropriate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_answer_and_review_id: user_answer_and_review_id }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 1) {
                    if (refVideo && refVideo.current)
                        refVideo.current.pauseAsync();
                    navigation.push('StudentAnswers');
                }
            });
    }

    return (
        <View style={{ flex: 1 }}>
            {
                isFullScree == false ?
                    <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                        {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                        <View style={{ marginTop: Constants.statusBarHeight }} />
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.container}
                        >
                            <View style={{ flex: 1 }}>
                                <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
                                    <TouchableWithoutFeedback onPress={() => {
                                        Keyboard.dismiss();
                                    }
                                    }>
                                        <Formik
                                            initialValues={{
                                                review: ''
                                            }}
                                            onSubmit={async (values, onSubmitProps) => {
                                                if (refVideo && refVideo.current)
                                                    refVideo.current.pauseAsync();
                                                // let professionalId = await AsyncStorage.getItem("professionalId");
                                                // fetch(baseUrl+'addReview', {
                                                //     method: 'POST',
                                                //     headers: {
                                                //     Accept: 'application/json',
                                                //     'Content-Type': 'application/json',
                                                //     },
                                                //     body: JSON.stringify({
                                                //         userAnswerAndReviewId: answer.user_answer_and_review_id,
                                                //         review: values.review,
                                                //     }),
                                                // })
                                                // .then((response) => response.json())
                                                // .then((json) => {
                                                //     let questionPara = json.question;
                                                //     onSubmitProps.resetForm();
                                                //     navigation.navigate('SubmitReviewSuccess');
                                                // });
                                                let reviewText = values.review;
                                                // if(refVideo && refVideo.current)
                                                //     refVideo.current.pauseAsync();
                                                navigation.navigate('RatingOne', { answer, reviewText });
                                            }}
                                        // validationSchema={ReviewSchema}
                                        >
                                            {(props) => (
                                                <View style={styles.container}>
                                                    <View style={styles.categoryBox}>
                                                        <Text style={styles.category}>Review</Text>
                                                    </View>
                                                    <View style={styles.questionBox}>
                                                        <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{answer.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                                                    </View>
                                                    <View style={styles.questionBox}>
                                                        {/* <Text style={{fontWeight: 'bold'}}>Question : </Text> */}
                                                        <Text style={{ fontSize: 18, textAlign: 'center' }}>{answer.question}</Text>
                                                    </View>
                                                    {/* <Video
                                        source={{ uri: 'https://fludder.io/admin/uploads/answer_videos/'+answer.user_answer_video }}
                                        useNativeControls
                                        resizeMode="cover"
                                        style={{ width:400, height: 200 }}
                                        shouldPlay
                                    /> */}
                                                    <VideoPlayer
                                                        videoProps={{
                                                            shouldPlay: true,
                                                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                                                            source: {
                                                                uri: 'https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/MP4/' + answer.user_answer_video,
                                                            },
                                                            ref: refVideo
                                                        }}
                                                        // inFullscreen={isFullScree}
                                                        // videoBackground='transparent'
                                                        // height={220}
                                                        // showControlsOnLoad={true}
                                                        // showFullscreenButton={true}
                                                        // switchToLandscape ={() => { setIsFullScreen(true) }}
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
                                                    />
                                                    <View style={{
                                                        borderBottomWidth: 0.5,
                                                        borderColor: 'gray',
                                                        alignSelf: 'stretch',
                                                        margin: 10,
                                                    }} />
                                                    {/* <Text style={{alignSelf: 'stretch', margin: 10, fontSize:16}}>Please provide feedback</Text> */}
                                                    {/* <TextInput
                                        placeholder="Please provide feedback, tips and guidance that will be beneficial from a hiring perspective."
                                        style={styles.inputText}
                                        onChangeText={props.handleChange('review')}
                                        value={props.values.review} 
                                        onBlur={props.handleBlur('review')}
                                        multiline={true}
                                    /> */}

                                                    {/* <TextInput
                                        placeholder="Please provide feedback, tips and guidance that will be beneficial from a hiring perspective."
                                        style={styles.inputText1}
                                        onChangeText={props.handleChange('review')}
                                        value={props.values.review} 
                                        onBlur={props.handleBlur('review')}
                                        multiline={true}
                                    />                                

                                    <Text style={styles.errorText}>{props.touched.review && props.errors.review}</Text> */}
                                                    <View style={{ flexDirection: "row" }}>
                                                        <TouchableOpacity
                                                            style={styles.SkipButtonStyle}
                                                            activeOpacity={.5}
                                                            onPress={() => openVideoInappropriateModel()}
                                                        >
                                                            <Text style={styles.TextStyle}> Inappropriate Video </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{ ...styles.SkipButtonStyle, backgroundColor: '#360A65' }}
                                                            activeOpacity={.5}
                                                            onPress={props.handleSubmit}
                                                        >
                                                            <Text style={{ ...styles.TextStyle, marginHorizontal: 40 }}> Review it! </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                        </Formik>
                                    </TouchableWithoutFeedback>
                                </ScrollView>
                            </View>
                        </KeyboardAvoidingView>
                        {
                            makeVideoInappropriateModalVisible ?
                                <View style={{ ...styles.centeredView, backgroundColor: 'white' }}>
                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={makeVideoInappropriateModalVisible}
                                        onRequestClose={() => {
                                            // Alert.alert('Modal has been closed.');
                                        }}>
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>
                                                <Text style={styles.modalText}>Are you sure you want to make this video inappropriate?</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <TouchableHighlight
                                                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                                        onPress={() => {
                                                            setMakeVideoInappropriateModalVisible(!makeVideoInappropriateModalVisible);
                                                            makeVideoInappropriate(answer.user_answer_and_review_id);
                                                        }}>
                                                        <Text style={styles.textStyle}>Make Inappropriate</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight
                                                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                                        onPress={async () => {
                                                            setMakeVideoInappropriateModalVisible(!makeVideoInappropriateModalVisible);
                                                        }}>
                                                        <Text style={styles.textStyle}>Cancel</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                                :
                                null
                        }
                        <Footer navigation={navigation} />
                    </View>
                    :
                    <VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                                uri: 'https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/MP4/' + answer.user_answer_video,
                            },
                            ref: refVideo
                        }}
                        // inFullscreen={true}
                        // switchToPortrait ={ () => { setIsFullScreen(false) }	}
                        // videoBackground='transparent'
                        // height={220}
                        // showControlsOnLoad={true}
                        // showFullscreenButton={true}
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
                    />
            }
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    categoryBox: {
        margin: 10,
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
    questionBox: {
        margin: 10,
        // alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    SkipButtonStyle: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f7901f',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    NextButtonStyle: {
        marginTop: 10,
        marginHorizontal: 5,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f7901f',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        textAlign: 'center',
        paddingHorizontal: 25,
        color: '#fff',
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#f7901f', // Orange
        padding: 5,
        margin: 10,
        width: 400,
        height: 130,
        textAlignVertical: 'top'
    },
    errorText: {
        color: 'red',
    },
    inputText1: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#f7901f', // Orange
        padding: 5,
        margin: 10,
        width: '95%',
        height: 200,
        textAlignVertical: 'top'
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginHorizontal: 15
    },
    openButton: {
        // width: 105,
        backgroundColor: '#f7901f',
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        marginHorizontal: 5
    },
    modalText: {
        padding: 10,
        marginBottom: 35,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold"
    },
});