import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/footer';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export default function recordAnswerFive({ navigation }) {

    const domain = navigation.getParam('domain');
    const pressHandler = () => {
        navigation.push('Questions', { domain });
        // console.log("Ddddddddddd Record next answerDddddddddddd");
    }

    const pressHandler1 = () => {
        navigation.navigate('AllMyAnswers');
    }
    let Image_Http_URL = require('../assets/fLogo.jpg');

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <View style={styles.container}>
                <View style={styles.categoryBox}>
                    <Text style={styles.category}>Your Answer Is Recorded</Text>
                </View>
                <Image source={require('../assets/Fludder-Logo-Transparant.png')} style={{ height: '10%', width: '70%', resizeMode: 'stretch', margin: 10, marginBottom: 30, marginTop: 10 }} />
                <Image source={require('../assets/right-sign-icon.png')} style={{ height: 80, width: 80, resizeMode: 'stretch', marginTop: 70 }} />
                <Text style={{ padding: 10, fontSize: 18, marginBottom: 20 }}>Thank you for uploading your answer</Text>
                <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={pressHandler}
                >
                    <Text style={styles.TextStyle}> Record Next Answer </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={pressHandler1}
                >
                    <Text style={styles.ViewAllAnswersTextStyle}> View All Answers </Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 10,
        //   marginHorizontal: 40,
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
        paddingHorizontal: 10,
        fontSize: 17
    },
    ViewAllAnswersTextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 10,
        fontSize: 17,
        paddingHorizontal: 20,
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
});