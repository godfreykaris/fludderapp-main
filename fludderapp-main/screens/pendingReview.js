import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import VideoPlayer from 'expo-video-player';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function pendingReview({ navigation }) {

    const d = "Ddddddddddddd";
    const detailQuestion = navigation.getParam('detailQuestion');
    detailQuestion.user_answer_video = detailQuestion.user_answer_video.substr(0, detailQuestion.user_answer_video.lastIndexOf(".")) + ".mp4";
    const [isFullScree, setIsFullScreen] = useState(false);
    const refVideo = useRef(null);


    // useEffect(() => {
    //     if (refVideo && refVideo.current)
    //         return async () => {
    //             refVideo.current.pauseAsync();
    //         };
    // }, []);

    const { width: screenWidth } = useWindowDimensions();

    const pressHandler = () => {
        navigation.navigate('Review');
    }

    const pressHandler1 = async() => {
        if (refVideo && refVideo.current)
            refVideo.current.pauseAsync();
        navigation.navigate('AllMyAnswers');
    }

    return (
        <View style={{ flex: 1 }}>
            {
                isFullScree == false ?
                    <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                        {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                        <View style={{ marginTop: Constants.statusBarHeight }} />
                        <ScrollView style={{ backgroundColor: '#fff' }}>
                            <View style={styles.container}>
                                <View style={styles.categoryBox}>
                                    <Text style={styles.category}>Pending Review</Text>
                                </View>
                                <View style={styles.questionBox}>
                                    <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{detailQuestion.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                                </View>
                                <View style={styles.questionBox}>
                                    {/* <Text style={{fontWeight: 'bold'}}>Question : </Text> */}
                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>{detailQuestion.question}</Text>
                                </View>
                                <VideoPlayer
                                    videoProps={{
                                        shouldPlay: true,
                                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                                        source: {
                                            uri: 'https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/MP4/' + detailQuestion.user_answer_video,
                                        },
                                        ref: refVideo
                                    }}
                                    fullscreen={{
                                        enterFullscreen: () => {
                                            setIsFullScreen(!isFullScree)
                                            if (refVideo !== null) {
                                                refVideo.current.setStatusAsync({
                                                    shouldPlay: true,
                                                })
                                            }
                                        },
                                        exitFullscreen: () => {
                                            setIsFullScreen(!isFullScree)
                                            if (refVideo !== null) {
                                                refVideo.current.setStatusAsync({
                                                    shouldPlay: false,
                                                })
                                            }
                                        },
                                        isFullScree,
                                    }}

                                    // videoBackground='transparent'
                                    // height={220}
                                    showControlsOnLoad={true}
                                    showFullscreenButton={true}
                                    switchToLandscape={() => { setIsFullScreen(true) }}
                                    style={{
                                        width: screenWidth,
                                        height: (screenWidth * 9) / 16
                                    }}
                                />
                                {/* <Video
                            source={{ uri: 'https://fludder.io/admin/uploads/answer_videos/'+detailQuestion.user_answer_video }}
                            useNativeControls
                            resizeMode="cover"
                            style={{ width:400, height: 300, }}
                            shouldPlay
                            // isLooping
                        /> */}
                                <View style={{
                                    borderBottomWidth: 0.5,
                                    borderColor: 'gray',
                                    alignSelf: 'stretch',
                                    margin: 10,
                                    marginBottom: 20
                                }} />
                                <Image source={require('../assets/hourglass-icon.png')} style={{ height: 50, width: 30, marginBottom: 10 }} />
                                <Text style={{ marginBottom: 30 }}>Your answer is waiting for review by a professional.</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {/* <TouchableOpacity
                                style={styles.SkipButtonStyle}
                                activeOpacity = { .5 }
                                onPress={ pressHandler }
                            >
                                <Text style={styles.TextStyle, {paddingHorizontal:5, color:'#fff',}}> Previous Answer </Text>
                            </TouchableOpacity> */}
                                    <TouchableOpacity
                                        style={styles.SkipButtonStyle}
                                        activeOpacity={.5}
                                        onPress={pressHandler1}
                                    >
                                        <Text style={styles.AnswerTextStyle}> All Answers </Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity
                                style={styles.SkipButtonStyle}
                                activeOpacity = { .5 }
                                onPress={ pressHandler }
                            >
                                <Text style={styles.TextStyle, {paddingHorizontal:20, color:'#fff',}}> Next Answer </Text>
                            </TouchableOpacity> */}
                                </View>
                            </View>
                        </ScrollView>
                        <Footer navigation={navigation} ref={refVideo} />
                    </View>
                    :
                    <VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                                uri: 'https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/MP4/' + detailQuestion.user_answer_video,
                            },
                            ref: refVideo
                        }}
                        // inFullscreen={true}
                        switchToPortrait={() => { setIsFullScreen(false) }}
                        // videoBackground='transparent'
                        // height={220}
                        // showControlsOnLoad={true}
                        // showFullscreenButton={true}
                        fullscreen={{
                            enterFullscreen: async () => {
                                setIsFullScreen(!isFullScree)
                                if (refVideo != null) {
                                    refVideo.current.setStatusAsync({
                                        shouldPlay: true,
                                    })
                                }
                            },
                            exitFullscreen: async () => {
                                setIsFullScreen(!isFullScree)
                                if (refVideo != null) {
                                    refVideo.current.setStatusAsync({
                                        shouldPlay: false,
                                    })
                                }
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
        alignItems: "center"
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
        flexWrap: 'wrap',
        marginBottom: 10
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
        backgroundColor: '#37266b',
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
    },
    AnswerTextStyle: {
        textAlign: 'center',
        paddingHorizontal: 25,
        color: '#fff'
    },
});