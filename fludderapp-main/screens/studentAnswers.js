import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/footer';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
// import { FlatList } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

export default function studentAnswers({ navigation }) {

    const KEYS_TO_FILTERS = ['question'];

    const [state, setState] = useState({ searchTerm: '' });
    const [loading, setLoading] = useState(false);

    const domain = navigation.getParam('domain');

    const [allMyStudentAnswers, setAllMyStudentAnswers] = useState([]);

    const pressHandler = (answer) => {
        navigation.navigate('SubmitReview', { answer });
    }

    let professionalId;
    let passJson;
    useEffect(() => {
        setLoading(false)
        const getAllStudentAnswers = async () => {
            professionalId = await AsyncStorage.getItem('professionalId')
            // console.log("DDddDD",domain)
            if (domain) {
                passJson = {
                    professionalId: professionalId,
                    domainId: domain.domain_id
                }
            }
            else {
                passJson = {
                    professionalId: professionalId,
                }
            }
            // console.log("DDddDD",passJson)
            fetch(baseUrl + 'getAllMyStudentAnswers', {
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
                    // if(json) {
                    //     alert("No answers available for review.")
                    //     navigation.navigate('Categories');
                    // } 
                    // else
                    setAllMyStudentAnswers(json);
                    setLoading(false)
                });
        }
        getAllStudentAnswers();
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
            return firstName[0] + " " + firstName[1].charAt(0);
        }
        else
            return "";
    }

    const filteredQuestions = allMyStudentAnswers.filter(createFilter(state.searchTerm, KEYS_TO_FILTERS))
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <View style={styles.container}>
                <View style={styles.categoryBoxHeading}>
                    <Text style={styles.categoryHeading}>Review Answers</Text>
                    <Text style={{ textAlign: 'center', fontSize: 12, color: '#37266b' }}>Select a question to review</Text>
                </View>
                <SearchInput
                    onChangeText={(term) => { searchUpdated(term) }}
                    style={styles.categoryBox}
                    placeholder="Type a question to search"
                />
                {
                    loading ?
                        <Spinner
                            //visibility of Overlay Loading Spinner
                            visible={loading}
                            //Text with the Spinner
                            textContent={'Loading answers to review...'}
                            //Text style of the Spinner Text
                            textStyle={{ color: '#FFF' }}
                        />
                        :
                        null
                }
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    {
                        filteredQuestions.length > 0 ?
                            <View>
                                {filteredQuestions.map((item, index, array) =>
                                    <View style={{ alignSelf: 'stretch', marginVertical: 5 }} key={item.user_answer_and_review_id}>
                                        <View style={styles.questionBoxHeader}>
                                            <Text style={{ color: 'white' }}>{getDateFormatted(item.user_answer_created_on)}</Text>
                                            <Text style={{ color: 'white', flex: 1, textAlign: 'right' }}>Answered by: {getName(item.user_name)}</Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={.5}
                                            onPress={() => pressHandler(item)}
                                        >
                                            <View style={styles.questionBox}>
                                                <Text style={{ flex: 1 }}>{item.question}{"\n\n"}<Text style={{ color: 'gray' }}>{item.domain_name.replace(/\s{2,}/g, ' ')}</Text></Text>
                                                <Image source={require('../assets/Green-Arrow.png')} style={styles.questionBoxIcon} />
                                            </View>
                                        </TouchableOpacity>
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
                {/* <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Answered by: Mandy Smith</Text>
                    </View>
                    <View style={styles.questionBox}> 
                    <Text style={{flex: 1}}>Where do you see yourself in next 5 years?{"\n\n"}<Text style= {{color: 'gray'}}>Accounting</Text></Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler }
                        >
                            <Image source={require('../assets/play-icon-green.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>
                    </View>
                </View> */}
                {/* <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Answered by: Mandy Smith</Text>
                    </View>
                    <View style={styles.questionBox}> 
                        <Text style={{flex: 1}}>Tell us about yourself</Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler }
                        >
                            <Image source={require('../assets/hourglass-icon.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>    
                    </View>
                </View>
                <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Answered by: Mandy Smith</Text>
                    </View>    
                    <View style={styles.questionBox}>
                        <Text style={{flex: 1}}>Where do you see yourself in next 5 years?</Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler }
                        >
                            <Image source={require('../assets/hourglass-icon.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Answered by: Mandy Smith</Text>
                    </View>    
                    <View style={styles.questionBox}> 
                        <Text style={{flex: 1}}>Tell us about any mentors or advisors who has positively influenced you.</Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler }
                        >
                            <Image source={require('../assets/play-icon-green.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>    
                    </View>
                </View>
                <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Answered by: Mandy Smith</Text>
                    </View>    
                    <View style={styles.questionBox}> 
                        <Text style={{flex: 1}}>What subjects did you enjoyed the most at school?</Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler }
                        >
                            <Image source={require('../assets/hourglass-icon.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>
                    </View>
                </View> */}
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
    categoryBoxHeading: {
        margin: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f7901f',
        borderRadius: 20,
        marginTop: 10
    },
    categoryHeading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    searchIcon: {
        paddingLeft: 200
    },
    questionBoxIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        // position: 'absolute', 
        right: 0,
        margin: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    }
});