import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/footer';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';

export default function allMyAnswers({ navigation }) {

    const KEYS_TO_FILTERS = ['question'];
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({ searchTerm: '' });

    const [allMyAnswers, setAllMyAnswers] = useState([]);
    const pressHandler = (detailQuestion) => {
        navigation.navigate('Review', { detailQuestion });
    }
    const pressHandler1 = (detailQuestion) => {
        navigation.navigate('PendingReview', { detailQuestion });
    }
    // const d = uId();
    let userId;
    useEffect(() => {
        setLoading(true)
        const getAllAnswers = async () => {
            userId = await AsyncStorage.getItem('userInformationId')
            console.log("userId : ", userId);
            fetch(baseUrl + 'getAllMyAnswers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userInformationId: userId,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    // if(json) {
                    // alert("No answers available")
                    // navigation.navigate('Categories');
                    // } 
                    // else
                    setAllMyAnswers(json);
                    setLoading(false)
                });

        }
        getAllAnswers();
    }, []);
    function getDateFormatted(myDate) {
        let dDate = myDate.split(' ');
        let d = new Date(dDate[0]);
        let dd = d.toString().split(' ');
        return dd[1] + " " + dd[2] + " " + dd[3];
    }

    function searchUpdated(term) {
        setState({ searchTerm: term })
    }

    function getName(name) {
        if (name) {
            let firstName = name.split(' ');
            if (firstName.length > 1)
                return firstName[0] + " " + firstName[1].charAt(0);
            else
                return firstName[0];
        }
        else
            return "";
    }

    const filteredQuestions = allMyAnswers.filter(createFilter(state.searchTerm, KEYS_TO_FILTERS))

    return (
        <View style={{ flex: 1, }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
            <View style={{ backgroundColor: '#ffffff', height: 34 }} />

            <View style={styles.container}>
                <View style={styles.categoryBox1}>
                    <Text style={styles.category1}>Your Answers</Text>
                </View>
                <SearchInput
                    onChangeText={(term) => { searchUpdated(term) }}
                    style={styles.categoryBox}
                    placeholder="Type a question to search"
                />
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    {
                        loading ?
                            <Spinner
                                //visibility of Overlay Loading Spinner
                                visible={loading}
                                //Text with the Spinner
                                textContent={'Loading your answers...'}
                                //Text style of the Spinner Text
                                textStyle={{ color: '#FFF' }}
                            />
                            :
                            null
                    }
                    {
                        filteredQuestions.length > 0 ?
                            <View>
                                {filteredQuestions.map((item, index, array) =>
                                    <View style={{ alignSelf: 'stretch', marginVertical: 5 }} key={index}>
                                        <View style={styles.questionBoxHeader}>
                                            <Text style={{ color: 'white' }}>{getDateFormatted(item.user_answer_created_on)}</Text>
                                            <Text style={{ color: 'white', flex: 1, textAlign: 'right' }}>{item.user_answer_text_review == null ? <Text>Review Pending</Text> : <Text>Reviewed by: {getName(item.professional_name)}</Text>}</Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={.5}
                                            key={item.user_answer_and_review_id}
                                            onPress={item.user_answer_text_review == null ? () => pressHandler1(item) : () => pressHandler(item)}
                                        >
                                            <View style={styles.questionBox}>
                                                <Text style={{ flex: 1 }}>{item.question}</Text>
                                                <Image source={item.user_answer_text_review == null ? require('../assets/01-Hourglass-Orange.png') : require('../assets/Right-Tick-Green-Icon.png')} style={styles.questionBoxIcon} />
                                            </View>
                                        </TouchableOpacity>
                                        {/* <View>
                                        <Text>{index<allMyAnswers.length-1 && allMyAnswers[index+1].professional_name!=null ? <Text>{allMyAnswers[index+1].professional_name}</Text> : <Text>Ddddd</Text>}</Text>
                                    </View> */}
                                    </View>
                                )}
                            </View>
                            :
                            <View>
                                <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'gray', fontSize: 20, marginTop: '50%' }}>
                                    No more answers to review!
                                </Text>
                            </View>
                    }
                </ScrollView>
            </View>

            <Footer navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //   alignItems: "center",
        justifyContent: 'flex-start'
    },
    questionBox: {
        marginHorizontal: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f6f6f6',
        borderRadius: 5,
        borderColor: '#f7901f',
        borderWidth: 1,
        flexDirection: 'row',
        flex: 1
    },
    questionBoxHeader: {
        marginHorizontal: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#37266b',
        borderRadius: 5,
        flexDirection: 'row',
    },
    categoryBox: {
        margin: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f6f6f6',
        borderRadius: 20,
        flexDirection: 'row',
        marginTop: 10
    },
    category: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    categoryBox1: {
        margin: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f7901f',
        borderRadius: 20,
        marginTop: 10
    },
    category1: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    searchIcon: {
        paddingLeft: 200
    },
    questionBoxIcon: {
        height: 20,
        width: 18,
        resizeMode: 'contain',
        // position: 'absolute', 
        right: 0,
        margin: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    }
});