import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Footer from '../components/footer';
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants';

export default function CameraOptions({ navigation }) {
    const userType = navigation.getParam('userType');
    const userId = navigation.getParam('userId');
    function deleteProfilePicture(userType, userId) {
        fetch(baseUrl + 'deleteProfilePicture', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userType: userType,
                userId: userId
            }),
        })
            .then((response) => response.json())
            .then((json) => {

            });
    }
    let flag;
    const pressHandler = () => {
        flag = 'C';
        navigation.push('EditProfilePicture', { userType, userId, flag });
    }
    const pressHandler1 = () => {
        flag = 'G';
        navigation.push('EditProfilePicture', { userType, userId, flag });
    }
    const pressHandler2 = () => {
        deleteProfilePicture(userType, userId);
        if (userType === 'P')
            navigation.push('ProfessionalProfile', { userType, userId });
        else
            navigation.push('UserProfile', { userType, userId });
    }
    const pressHandler3 = () => {
        if (userType === 'P')
            navigation.push('ProfessionalProfile', { userType, userId });
        else
            navigation.push('UserProfile', { userType, userId });
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <View style={styles.container}>
                <View style={styles.categoryBox}>
                    <Text style={styles.category}>Profile Picture</Text>
                </View>
                <Text style={{ marginBottom: "5%", fontSize: 16, color: '#37266b' }}>
                    Choose an option below for profile picture
                </Text>
                <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={pressHandler}
                >
                    <Text style={styles.TextStyle}> Camera </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={pressHandler1}
                >
                    <Text style={styles.TextStyle}> Gallery </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={pressHandler2}
                >
                    <Text style={styles.TextStyle}> Remove </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.SignUpButtonStyle}
                    activeOpacity={.5}
                    onPress={pressHandler3}
                >
                    <Text style={styles.TextStyle}> Cancel </Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    categoryBox: {
        margin: "1%",
        padding: "2.5%",
        alignSelf: 'stretch',
        backgroundColor: '#f7901f',
        borderRadius: 20,
        marginTop: "1.5%",
        marginBottom: "30%"
    },
    category: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    welcome: {
        fontWeight: 'bold',
        color: '#37266b',
        fontSize: 22,
        textAlign: "center",
        marginVertical: "6%"
    },
    imageBox: {
        width: 370,
        resizeMode: "cover",
        justifyContent: "flex-end",
        height: 150,
        margin: "1%",
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 10
    },
    text: {
        color: "#37266b",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)"
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
});