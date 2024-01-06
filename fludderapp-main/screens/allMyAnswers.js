import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/footer';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function allMyAnswers({ navigation }) {

    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
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
    if (!fontsLoaded && loading)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else
        return (
            <View style={{ flex: 1, }}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                <View style={{ marginTop: Constants.statusBarHeight }} />

                <View style={styles.container}>
                    {/* <View style={styles.categoryBox1}>
                    <Text style={styles.category1}>Your Answers</Text>
                </View> */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Your Answers</Text>
                    </View>
                    <SearchInput
                        onChangeText={(term) => { searchUpdated(term) }}
                        style={styles.categoryBox}
                        placeholder="Type a question to search"
                        clearIcon={state.searchTerm !== '' && <MaterialIcons name="clear" size={18} color="gray" />}
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
                                        // <View style={{ alignSelf: 'stretch', marginVertical: 5 }} key={index}>
                                        //     <View style={styles.questionBoxHeader}>
                                        //         <Text style={{ color: 'white' }}>{getDateFormatted(item.user_answer_created_on)}</Text>
                                        //         <Text style={{ color: 'white', flex: 1, textAlign: 'right' }}>{item.user_answer_text_review == null ? <Text>Review Pending</Text> : <Text>Reviewed by: {getName(item.professional_name)}</Text>}</Text>
                                        //     </View>
                                        //     <TouchableOpacity
                                        //         activeOpacity={.5}
                                        //         key={item.user_answer_and_review_id}
                                        //         onPress={item.user_answer_text_review == null ? () => pressHandler1(item) : () => pressHandler(item)}
                                        //     >
                                        //         <View style={styles.questionBox}>
                                        //             <Text style={{ flex: 1 }}>{item.question}</Text>
                                        //             <Image source={item.user_answer_text_review == null ? require('../assets/01-Hourglass-Orange.png') : require('../assets/Right-Tick-Green-Icon.png')} style={styles.questionBoxIcon} />
                                        //         </View>
                                        //     </TouchableOpacity>
                                        // </View>
                                        <TouchableOpacity
                                            activeOpacity={.5}
                                            key={item.user_answer_and_review_id}
                                            onPress={item.user_answer_text_review == null ? () => pressHandler1(item) : () => pressHandler(item)}
                                        >
                                            <View style={styles.firstCategory}>
                                                <View style={{ backgroundColor: 'white', alignItems: 'flex-end', borderRadius: 50 }}>
                                                    <View style={item.user_answer_text_review == null ? styles.dateTextOrange : styles.dateTextGreen}>
                                                        <Text style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
                                                            {getDateFormatted(item.user_answer_created_on)}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {/* <Image
                                                    source={{ uri: "https://fludder.io/admin/uploads/domain_images/firstCategory3.jpg" }}
                                                    style={{ width: 100, height: 100, alignSelf: 'flex-start', borderRadius: 100, marginLeft: 10 }}
                                                /> */}
                                                    <ImageBackground
                                                        imageStyle={{ borderRadius: 100 }}
                                                        source={{ uri: "https://videocompressionoutputbucket.s3.us-east-2.amazonaws.com/assets/ddd/Thumbnails/" + item.user_answer_video.substr(0, item.user_answer_video.lastIndexOf(".")) + ".0000000.jpg" }}
                                                        style={{ width: 100, height: 100, alignSelf: 'flex-start', marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}
                                                    >
                                                        <AntDesign name="playcircleo" size={24} color="white" />
                                                    </ImageBackground>
                                                    <View style={styles.firstCategoryTextView}>
                                                        <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 10 }}>{item.question}</Text>
                                                        <View
                                                            style={{
                                                                marginVertical: 10,
                                                                borderBottomColor: 'black',
                                                                borderBottomWidth: StyleSheet.hairlineWidth,
                                                            }}
                                                        />
                                                        <View style={{ flexDirection: 'row' }}>
                                                            {
                                                                item.user_answer_text_review == null ?
                                                                    <>
                                                                        <AntDesign name="exclamationcircle" size={24} color="#F9A132" />
                                                                        <Text style={{ fontFamily: 'Poppins_600SemiBold', marginTop: 2, marginLeft: 5, color: '#360A65' }}>Review Pending...</Text>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Feather name="check-circle" size={24} color="green" />
                                                                        <Text style={{ fontFamily: 'Poppins_600SemiBold', marginTop: 2, marginLeft: 5, color: '#360A65' }}>Reviewed by: {getName(item.professional_name)}</Text>
                                                                    </>
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                :
                                <View>
                                    <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'gray', fontSize: 20, marginTop: '50%' }}>
                                        You haven’t answered any questions yet.
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
        margin: 20,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#00000014',
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
    firstCategory: {
        marginHorizontal: 20,
        marginVertical: 10,
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
    firstCategoryTextView: {
        width: 250,
        padding: 10
    },
    dateTextGreen: {
        backgroundColor: '#EBFFF0',
        borderTopEndRadius: 10,
        fontFamily: 'Poppins_400Regular'
    },
    dateTextOrange: {
        backgroundColor: '#FFF2E1',
        borderTopEndRadius: 10,
        fontFamily: 'Poppins_400Regular'
    }
});