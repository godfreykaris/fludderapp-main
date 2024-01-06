import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/footer';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export default function SubmitQuestionSuccess({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('AddQuestion');
    }

    const pressHandler1 = () => {
        navigation.navigate('AllMyQuestions');
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <View style={styles.container}>
                <Image source={require('../assets/right-sign-icon.png')} style={{ height: 80, width: 80, resizeMode: 'stretch', marginTop: 100 }} />
                <Text style={{ padding: 10, fontSize: 18, textAlign: 'center', margin: 20 }}> The question has been sent to the Admin for approval. </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        // style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={pressHandler}
                    >
                        <Image source={require('../assets/Add-Next-Question-Button.png')} style={{ height: 40, width: 190, resizeMode: 'stretch', marginTop: 230, marginHorizontal: '1%' }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        // style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={pressHandler1}
                    >
                        <Image source={require('../assets/View-All-Question-Button.png')} style={{ height: 40, width: 190, resizeMode: 'stretch', marginTop: 230, marginHorizontal: '1%' }} />
                    </TouchableOpacity>
                </View>
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
        marginTop: 250,
        marginHorizontal: 40,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f7901f', // Blue
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 10
    },
});