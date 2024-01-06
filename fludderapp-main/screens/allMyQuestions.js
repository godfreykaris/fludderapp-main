import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../components/footer';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';

export default function allMyQuestions({ navigation }) {

    const KEYS_TO_FILTERS = ['question'];

    const [state, setState] = useState({ searchTerm: '' });
    const [loading, setLoading] = useState(false);

    const pressHandler = (questionPara) => {

        let domain = {
            "domain_name": questionPara.domain_name.replace(/\s{2,}/g, ' '),
            "domain_description": questionPara.domain_description,
            "domain_image": questionPara.domain_image,
            "domain_created_on": questionPara.domain_created_on,
            "domain_updated_on": questionPara.domain_updated_on
        }

        navigation.navigate('EditQuestion', { questionPara, domain });
    }
    const pressHandler1 = () => {
        navigation.navigate('PendingReview');
    }

    const [allMyQuestions, setAllMyQuestions] = useState([]);

    let professionalId;
    useEffect(() => {
        setLoading(true)
        const getAllMyQuestions = async () => {
            professionalId = await AsyncStorage.getItem('professionalId')
            fetch(baseUrl + 'getAllMyQuestions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    professionalId: professionalId,
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    // if(json) {
                    //     alert("You have not asked any question")
                    //     navigation.navigate('Categories');
                    // }

                    // else
                    setLoading(false)
                    setAllMyQuestions(json);
                });
        }
        getAllMyQuestions();
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

    const filteredQuestions = allMyQuestions.filter(createFilter(state.searchTerm, KEYS_TO_FILTERS))
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                <View style={{ marginTop: Constants.statusBarHeight }} />
            <View style={styles.container}>
                <View style={styles.categoryBox1}>
                    <Text style={styles.category1}>Your Questions</Text>
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
                            textContent={'Loading your questions...'}
                            //Text style of the Spinner Text
                            textStyle={{ color: '#FFF' }}
                        />
                        :
                        null
                }
                {/* <Icon style={styles.searchIcon} name="search" size={20} color="#000"/> */}
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    {
                        filteredQuestions.length > 0 ?
                            <View>
                                {filteredQuestions.map((item, index, array) =>
                                    <View style={{ alignSelf: 'stretch', marginVertical: 5 }} key={index}>
                                        <View style={styles.questionBoxHeader}>
                                            <Text style={{ color: 'white' }}>{getDateFormatted(item.question_created_on)}</Text>
                                        </View>
                                        <View style={styles.questionBox}>
                                            <Text style={{ flex: 1 }}>{item.question}{"\n\n"}<Text style={{ color: 'gray' }}>{item.domain_name.replace(/\s{2,}/g, ' ')}</Text></Text>
                                            {item.question_approval_flag === 'S' ?
                                                <TouchableOpacity
                                                    activeOpacity={.5}
                                                    onPress={() => pressHandler(item)}
                                                    key={item.question_id}
                                                >
                                                    <Image source={require('../assets/01-Hourglass-Orange.png')} style={styles.questionBoxIcon} />
                                                    <Text style={{ color: 'orange', fontWeight: 'bold' }}>Pending</Text>
                                                </TouchableOpacity>
                                                :
                                                <View></View>
                                            }
                                            {item.question_approval_flag === 'A' ?
                                                <View>
                                                    <Image source={require('../assets/Review-Green-Icon.png')} style={styles.questionBoxIcon1} />
                                                    <Text style={{ color: 'green', fontWeight: 'bold' }}>Approved</Text>
                                                </View>
                                                :
                                                <View></View>
                                            }
                                            {item.question_approval_flag === 'R' ?
                                                <TouchableOpacity
                                                    activeOpacity={.5}
                                                    onPress={() => pressHandler(item)}
                                                    key={item.question_id}
                                                >
                                                    <Image source={require('../assets/01-Hourglass-Red.png')} style={styles.questionBoxIcon} />
                                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>Rejected</Text>
                                                </TouchableOpacity>
                                                :
                                                <View></View>
                                            }
                                        </View>
                                    </View>
                                )}
                            </View>
                            :
                            <View>
                                <Text style={{ justifyContent: 'center', textAlign: 'center', color: 'gray', fontSize: 20, marginTop: '50%' }}>
                                    No questions found.
                                </Text>
                            </View>
                    }

                </ScrollView>
                {/* <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Not yet reviewed</Text>
                    </View>
                    <View style={styles.questionBox}> 
                        <Text style={{flex: 1}}>Tell us about yourself{"\n\n"}<Text style= {{color: 'gray'}}>Accounting</Text></Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler1 }
                        >
                            <Image source={require('../assets/Green-Edit-Icon.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>    
                    </View>
                </View>
                <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Not yet sent for reviewed</Text>
                    </View>    
                    <View style={styles.questionBox}>
                        <Text style={{flex: 1}}>Where do you see yourself in next 5 years?{"\n\n"}<Text style= {{color: 'gray'}}>Software Engineering</Text></Text>
                        <TouchableOpacity
                            activeOpacity = { .5 }
                            onPress={ pressHandler1 }
                        >
                            <Image source={require('../assets/Orange-Edit-Icon.png')} style= {styles.questionBoxIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Reviewed By: Steve Levine</Text>
                    </View>    
                    <View style={styles.questionBox}> 
                        <Text style={{flex: 1}}>Tell us about any mentors or advisors who has positively influenced you.{"\n\n"}<Text style= {{color: 'gray'}}>Marketing</Text></Text>
                        <Image source={require('../assets/Orange-Edit-Icon.png')} style= {styles.questionBoxIcon} />
                    </View>
                </View>
                <View style={{alignSelf: 'stretch', marginVertical: 5}}>
                    <View style={styles.questionBoxHeader}> 
                        <Text style={{color: 'white'}}>25 September 2020</Text>
                        <Text style={{color: 'white', flex: 1, textAlign: 'right'}}>Not yet reviewed</Text>
                    </View>    
                    <View style={styles.questionBox}> 
                        <Text style={{flex: 1}}>What subjects did you enjoyed the most at school?{"\n\n"}<Text style= {{color: 'gray'}}>Health Care</Text></Text>
                        <Image source={require('../assets/Red-Edit-Icon.png')} style= {styles.questionBoxIcon} />
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
        height: 30,
        width: 30,
        resizeMode: 'contain',
        // position: 'absolute', 
        right: 0,
        margin: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    questionBoxIcon1: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        // position: 'absolute', 
        right: 0,
        margin: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    }
});