import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import {
    StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal,
    TouchableHighlight
} from 'react-native';
import Footer from '../components/footer';
import Constants from 'expo-constants';

export default function RatingTwo({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const answer = navigation.getParam('answer');
    const reviewText = navigation.getParam('reviewText');
    const firstRating = navigation.getParam('currentRating');

    const pressHandler = (secondRating) => {
        setCurrentRating(secondRating);
    }
    const pressHandler1 = () => {
        navigation.navigate('RatingOne', { answer, reviewText });
    }
    const pressHandler2 = () => {
        if (currentRating > 0)
            navigation.navigate('RatingThree', { answer, reviewText, firstRating, currentRating });
        else
            setModalVisible(!modalVisible);
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.categoryBox}>
                        <Text style={styles.category}>Review</Text>
                    </View>
                    <View style={styles.questionBox}>
                        <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Category : </Text>
                        <Text style={{ fontSize: 19 }}>{answer.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>Question </Text>
                    </View>
                    <View style={styles.questionBox}>
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>{answer.question}</Text>
                    </View>
                    <View style={styles.questionBox}>
                        <Text style={{ fontSize: 22 }}>Rate for <Text style={{ fontWeight: 'bold' }}>Body Language</Text></Text>
                    </View>
                    <View>
                        <Text style={styles.fludderTipText}>Fludder tip: Was the individual’s body language professional and non-distracting?</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 50 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            Below Average
                        </Text>
                        <Text style={{ marginHorizontal: 60, fontWeight: "bold" }}>
                            Average
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                            Above Average
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(1)}
                        >
                            <Image source={currentRating >= 1 ? require('../assets/01-Fludder-Reating-Block-Orange.jpg') : require('../assets/01-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(2)}
                        >
                            <Image source={currentRating >= 2 ? require('../assets/02-Fludder-Reating-Block-Orange.jpg') : require('../assets/02-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(3)}
                        >
                            <Image source={currentRating >= 3 ? require('../assets/03-Fludder-Reating-Block-Orange.jpg') : require('../assets/03-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(4)}
                        >
                            <Image source={currentRating >= 4 ? require('../assets/04-Fludder-Reating-Block-Orange.jpg') : require('../assets/04-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(5)}
                        >
                            <Image source={currentRating >= 5 ? require('../assets/05-Fludder-Reating-Block-Orange.jpg') : require('../assets/05-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(6)}
                        >
                            <Image source={currentRating >= 6 ? require('../assets/06-Fludder-Reating-Block-Orange.jpg') : require('../assets/06-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(7)}
                        >
                            <Image source={currentRating >= 7 ? require('../assets/07-Fludder-Reating-Block-Orange.jpg') : require('../assets/07-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(8)}
                        >
                            <Image source={currentRating >= 8 ? require('../assets/08-Fludder-Reating-Block-Orange.jpg') : require('../assets/08-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(9)}
                        >
                            <Image source={currentRating >= 9 ? require('../assets/09-Fludder-Reating-Block-Orange.jpg') : require('../assets/09-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 3, }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => pressHandler(10)}
                        >
                            <Image source={currentRating >= 10 ? require('../assets/10-Fludder-Reating-Block-Orange.jpg') : require('../assets/10-Fludder-Reating-Block.jpg')} style={{ height: 30, width: 30, resizeMode: 'stretch', margin: 4, marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.SkipButtonStyle}
                            activeOpacity={.5}
                            onPress={pressHandler1}
                        >
                            <Text style={styles.NextAndBackTextStyle}> Back </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.SkipButtonStyle}
                            activeOpacity={.5}
                            onPress={pressHandler2}
                        >
                            <Text style={styles.NextAndBackTextStyle}> Next </Text>
                        </TouchableOpacity>
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
                                <Text style={styles.modalText}>Please select the rating!</Text>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
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
        alignItems: "center"
    },
    questionBox: {
        margin: 5,
        padding: 10,
        // alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    BodyLanguageQuestionBox: {
        margin: 5,
        padding: 10,
        // alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 10
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
    categoryName: {
        fontWeight: 'bold',
    },
    SkipButtonStyle: {
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#37266b',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        margin: 10
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 50
    },
    NextAndBackTextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingHorizontal: 25,
        color: '#fff',
        fontSize: 17
    },
    fludderTipText: {
        color: '#f7901f',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    tipText: {
        textAlign: 'center'
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