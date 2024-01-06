import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import VideoPlayer from 'expo-video-player';

export default function review({ navigation }) {

    const detailQuestion = navigation.getParam('detailQuestion');
    detailQuestion.user_answer_video = detailQuestion.user_answer_video.substr(0, detailQuestion.user_answer_video.lastIndexOf(".")) + ".mp4";
    // console.log(detailQuestion);
    const [isFullScree, setIsFullScreen] = useState(false);
    const refVideo = useRef(null);

    // useEffect(() => {
    //     return async () => {
    //         refVideo.current.pauseAsync();
    //     };
    // }, []);


    const { width: screenWidth } = useWindowDimensions();
    let ratings = '';

    const getRatings = () => {
        let ratingSum = +detailQuestion.user_answer_first_rating +
            +detailQuestion.user_answer_second_rating +
            +detailQuestion.user_answer_third_rating +
            +detailQuestion.user_answer_fourth_rating +
            +detailQuestion.user_answer_fifth_rating +
            +detailQuestion.user_answer_sixth_rating;
        if (ratingSum < 1)
            ratings = require('../assets/ratings/0.png');
        else if (ratingSum >= 1 && ratingSum <= 6)
            ratings = require('../assets/ratings/1.png');
        else if (ratingSum > 6 && ratingSum <= 12)
            ratings = require('../assets/ratings/2.png');
        else if (ratingSum > 12 && ratingSum <= 18)
            ratings = require('../assets/ratings/3.png');
        else if (ratingSum > 18 && ratingSum <= 24)
            ratings = require('../assets/ratings/4.png');
        else if (ratingSum > 26 && ratingSum <= 30)
            ratings = require('../assets/ratings/5.png');
        else if (ratingSum > 30 && ratingSum <= 36)
            ratings = require('../assets/ratings/6.png');
        else if (ratingSum > 36 && ratingSum <= 42)
            ratings = require('../assets/ratings/7.png');
        else if (ratingSum > 42 && ratingSum <= 48)
            ratings = require('../assets/ratings/8.png');
        else if (ratingSum > 48 && ratingSum <= 54)
            ratings = require('../assets/ratings/9.png');
        else if (ratingSum > 54)
            ratings = require('../assets/ratings/10.png');
        return ratings;
    }

    let myRatings = getRatings();

    const pressHandler = () => {
        navigation.navigate('Review');
    }

    const pressHandler1 = () => {
        navigation.navigate('AllMyAnswers');
    }

    function getDateFormatted(myDate) {
        let dDate = myDate.split(' ');
        let d = new Date(dDate[0]);
        let dd = d.toString().split(' ');
        return dd[1] + " " + dd[2] + " " + dd[3];
    }

    let myFirstRatings;
    let mySecondRatings;
    let myThirdRatings;
    let myFourthRatings;
    let myFifthRatings;
    let myFifthOneRating;

    if (detailQuestion.user_answer_first_rating == "1")
        myFirstRatings = require('../assets/ratings/1.png');
    if (detailQuestion.user_answer_first_rating == "2")
        myFirstRatings = require('../assets/ratings/2.png');
    if (detailQuestion.user_answer_first_rating == "3")
        myFirstRatings = require('../assets/ratings/3.png');
    if (detailQuestion.user_answer_first_rating == "4")
        myFirstRatings = require('../assets/ratings/4.png');
    if (detailQuestion.user_answer_first_rating == "5")
        myFirstRatings = require('../assets/ratings/5.png');
    if (detailQuestion.user_answer_first_rating == "6")
        myFirstRatings = require('../assets/ratings/6.png');
    if (detailQuestion.user_answer_first_rating == "7")
        myFirstRatings = require('../assets/ratings/7.png');
    if (detailQuestion.user_answer_first_rating == "8")
        myFirstRatings = require('../assets/ratings/8.png');
    if (detailQuestion.user_answer_first_rating == "9")
        myFirstRatings = require('../assets/ratings/9.png');
    if (detailQuestion.user_answer_first_rating == "10")
        myFirstRatings = require('../assets/ratings/10.png');

    if (detailQuestion.user_answer_second_rating == 1)
        mySecondRatings = require('../assets/ratings/1.png');
    if (detailQuestion.user_answer_second_rating == 2)
        mySecondRatings = require('../assets/ratings/2.png');
    if (detailQuestion.user_answer_second_rating == 3)
        mySecondRatings = require('../assets/ratings/3.png');
    if (detailQuestion.user_answer_second_rating == 4)
        mySecondRatings = require('../assets/ratings/4.png');
    if (detailQuestion.user_answer_second_rating == 5)
        mySecondRatings = require('../assets/ratings/5.png');
    if (detailQuestion.user_answer_second_rating == 6)
        mySecondRatings = require('../assets/ratings/6.png');
    if (detailQuestion.user_answer_second_rating == 7)
        mySecondRatings = require('../assets/ratings/7.png');
    if (detailQuestion.user_answer_second_rating == 8)
        mySecondRatings = require('../assets/ratings/8.png');
    if (detailQuestion.user_answer_second_rating == 9)
        mySecondRatings = require('../assets/ratings/9.png');
    if (detailQuestion.user_answer_second_rating == 10)
        mySecondRatings = require('../assets/ratings/10.png');

    if (detailQuestion.user_answer_third_rating == 1)
        myThirdRatings = require('../assets/ratings/1.png');
    if (detailQuestion.user_answer_third_rating == 2)
        myThirdRatings = require('../assets/ratings/2.png');
    if (detailQuestion.user_answer_third_rating == 3)
        myThirdRatings = require('../assets/ratings/3.png');
    if (detailQuestion.user_answer_third_rating == 4)
        myThirdRatings = require('../assets/ratings/4.png');
    if (detailQuestion.user_answer_third_rating == 5)
        myThirdRatings = require('../assets/ratings/5.png');
    if (detailQuestion.user_answer_third_rating == 6)
        myThirdRatings = require('../assets/ratings/6.png');
    if (detailQuestion.user_answer_third_rating == 7)
        myThirdRatings = require('../assets/ratings/7.png');
    if (detailQuestion.user_answer_third_rating == 8)
        myThirdRatings = require('../assets/ratings/8.png');
    if (detailQuestion.user_answer_third_rating == 9)
        myThirdRatings = require('../assets/ratings/9.png');
    if (detailQuestion.user_answer_third_rating == 10)
        myThirdRatings = require('../assets/ratings/10.png');

    if (detailQuestion.user_answer_fourth_rating == 1)
        myFourthRatings = require('../assets/ratings/1.png');
    if (detailQuestion.user_answer_fourth_rating == 2)
        myFourthRatings = require('../assets/ratings/2.png');
    if (detailQuestion.user_answer_fourth_rating == 3)
        myFourthRatings = require('../assets/ratings/3.png');
    if (detailQuestion.user_answer_fourth_rating == 4)
        myFourthRatings = require('../assets/ratings/4.png');
    if (detailQuestion.user_answer_fourth_rating == 5)
        myFourthRatings = require('../assets/ratings/5.png');
    if (detailQuestion.user_answer_fourth_rating == 6)
        myFourthRatings = require('../assets/ratings/6.png');
    if (detailQuestion.user_answer_fourth_rating == 7)
        myFourthRatings = require('../assets/ratings/7.png');
    if (detailQuestion.user_answer_fourth_rating == 8)
        myFourthRatings = require('../assets/ratings/8.png');
    if (detailQuestion.user_answer_fourth_rating == 9)
        myFourthRatings = require('../assets/ratings/9.png');
    if (detailQuestion.user_answer_fourth_rating == 10)
        myFourthRatings = require('../assets/ratings/10.png');

    if (detailQuestion.user_answer_fifth_rating == 1)
        myFifthRatings = require('../assets/ratings/1.png');
    if (detailQuestion.user_answer_fifth_rating == 2)
        myFifthRatings = require('../assets/ratings/2.png');
    if (detailQuestion.user_answer_fifth_rating == 3)
        myFifthRatings = require('../assets/ratings/3.png');
    if (detailQuestion.user_answer_fifth_rating == 4)
        myFifthRatings = require('../assets/ratings/4.png');
    if (detailQuestion.user_answer_fifth_rating == 5)
        myFifthRatings = require('../assets/ratings/5.png');
    if (detailQuestion.user_answer_fifth_rating == 6)
        myFifthRatings = require('../assets/ratings/6.png');
    if (detailQuestion.user_answer_fifth_rating == 7)
        myFifthRatings = require('../assets/ratings/7.png');
    if (detailQuestion.user_answer_fifth_rating == 8)
        myFifthRatings = require('../assets/ratings/8.png');
    if (detailQuestion.user_answer_fifth_rating == 9)
        myFifthRatings = require('../assets/ratings/9.png');
    if (detailQuestion.user_answer_fifth_rating == 10)
        myFifthRatings = require('../assets/ratings/10.png');

    if (detailQuestion.user_answer_sixth_rating == 1)
        myFifthOneRating = require('../assets/ratings/1.png');
    if (detailQuestion.user_answer_sixth_rating == 2)
        myFifthOneRating = require('../assets/ratings/2.png');
    if (detailQuestion.user_answer_sixth_rating == 3)
        myFifthOneRating = require('../assets/ratings/3.png');
    if (detailQuestion.user_answer_sixth_rating == 4)
        myFifthOneRating = require('../assets/ratings/4.png');
    if (detailQuestion.user_answer_sixth_rating == 5)
        myFifthOneRating = require('../assets/ratings/5.png');
    if (detailQuestion.user_answer_sixth_rating == 6)
        myFifthOneRating = require('../assets/ratings/6.png');
    if (detailQuestion.user_answer_sixth_rating == 7)
        myFifthOneRating = require('../assets/ratings/7.png');
    if (detailQuestion.user_answer_sixth_rating == 8)
        myFifthOneRating = require('../assets/ratings/8.png');
    if (detailQuestion.user_answer_sixth_rating == 9)
        myFifthOneRating = require('../assets/ratings/9.png');
    if (detailQuestion.user_answer_sixth_rating == 10)
        myFifthOneRating = require('../assets/ratings/10.png');

    console.log("myFifthOneRatingD : " + myFifthOneRating)

    return (
        <View style={{ flex: 1 }}>
            {
                isFullScree == false ?
                    <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
                        <View style={{ backgroundColor: '#ffffff', height: 34}} />
                        <ScrollView style={{ backgroundColor: '#fff' }}>
                            <View style={styles.container}>
                                <View style={styles.categoryBox}>
                                    <Text style={styles.category}>Review</Text>
                                </View>
                                <View style={styles.questionBox}>
                                    <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{detailQuestion.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                                </View>
                                <View style={styles.questionBox}>
                                    <Text style={{ fontWeight: 'bold' }}>Questions : </Text>
                                    <Text>{detailQuestion.question}</Text>
                                </View>
                                {/* <View style={{width: 400, height: 300}}> */}
                                <VideoPlayer
                                    videoProps={{
                                        shouldPlay: true,
                                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                                        source: {
                                            uri: 'https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/MP4/' + detailQuestion.user_answer_video,
                                        },
                                        ref: refVideo
                                    }}
                                    // inFullscreen={isFullScree}

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
                                {/* </View> */}
                                {/* <Video
                            source={{ uri: 'https://fludder.io/admin/uploads/answer_videos/'+detailQuestion.user_answer_video }}
                            useNativeControls
                            resizeMode="cover"
                            style={{ width:400, height: 300 }}
                            shouldPlay
                            // isLooping
                        /> */}
                                <View style={{
                                    borderBottomWidth: 0.5,
                                    borderColor: 'gray',
                                    alignSelf: 'stretch',
                                    margin: 10
                                }} />
                                <View style={styles.questionBox}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <SafeAreaView>
                                            {
                                                detailQuestion.professional_profile_picture ?
                                                    <Image
                                                        source={{
                                                            uri:
                                                                'https://fludder.io/admin/uploads/answer_videos/' + detailQuestion.professional_profile_picture,
                                                        }}
                                                        //borderRadius style will help us make the Round Shape Image
                                                        style={{ width: 50, height: 50, borderRadius: 200 / 2 }}
                                                    />
                                                    :
                                                    <Image
                                                        source={
                                                            require('../assets/person-image-icon-16.jpg')
                                                        }
                                                        //borderRadius style will help us make the Round Shape Image
                                                        style={{ width: 50, height: 50, borderRadius: 200 / 2 }}
                                                    />
                                            }

                                        </SafeAreaView>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                                {detailQuestion.professional_name}
                                            </Text>
                                            <Text style={{ fontSize: 10, }}>
                                                {detailQuestion.professional_city}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text>
                                        {getDateFormatted(detailQuestion.user_answer_created_on)}
                                    </Text>
                                </View>
                                {/* <View style={{
                            marginHorizontal:10,
                            alignSelf: 'stretch',
                            borderRadius: 5,
                            borderColor: '#f7901f',
                            borderWidth: 1,
                            flexDirection: 'row'}}
                        >    
                            <Text style={{flex: 1, margin: 5}}>
                                {detailQuestion.user_answer_text_review}
                            </Text>
                        </View> */}
                                <Image
                                    source={
                                        myRatings
                                    }
                                    style={{ width: '53%', height: 40, marginTop: 10, alignSelf: 'flex-start', marginLeft: 10 }}
                                />
                                <View style={{
                                    borderBottomWidth: 0.5,
                                    borderColor: 'gray',
                                    alignSelf: 'stretch',
                                    margin: 10
                                }} />
                                <View style={styles.categoryBox}>
                                    <Text style={styles.category}>Review Summary</Text>
                                </View>
                                {/* <View style={styles.questionBox}> 
                    <Text style={{fontWeight: 'bold', fontSize:18}}>Review : </Text>
                    <Text style={{fontSize:18, textAlign:'center'}}>{reviewText}</Text>
                </View> */}
                                <View style={styles.RatingBox}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginRight: 40 }}>Confidence :</Text>
                                    <Image
                                        source={
                                            myFirstRatings
                                        }
                                        style={{ width: 208, height: 40, margin: 10 }}
                                    />
                                </View>
                                <View style={styles.RatingBox}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginRight: 10 }}>Body Language :</Text>
                                    <Image
                                        source={
                                            mySecondRatings
                                        }
                                        style={{ width: 208, height: 40, margin: 10 }}
                                    />
                                </View>
                                <View style={styles.RatingBox}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginRight: 17 }}>Energy & Tone :</Text>
                                    <Image
                                        source={
                                            myThirdRatings
                                        }
                                        style={{ width: 208, height: 40, margin: 10 }}
                                    />
                                </View>
                                <View style={styles.RatingBox}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginRight: 3 }}>Professionalism :</Text>
                                    <Image
                                        source={
                                            myFourthRatings
                                        }
                                        style={{ width: 208, height: 40, margin: 10 }}
                                    />
                                </View>
                                <View style={styles.RatingBox}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginRight: 42 }}>Knowledge :</Text>
                                    <Image
                                        source={
                                            myFifthRatings
                                        }
                                        style={{ width: 208, height: 40, margin: 10 }}
                                    />
                                </View>
                                <View style={styles.RatingBox}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 15, marginRight: 74 }}>Clarity :</Text>
                                    <Image
                                        source={
                                            myFifthOneRating
                                        }
                                        style={{ width: 208, height: 40, margin: 10 }}
                                    />
                                </View>
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
                                        <Text style={styles.TextStyleNew}> All Answers </Text>
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
                        <Footer navigation={navigation} />
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
        alignSelf: 'stretch',
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
    TextStyleNew: {
        textAlign: 'center',
        paddingHorizontal: 25,
        color: '#fff'
    },
    RatingBox: {
        alignSelf: 'stretch',
        marginLeft: 10,
        flexDirection: 'row',
    },
});