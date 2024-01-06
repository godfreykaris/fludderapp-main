import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';
import Footer from '../components/footer';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

export default function selectAction({ navigation }) {

    const domain = navigation.getParam('domain');
    const professionalName = navigation.getParam('professionalName');
    const professionalHRFlag = navigation.getParam('professionalHRFlag');

    const pressHandler = () => {
        navigation.navigate('StudentAnswers', { domain });
    }

    const pressHandler1 = () => {
        navigation.navigate('AddQuestion', { domain });
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                <View style={{ marginTop: Constants.statusBarHeight }} />
                <View style={styles.categoryBox}>
                    <Text style={styles.category}>Home</Text>
                </View>
                <Text style={styles.welcome}>Welcome {professionalName}</Text>
                <Text style={{ marginBottom: "10%", fontSize: 25, fontWeight: 'bold', color: '#f7901f' }}>{domain.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                <Text style={{ marginBottom: "5%", fontSize: 16, color: '#37266b' }}>
                    Choose an option below to start earning
                </Text>
                {/* <TouchableOpacity
                style={{margin: 20}}
                activeOpacity = { .5 }
                onPress={ pressHandler1 }
            >
                <Image source={require('../assets/Add-New-Question-Button.jpg')} style = {styles.imageBox} />
            </TouchableOpacity> */}
                {
                    professionalHRFlag == 'Y' ?
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={pressHandler1}
                        >
                            <ImageBackground source={require('../assets/add-new-question-button.jpg')} style={styles.imageBox}>
                                <Text style={styles.text}>Submit Interview Questions</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        :
                        null
                }
                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={pressHandler}
                >
                    <ImageBackground source={require('../assets/Review-Answers.jpg')} style={styles.imageBox}>
                        <Text style={styles.text}>Review Interview Answers</Text>
                    </ImageBackground>
                </TouchableOpacity>
                {/* <TouchableOpacity
                style={{margin: 20}}
                activeOpacity = { .5 }
                onPress={ pressHandler }
            >
                <Image source={require('../assets/Review-Answers.jpg')} style = {styles.imageBox} />
            </TouchableOpacity> */}
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
        //   justifyContent: 'center',
    },
    categoryBox: {
        margin: "1%",
        padding: "2.5%",
        alignSelf: 'stretch',
        backgroundColor: '#f7901f',
        borderRadius: 20,
        marginTop: "1.5%"
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
});