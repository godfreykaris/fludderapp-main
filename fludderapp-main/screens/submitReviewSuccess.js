import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';

export default function SubmitReviewSuccess({ navigation }) {

    // useEffect(() => {
    //     const backAction = () => {
    //         BackHandler.removeEventListener() 
    // };
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    // }, []);


    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const answer = navigation.getParam('answer');
    const reviewText = navigation.getParam('reviewText');
    const firstRating = navigation.getParam('firstRating');
    const secondRating = navigation.getParam('secondRating');
    const thirdRating = navigation.getParam('thirdRating');
    const fourthRating = navigation.getParam('fourthRating');
    const fifthRating = navigation.getParam('fifthRating');
    const fifthOneRating = navigation.getParam('currentRating');
    // console.log("fifthOneRating : "+fifthOneRating)
    // const pressHandler = () => {
    //     navigation.navigate('StudentAnswers');
    // }

    const pressHandler1 = () => {
        // navigation.navigate('AllMyQuestions');
        navigation.navigate('RatingFiveOne', { answer, reviewText, firstRating, secondRating, thirdRating, fourthRating, fifthRating, fifthOneRating });
    }
    let myFirstRatings;
    let mySecondRatings;
    let myThirdRatings;
    let myFourthRatings;
    let myFifthRatings;
    let myFifthOneRating;

    if (firstRating == 1)
        myFirstRatings = require('../assets/ratings/1.png');
    if (firstRating == 2)
        myFirstRatings = require('../assets/ratings/2.png');
    if (firstRating == 3)
        myFirstRatings = require('../assets/ratings/3.png');
    if (firstRating == 4)
        myFirstRatings = require('../assets/ratings/4.png');
    if (firstRating == 5)
        myFirstRatings = require('../assets/ratings/5.png');
    if (firstRating == 6)
        myFirstRatings = require('../assets/ratings/6.png');
    if (firstRating == 7)
        myFirstRatings = require('../assets/ratings/7.png');
    if (firstRating == 8)
        myFirstRatings = require('../assets/ratings/8.png');
    if (firstRating == 9)
        myFirstRatings = require('../assets/ratings/9.png');
    if (firstRating == 10)
        myFirstRatings = require('../assets/ratings/10.png');

    if (secondRating == 1)
        mySecondRatings = require('../assets/ratings/1.png');
    if (secondRating == 2)
        mySecondRatings = require('../assets/ratings/2.png');
    if (secondRating == 3)
        mySecondRatings = require('../assets/ratings/3.png');
    if (secondRating == 4)
        mySecondRatings = require('../assets/ratings/4.png');
    if (secondRating == 5)
        mySecondRatings = require('../assets/ratings/5.png');
    if (secondRating == 6)
        mySecondRatings = require('../assets/ratings/6.png');
    if (secondRating == 7)
        mySecondRatings = require('../assets/ratings/7.png');
    if (secondRating == 8)
        mySecondRatings = require('../assets/ratings/8.png');
    if (secondRating == 9)
        mySecondRatings = require('../assets/ratings/9.png');
    if (secondRating == 10)
        mySecondRatings = require('../assets/ratings/10.png');

    if (thirdRating == 1)
        myThirdRatings = require('../assets/ratings/1.png');
    if (thirdRating == 2)
        myThirdRatings = require('../assets/ratings/2.png');
    if (thirdRating == 3)
        myThirdRatings = require('../assets/ratings/3.png');
    if (thirdRating == 4)
        myThirdRatings = require('../assets/ratings/4.png');
    if (thirdRating == 5)
        myThirdRatings = require('../assets/ratings/5.png');
    if (thirdRating == 6)
        myThirdRatings = require('../assets/ratings/6.png');
    if (thirdRating == 7)
        myThirdRatings = require('../assets/ratings/7.png');
    if (thirdRating == 8)
        myThirdRatings = require('../assets/ratings/8.png');
    if (thirdRating == 9)
        myThirdRatings = require('../assets/ratings/9.png');
    if (thirdRating == 10)
        myThirdRatings = require('../assets/ratings/10.png');

    if (fourthRating == 1)
        myFourthRatings = require('../assets/ratings/1.png');
    if (fourthRating == 2)
        myFourthRatings = require('../assets/ratings/2.png');
    if (fourthRating == 3)
        myFourthRatings = require('../assets/ratings/3.png');
    if (fourthRating == 4)
        myFourthRatings = require('../assets/ratings/4.png');
    if (fourthRating == 5)
        myFourthRatings = require('../assets/ratings/5.png');
    if (fourthRating == 6)
        myFourthRatings = require('../assets/ratings/6.png');
    if (fourthRating == 7)
        myFourthRatings = require('../assets/ratings/7.png');
    if (fourthRating == 8)
        myFourthRatings = require('../assets/ratings/8.png');
    if (fourthRating == 9)
        myFourthRatings = require('../assets/ratings/9.png');
    if (fourthRating == 10)
        myFourthRatings = require('../assets/ratings/10.png');

    if (fifthRating == 1)
        myFifthRatings = require('../assets/ratings/1.png');
    if (fifthRating == 2)
        myFifthRatings = require('../assets/ratings/2.png');
    if (fifthRating == 3)
        myFifthRatings = require('../assets/ratings/3.png');
    if (fifthRating == 4)
        myFifthRatings = require('../assets/ratings/4.png');
    if (fifthRating == 5)
        myFifthRatings = require('../assets/ratings/5.png');
    if (fifthRating == 6)
        myFifthRatings = require('../assets/ratings/6.png');
    if (fifthRating == 7)
        myFifthRatings = require('../assets/ratings/7.png');
    if (fifthRating == 8)
        myFifthRatings = require('../assets/ratings/8.png');
    if (fifthRating == 9)
        myFifthRatings = require('../assets/ratings/9.png');
    if (fifthRating == 10)
        myFifthRatings = require('../assets/ratings/10.png');

    if (fifthOneRating == 1)
        myFifthOneRating = require('../assets/ratings/1.png');
    if (fifthOneRating == 2)
        myFifthOneRating = require('../assets/ratings/2.png');
    if (fifthOneRating == 3)
        myFifthOneRating = require('../assets/ratings/3.png');
    if (fifthOneRating == 4)
        myFifthOneRating = require('../assets/ratings/4.png');
    if (fifthOneRating == 5)
        myFifthOneRating = require('../assets/ratings/5.png');
    if (fifthOneRating == 6)
        myFifthOneRating = require('../assets/ratings/6.png');
    if (fifthOneRating == 7)
        myFifthOneRating = require('../assets/ratings/7.png');
    if (fifthOneRating == 8)
        myFifthOneRating = require('../assets/ratings/8.png');
    if (fifthOneRating == 9)
        myFifthOneRating = require('../assets/ratings/9.png');
    if (fifthOneRating == 10)
        myFifthOneRating = require('../assets/ratings/10.png');

    console.log("myFifthOneRatingD : " + myFifthOneRating)

    let ratings = '';

    const getRatings = () => {
        let ratingSum = +firstRating +
            +secondRating +
            +thirdRating +
            +fourthRating +
            +fifthRating +
            +fifthOneRating;

        if (ratingSum < 1)
            ratings = require('../assets/ratings/0.png');
        else if (ratingSum >= 1 && ratingSum <= 6)
            ratings = require('../assets/ratings/1.png');
        else if (ratingSum >= 7 && ratingSum <= 12)
            ratings = require('../assets/ratings/2.png');
        else if (ratingSum >= 13 && ratingSum <= 18)
            ratings = require('../assets/ratings/3.png');
        else if (ratingSum >= 19 && ratingSum <= 24)
            ratings = require('../assets/ratings/4.png');
        else if (ratingSum >= 25 && ratingSum <= 30)
            ratings = require('../assets/ratings/5.png');
        else if (ratingSum >= 31 && ratingSum <= 36)
            ratings = require('../assets/ratings/6.png');
        else if (ratingSum >= 37 && ratingSum <= 42)
            ratings = require('../assets/ratings/7.png');
        else if (ratingSum >= 43 && ratingSum <= 48)
            ratings = require('../assets/ratings/8.png');
        else if (ratingSum >= 49 && ratingSum <= 54)
            ratings = require('../assets/ratings/9.png');
        else if (ratingSum > 54)
            ratings = require('../assets/ratings/10.png');
        return ratings;
    }

    let myRatings = getRatings();

    let uId;
    let userId;
    // const pressHandler5 = async () => {
    //     userId = await AsyncStorage.getItem('professionalId') 
    // }

    // uId = pressHandler5();

    // console.log(uId);

    const pressHandler = async () => {
        userId = await AsyncStorage.getItem('professionalId')
        setLoading(true)
        fetch(baseUrl + 'addReview', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_answer_and_review_id: answer.user_answer_and_review_id,
                professional_id: userId,
                user_answer_text_review: reviewText,
                user_answer_first_rating: firstRating,
                user_answer_second_rating: secondRating,
                user_answer_third_rating: thirdRating,
                user_answer_fourth_rating: fourthRating,
                user_answer_fifth_rating: fifthRating,
                user_answer_sixth_rating: fifthOneRating
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                // onSubmitProps.resetForm();
                // navigation.navigate('SubmitReviewSuccess', {answer, reviewText, firstRating, secondRating, thirdRating, fourthRating, fifthRating});
                setLoading(false)
                setModalVisible(!modalVisible);
                // alert("Your review & ratings has been uploaded successfully.")
                // navigation.navigate('StudentAnswers');
            });
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.categoryBox}>
                        <Text style={styles.category}>Review Summary</Text>
                    </View>
                    {
                        loading ?
                            <Spinner
                                //visibility of Overlay Loading Spinner
                                visible={loading}
                                //Text with the Spinner
                                textContent={'Submitting your review...'}
                                //Text style of the Spinner Text
                                textStyle={{ color: '#FFF' }}
                            />
                            :
                            null
                    }
                    <View style={styles.questionBox}>
                        <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{answer.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                    </View>
                    <View style={styles.questionBox}>
                        {/* <Text style={{fontWeight: 'bold'}}>Question : </Text> */}
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>{answer.question}</Text>
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
                    {/* <Image source={require('../assets/right-sign-icon.png')} style = {{height: 80, width:80, resizeMode : 'stretch', marginTop:20 }} /> */}
                    <View style={styles.questionBox}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Overall Rating</Text>
                    </View>
                    <Image
                        source={
                            myRatings
                        }
                        style={{ width: 250, height: 48 }}
                    />
                    <Text style={{ padding: 10, fontSize: 18, textAlign: 'center' }}> Thank you for your review and ratings. </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.SignUpButtonStyle}
                            activeOpacity={.5}
                            onPress={pressHandler1}
                        >
                            <Text style={styles.BackTextStyle}> Back </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.SignUpButtonStyle}
                            activeOpacity={.5}
                            onPress={pressHandler}
                        >
                            {/* <Image source={require('../assets/Submit-Next-Review.png')} style = {{height: 40, width:190, resizeMode : 'stretch', marginHorizontal: 10 }} /> */}
                            <Text style={styles.TextStyle}> Submit Review </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                        // style={styles.SignUpButtonStyle}
                        activeOpacity = { .5 }
                        onPress={ pressHandler1 }
                    >
                        <Image source={require('../assets/View-All-Review-Button.png')} style = {{height: 40, width:190, resizeMode : 'stretch', marginTop:230, marginHorizontal: 10 }} />
                    </TouchableOpacity> */}
                    </View>
                </View>
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
                                <Text style={styles.modalText}>Your review & ratings have been uploaded successfully.</Text>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                        navigation.push('StudentAnswers');
                                    }}>
                                    <Text style={styles.textStyle}>Okay</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    SignUpButtonStyle: {
        margin: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#37266b', // Blue
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        textAlign: 'center',
        paddingHorizontal: 25,
        color: '#fff',
        fontSize: 17
    },
    BackTextStyle: {
        textAlign: 'center',
        paddingHorizontal: 60,
        color: '#fff',
        fontSize: 17
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
        marginLeft: 20
    },
    RatingBox: {
        alignSelf: 'stretch',
        marginLeft: 10,
        flexDirection: 'row',
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
        elevation: 10,
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