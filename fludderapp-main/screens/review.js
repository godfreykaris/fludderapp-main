import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import VideoPlayer from 'expo-video-player';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';

export default function review({ navigation }) {

    const [otherAnswers, setOtherAnswers] = useState([]);
    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
    const detailQuestion = navigation.getParam('detailQuestion');
    detailQuestion.user_answer_video = detailQuestion.user_answer_video.substr(0, detailQuestion.user_answer_video.lastIndexOf(".")) + ".mp4";
    // console.log("detailQuestion.user_information_id : ", detailQuestion.user_information_id);
    const [isFullScree, setIsFullScreen] = useState(false);
    const refVideo = useRef(null);

    let passJson;
    useEffect(() => {
        console.log("detailQuestion.user_information_id : ", detailQuestion.user_information_id);
        passJson = { user_information_id: detailQuestion.user_information_id, user_answer_and_review_id: detailQuestion.user_answer_and_review_id }
        fetch(baseUrl + 'getOtherQuestions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                passJson
            ),
        })
            .then((response) => response.json())
            .then((json) => {
                setOtherAnswers(json.data);
            });
        // return async () => {
        //     if(refVideo && refVideo.current)
        //     refVideo.current.pauseAsync();
        // };
    }, []);


    const { width: screenWidth } = useWindowDimensions();
    let ratings = '';
    let ratingDigit = 0;

    const getRatings = () => {
        let ratingSum = +detailQuestion.user_answer_first_rating +
            +detailQuestion.user_answer_second_rating +
            +detailQuestion.user_answer_third_rating +
            +detailQuestion.user_answer_fourth_rating +
            +detailQuestion.user_answer_fifth_rating +
            +detailQuestion.user_answer_sixth_rating;
        if (ratingSum < 1) {
            ratings = require('../assets/ratings/0.png');
            ratingDigit = 0;
        }
        else if (ratingSum >= 1 && ratingSum <= 6) {
            ratings = require('../assets/ratings/1.png');
            ratingDigit = 0.5;
        }
        else if (ratingSum > 6 && ratingSum <= 12) {
            ratings = require('../assets/ratings/2.png');
            ratingDigit = 1;
        }
        else if (ratingSum > 12 && ratingSum <= 18) {
            ratings = require('../assets/ratings/3.png');
            ratingDigit = 1.5;
        }
        else if (ratingSum > 18 && ratingSum <= 24) {
            ratings = require('../assets/ratings/4.png');
            ratingDigit = 2;
        }
        else if (ratingSum > 26 && ratingSum <= 30) {
            ratings = require('../assets/ratings/5.png');
            ratingDigit = 2.5;
        }
        else if (ratingSum > 30 && ratingSum <= 36) {
            ratings = require('../assets/ratings/6.png');
            ratingDigit = 3;
        }
        else if (ratingSum > 36 && ratingSum <= 42) {
            ratings = require('../assets/ratings/7.png');
            ratingDigit = 3.5;
        }
        else if (ratingSum > 42 && ratingSum <= 48) {
            ratings = require('../assets/ratings/8.png');
            ratingDigit = 4;
        }
        else if (ratingSum > 48 && ratingSum <= 54) {
            ratings = require('../assets/ratings/9.png');
            ratingDigit = 4.5;
        }
        else if (ratingSum > 54) {
            ratings = require('../assets/ratings/10.png');
            ratingDigit = 5;
        }
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

    function formattedName() {
        let nameArray = detailQuestion.professional_name.split(' ');
        return nameArray[0] + ' ' + nameArray[1].charAt(0);
    }

    let myFirstRatings;
    let mySecondRatings;
    let myThirdRatings;
    let myFourthRatings;
    let myFifthRatings;
    let myFifthOneRating;

    let myFirstRatingsDigit;
    let mySecondRatingsDigit;
    let myThirdRatingsDigit;
    let myFourthRatingsDigit;
    let myFifthRatingsDigit;
    let myFifthOneRatingDigit;

    if (detailQuestion.user_answer_first_rating == "1") {
        myFirstRatings = require('../assets/ratings/1.png');
        myFirstRatingsDigit = 0.5;
    }
    if (detailQuestion.user_answer_first_rating == "2") {
        myFirstRatings = require('../assets/ratings/2.png');
        myFirstRatingsDigit = 1;
    }
    if (detailQuestion.user_answer_first_rating == "3") {
        myFirstRatings = require('../assets/ratings/3.png');
        myFirstRatingsDigit = 1.5;
    }
    if (detailQuestion.user_answer_first_rating == "4") {
        myFirstRatings = require('../assets/ratings/4.png');
        myFirstRatingsDigit = 2;
    }
    if (detailQuestion.user_answer_first_rating == "5") {
        myFirstRatings = require('../assets/ratings/5.png');
        myFirstRatingsDigit = 2.5;
    }
    if (detailQuestion.user_answer_first_rating == "6") {
        myFirstRatings = require('../assets/ratings/6.png');
        myFirstRatingsDigit = 3;
    }
    if (detailQuestion.user_answer_first_rating == "7") {
        myFirstRatings = require('../assets/ratings/7.png');
        myFirstRatingsDigit = 3.5;
    }
    if (detailQuestion.user_answer_first_rating == "8") {
        myFirstRatings = require('../assets/ratings/8.png');
        myFirstRatingsDigit = 4;
    }
    if (detailQuestion.user_answer_first_rating == "9") {
        myFirstRatings = require('../assets/ratings/9.png');
        myFirstRatingsDigit = 4.5;
    }
    if (detailQuestion.user_answer_first_rating == "10") {
        myFirstRatings = require('../assets/ratings/10.png');
        myFirstRatingsDigit = 5;
    }

    if (detailQuestion.user_answer_second_rating == 1) {
        mySecondRatings = require('../assets/ratings/1.png');
        mySecondRatingsDigit = 0.5;
    }
    if (detailQuestion.user_answer_second_rating == 2) {
        mySecondRatings = require('../assets/ratings/2.png');
        mySecondRatingsDigit = 1;
    }
    if (detailQuestion.user_answer_second_rating == 3) {
        mySecondRatings = require('../assets/ratings/3.png');
        mySecondRatingsDigit = 1.5;
    }
    if (detailQuestion.user_answer_second_rating == 4) {
        mySecondRatings = require('../assets/ratings/4.png');
        mySecondRatingsDigit = 2;
    }
    if (detailQuestion.user_answer_second_rating == 5) {
        mySecondRatings = require('../assets/ratings/5.png');
        mySecondRatingsDigit = 2.5;
    }
    if (detailQuestion.user_answer_second_rating == 6) {
        mySecondRatings = require('../assets/ratings/6.png');
        mySecondRatingsDigit = 3;
    }
    if (detailQuestion.user_answer_second_rating == 7) {
        mySecondRatings = require('../assets/ratings/7.png');
        mySecondRatingsDigit = 3.5;
    }
    if (detailQuestion.user_answer_second_rating == 8) {
        mySecondRatings = require('../assets/ratings/8.png');
        mySecondRatingsDigit = 4;
    }
    if (detailQuestion.user_answer_second_rating == 9) {
        mySecondRatings = require('../assets/ratings/9.png');
        mySecondRatingsDigit = 4.5;
    }
    if (detailQuestion.user_answer_second_rating == 10) {
        mySecondRatings = require('../assets/ratings/10.png');
        mySecondRatingsDigit = 5;
    }

    if (detailQuestion.user_answer_third_rating == 1) {
        myThirdRatings = require('../assets/ratings/1.png');
        myThirdRatingsDigit = 0.5;
    }
    if (detailQuestion.user_answer_third_rating == 2) {
        myThirdRatings = require('../assets/ratings/2.png');
        myThirdRatingsDigit = 1;
    }
    if (detailQuestion.user_answer_third_rating == 3) {
        myThirdRatings = require('../assets/ratings/3.png');
        myThirdRatingsDigit = 1.5;
    }
    if (detailQuestion.user_answer_third_rating == 4) {
        myThirdRatings = require('../assets/ratings/4.png');
        myThirdRatingsDigit = 2;
    }
    if (detailQuestion.user_answer_third_rating == 5) {
        myThirdRatings = require('../assets/ratings/5.png');
        myThirdRatingsDigit = 2.5;
    }
    if (detailQuestion.user_answer_third_rating == 6) {
        myThirdRatings = require('../assets/ratings/6.png');
        myThirdRatingsDigit = 3;
    }
    if (detailQuestion.user_answer_third_rating == 7) {
        myThirdRatings = require('../assets/ratings/7.png');
        myThirdRatingsDigit = 3.5;
    }
    if (detailQuestion.user_answer_third_rating == 8) {
        myThirdRatings = require('../assets/ratings/8.png');
        myThirdRatingsDigit = 4;
    }
    if (detailQuestion.user_answer_third_rating == 9) {
        myThirdRatings = require('../assets/ratings/9.png');
        myThirdRatingsDigit = 4.5;
    }
    if (detailQuestion.user_answer_third_rating == 10) {
        myThirdRatings = require('../assets/ratings/10.png');
        myThirdRatingsDigit = 5;
    }

    if (detailQuestion.user_answer_fourth_rating == 1) {
        myFourthRatings = require('../assets/ratings/1.png');
        myFourthRatingsDigit = 0.5;
    }
    if (detailQuestion.user_answer_fourth_rating == 2) {
        myFourthRatings = require('../assets/ratings/2.png');
        myFourthRatingsDigit = 1;
    }
    if (detailQuestion.user_answer_fourth_rating == 3) {
        myFourthRatings = require('../assets/ratings/3.png');
        myFourthRatingsDigit = 1.5;
    }
    if (detailQuestion.user_answer_fourth_rating == 4) {
        myFourthRatings = require('../assets/ratings/4.png');
        myFourthRatingsDigit = 2;
    }
    if (detailQuestion.user_answer_fourth_rating == 5) {
        myFourthRatings = require('../assets/ratings/5.png');
        myFourthRatingsDigit = 2.5;
    }
    if (detailQuestion.user_answer_fourth_rating == 6) {
        myFourthRatings = require('../assets/ratings/6.png');
        myFourthRatingsDigit = 3;
    }
    if (detailQuestion.user_answer_fourth_rating == 7) {
        myFourthRatings = require('../assets/ratings/7.png');
        myFourthRatingsDigit = 3.5;
    }
    if (detailQuestion.user_answer_fourth_rating == 8) {
        myFourthRatings = require('../assets/ratings/8.png');
        myFourthRatingsDigit = 4;
    }
    if (detailQuestion.user_answer_fourth_rating == 9) {
        myFourthRatings = require('../assets/ratings/9.png');
        myFourthRatingsDigit = 4.5;
    }
    if (detailQuestion.user_answer_fourth_rating == 10) {
        myFourthRatings = require('../assets/ratings/10.png');
        myFourthRatingsDigit = 5;
    }

    if (detailQuestion.user_answer_fifth_rating == 1) {
        myFifthRatings = require('../assets/ratings/1.png');
        myFifthOneRatingDigit = 0.5;
    }
    if (detailQuestion.user_answer_fifth_rating == 2) {
        myFifthRatings = require('../assets/ratings/2.png');
        myFifthOneRatingDigit = 1;
    }
    if (detailQuestion.user_answer_fifth_rating == 3) {
        myFifthRatings = require('../assets/ratings/3.png');
        myFifthOneRatingDigit = 1.5;
    }
    if (detailQuestion.user_answer_fifth_rating == 4) {
        myFifthRatings = require('../assets/ratings/4.png');
        myFifthOneRatingDigit = 2;
    }
    if (detailQuestion.user_answer_fifth_rating == 5) {
        myFifthRatings = require('../assets/ratings/5.png');
        myFifthOneRatingDigit = 2.5;
    }
    if (detailQuestion.user_answer_fifth_rating == 6) {
        myFifthRatings = require('../assets/ratings/6.png');
        myFifthOneRatingDigit = 3;
    }
    if (detailQuestion.user_answer_fifth_rating == 7) {
        myFifthRatings = require('../assets/ratings/7.png');
        myFifthOneRatingDigit = 3.5;
    }
    if (detailQuestion.user_answer_fifth_rating == 8) {
        myFifthRatings = require('../assets/ratings/8.png');
        myFifthOneRatingDigit = 4;
    }
    if (detailQuestion.user_answer_fifth_rating == 9) {
        myFifthRatings = require('../assets/ratings/9.png');
        myFifthOneRatingDigit = 4.5;
    }
    if (detailQuestion.user_answer_fifth_rating == 10) {
        myFifthRatings = require('../assets/ratings/10.png');
        myFifthOneRatingDigit = 5;
    }

    if (detailQuestion.user_answer_sixth_rating == 1) {
        myFifthOneRating = require('../assets/ratings/1.png');
        myFifthOneRatingDigit = 0.5;
    }
    if (detailQuestion.user_answer_sixth_rating == 2) {
        myFifthOneRating = require('../assets/ratings/2.png');
        myFifthOneRatingDigit = 1;
    }
    if (detailQuestion.user_answer_sixth_rating == 3) {
        myFifthOneRating = require('../assets/ratings/3.png');
        myFifthOneRatingDigit = 1.5;
    }
    if (detailQuestion.user_answer_sixth_rating == 4) {
        myFifthOneRating = require('../assets/ratings/4.png');
        myFifthOneRatingDigit = 2;
    }
    if (detailQuestion.user_answer_sixth_rating == 5) {
        myFifthOneRating = require('../assets/ratings/5.png');
        myFifthOneRatingDigit = 2.5;
    }
    if (detailQuestion.user_answer_sixth_rating == 6) {
        myFifthOneRating = require('../assets/ratings/6.png');
        myFifthOneRatingDigit = 3;
    }
    if (detailQuestion.user_answer_sixth_rating == 7) {
        myFifthOneRating = require('../assets/ratings/7.png');
        myFifthOneRatingDigit = 3.5;
    }
    if (detailQuestion.user_answer_sixth_rating == 8) {
        myFifthOneRating = require('../assets/ratings/8.png');
        myFifthOneRatingDigit = 4;
    }
    if (detailQuestion.user_answer_sixth_rating == 9) {
        myFifthOneRating = require('../assets/ratings/9.png');
        myFifthOneRatingDigit = 4.5;
    }
    if (detailQuestion.user_answer_sixth_rating == 10) {
        myFifthOneRating = require('../assets/ratings/10.png');
        myFifthOneRatingDigit = 5;
    }

    // console.log("myFifthOneRatingD : " + myFifthOneRating)

    const [status, setStatus] = React.useState({});
    const video = React.useRef(null);

    if (!fontsLoaded)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else {
        return (
            <View style={{ flex: 1 }}>
                {/* {
                    isFullScree == false ? */}
                <View style={{ flex: 1 }}>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                    {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                    <View style={{ marginTop: Constants.statusBarHeight }} />
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Review</Text>
                    </View>
                    <ScrollView style={{ backgroundColor: '#fff' }}>
                        <View style={styles.container}>
                            <View elevation={5} style={styles.infoContainer}>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <MaterialCommunityIcons name="view-grid-plus" size={24} color="#360A65" />
                                    <Text style={{ color: '#360A65', fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 5, marginBottom: 10 }}>Category</Text>
                                </View>
                                <Text style={styles.infoText}>
                                    {detailQuestion.domain_name.replace(/\s{2,}/g, ' ')}
                                </Text>
                                <View
                                    style={{
                                        marginVertical: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                    }}
                                />
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <AntDesign name="unknowfile1" size={24} color="#360A65" />
                                    <Text style={{ color: '#360A65', fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 5, marginBottom: 10 }}>Question</Text>
                                </View>
                                <Text style={styles.infoText}>
                                    {detailQuestion.question}
                                </Text>
                            </View>
                            {/* <View style={styles.categoryBox}>
                                    <Text style={styles.category}>Review</Text>
                                </View> */}
                            {/* <View style={styles.questionBox}>
                                        <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{detailQuestion.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                                    </View>
                                    <View style={styles.questionBox}>
                                        <Text style={{ fontWeight: 'bold' }}>Questions : </Text>
                                        <Text>{detailQuestion.question}</Text>
                                    </View> */}
                            {/* <View style={{width: 400, height: 300}}> */}
                            <View style={styles.videoContainer}>
                                <Video
                                    ref={video}
                                    style={styles.video}
                                    source={{
                                        uri: 'https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/MP4/' + detailQuestion.user_answer_video,
                                    }}
                                    useNativeControls
                                    usePoster
                                    resizeMode={ResizeMode.CONTAIN}
                                    shouldPlay
                                    // isLooping
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                            </View>
                            {/* <VideoPlayer
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
                                    /> */}
                            {/* </View> */}
                            {/* <Video
                            source={{ uri: 'https://fludder.io/admin/uploads/answer_videos/'+detailQuestion.user_answer_video }}
                            useNativeControls
                            resizeMode="cover"
                            style={{ width:400, height: 300 }}
                            shouldPlay
                            // isLooping
                        /> */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                                    <View elevation={5} style={styles.profileContainer}>
                                        <View style={styles.profilePictureStyle}>
                                            <Image
                                                source={require('../assets/FludderButterflyTransperant.png')}
                                                style={{ width: 50, height: 50, borderRadius: 50 }}
                                            />
                                        </View>
                                        <View style={styles.profileTextContainer}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.profileNameText}>
                                                    {/* {formattedName()} */}
                                                    Fludder Pro Review
                                                </Text>
                                            </View>
                                            {/* <Text style={{ color: '#acb5ac', fontFamily: 'Poppins_400Regular', fontSize: 12 }}>{detailQuestion.professional_city}</Text> */}
                                            <Text style={{ color: '#acb5ac', fontFamily: 'Poppins_400Regular', fontSize: 12 }}>{getDateFormatted(detailQuestion.user_answer_created_on)}</Text>
                                            <View
                                                style={{
                                                    marginVertical: 10,
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                                }}
                                            />
                                            <Image
                                                source={
                                                    myRatings
                                                }
                                                style={{ width: 120, height: 30, alignSelf: 'center' }}
                                            />
                                            <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, marginTop: 5 }}>Overall Review: </Text>
                                                <Text style={{ fontSize: 20, fontFamily: 'Poppins_600SemiBold' }}>{ratingDigit}</Text>
                                                <Text style={{ marginTop: 6, fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.otherAnswersContainer}>
                                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: '#360A65' }}>Other Answers</Text>
                                        {otherAnswers.length > 0 ?
                                            otherAnswers.map((item, index) =>
                                                <TouchableOpacity onPress={pressHandler1} key={index}>
                                                    <View style={{
                                                        borderBottomWidth: 0.5,
                                                        borderColor: 'black',
                                                        alignSelf: 'stretch',
                                                        marginVertical: 10
                                                    }} />
                                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12 }}>{item.question}</Text>
                                                </TouchableOpacity>
                                            )
                                            :
                                            <>
                                                <View style={{
                                                    borderBottomWidth: 0.5,
                                                    borderColor: 'black',
                                                    alignSelf: 'stretch',
                                                    margin: 10
                                                }} />
                                                <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12 }}>No more answers found!</Text>
                                            </>
                                        }

                                    </View>
                                    <TouchableOpacity style={styles.allAnswersButton} onPress={pressHandler1}>
                                        <AntDesign name="arrowleft" size={20} color="white" style={{ textAlign: "center", }} />
                                        <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 14, color: 'white' }}>All Answers</Text>
                                    </TouchableOpacity>
                                </View>
                                <View elevation={5} style={styles.reviewSummaryContainer}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#360A65', fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 5, marginBottom: 5 }}>Review Summary</Text>
                                    </View>
                                    <Image
                                        source={
                                            myFirstRatings
                                        }
                                        style={{ width: 120, height: 30, alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Confidence: </Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{myFirstRatingsDigit}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Image
                                        source={
                                            mySecondRatings
                                        }
                                        style={{ width: 120, height: 30, alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Body Language: </Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{mySecondRatingsDigit}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Image
                                        source={
                                            myThirdRatings
                                        }
                                        style={{ width: 120, height: 30, alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Energy & Tone: </Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{myThirdRatingsDigit}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Image
                                        source={
                                            myFourthRatings
                                        }
                                        style={{ width: 120, height: 30, alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Professionalism: </Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{myFourthRatingsDigit}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Image
                                        source={
                                            myFifthRatings
                                        }
                                        style={{ width: 120, height: 30, alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Knowledge: </Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{myFifthRatingsDigit}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 5,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Image
                                        source={
                                            myFifthOneRating
                                        }
                                        style={{ width: 120, height: 30, alignSelf: 'center' }}
                                    />
                                    <View style={{ flexDirection: 'row', textAlign: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 14 }}>Clarity: </Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>{myFifthOneRatingDigit}</Text>
                                        <Text style={{ fontSize: 14, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={{
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
                                    </View> */}
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
                            {/* <Image
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
                                        <TouchableOpacity
                                            style={styles.SkipButtonStyle}
                                            activeOpacity={.5}
                                            onPress={pressHandler1}
                                        >
                                            <Text style={styles.TextStyleNew}> All Answers </Text>
                                        </TouchableOpacity>
                                    </View> */}
                        </View>
                    </ScrollView>
                    <Footer navigation={navigation} />
                </View>
                {/* :
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
                } */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        padding: 20
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
    header: {
        height: '8%',
        backgroundColor: '#360A65',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    },
    headerText: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    infoContainer: {
        width: 350,
        margin: 20,
        // marginTop: 20,
        marginBottom: 0,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        // alignItems: 'center'
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        // fontWeight: 'bold',
        // textAlign: 'center',
        // color: '#360A65'
    },
    iconStyle: {
        borderWidth: 2,
        borderColor: '#F9A132',
        borderRadius: 50,
        padding: 5,
        width: 54,
        marginBottom: 20,
        // marginTop: -50
    },
    video: {
        alignSelf: 'center',
        width: 350,
        height: 200,
        borderRadius: 10,
    },
    videoContainer: {
        margin: 20,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        alignItems: 'center'
    },
    profileContainer: {
        alignSelf: 'flex-start',
        width: 150,
        margin: 10,
        marginLeft: 30,
        marginTop: 35,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
    },
    profilePictureStyle: {
        borderWidth: 2,
        borderColor: '#F9A132',
        borderRadius: 50,
        // padding: 3,
        width: 54,
        // marginBottom: 20,s
        // marginTop: -50,
        marginLeft: -50
    },
    profileTextContainer: {
        marginLeft: 12,
        marginTop: -60
    },
    profileNameText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: 'bold',
        color: '#360A65'
    },
    otherAnswersContainer: {
        alignSelf: 'flex-start',
        width: 150,
        marginVertical: 10,
        marginLeft: 30,
        // marginBottom: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFF2E1',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        alignItems: 'center'
    },
    allAnswersButton: {
        backgroundColor: '#F9A132',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10,
        marginLeft: 30,
        justifyContent: 'center',
        width: 150
    },
    reviewSummaryContainer: {
        width: 180,
        marginTop: 35,
        paddingHorizontal: 20,
        paddingTop: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        // alignItems: 'center'
    }
});