import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Footer from '../components/footer';
import { FlatList } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

const windowWidth = Dimensions.get('window').width;

export default function questions({ navigation }) {

    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });

    const domain = navigation.getParam('domain');
    const [questions, setQuestions] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch(baseUrl + 'getQuestions', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                domain_id: domain.domain_id
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setQuestions(json);
                setLoading(false)
            });
    }, []);

    const pressHandler = (question, domain) => {
        //   navigation.navigate('RecordAnswerCountDown',{question,domain});
        navigation.push('RecordAnswerThreeOne', { question, domain });
    }

    const backToCategoryScreen = () => {
        navigation.navigate('Categories');
    };

    if (!fontsLoaded && loading)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                    {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                    <View style={{ marginTop: Constants.statusBarHeight }} />
                    {/* <View style={styles.categoryBox}>
                    <Text style={styles.category}>Choose Question</Text>
                </View> */}
                    <View style={{ ...styles.header, flexDirection: 'row', position: 'relative', alignItems: 'center' }}>
                        <Ionicons onPress={backToCategoryScreen} name="chevron-back-sharp" size={24} color="white" style={{ display: 'flex', position: 'absolute', left: 0, marginLeft: 10 }} />
                        <Text style={styles.headerText}>Questions</Text>
                    </View>
                    {
                        loading ?
                            <Spinner
                                //visibility of Overlay Loading Spinner
                                visible={loading}
                                //Text with the Spinner
                                textContent={'Loading questions...'}
                                //Text style of the Spinner Text
                                textStyle={{ color: '#FFF' }}
                            />
                            :
                            null
                    }
                    {/* {
                questions.length>0? */}
                    <FlatList
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.question_id}
                        data={questions}
                        renderItem={({ item }) => (
                            <View style={{ width: windowWidth, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.questionBox}>
                                    <ImageBackground source={{ uri: "https://fludder.io/admin/uploads/domain_images/" + domain.domain_image }} style={[styles.genaralQuestionsCategoryBox, { width: '97.5%', height: 150, resizeMode: 'cover' }]}>
                                        <Text style={styles.genaralQuestionsCategory}>{domain.domain_name.replace(/\s+/g, ' ').trim()}</Text>
                                    </ImageBackground>
                                    <View style={styles.questionBox1}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{item.question}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={.5}
                                    onPress={() => pressHandler(item, domain)}
                                    style={styles.NextButtonStyle}
                                >
                                    <Text style={styles.TextStyle}>Record Answer</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#f7901f', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>or swipe for next question</Text>
                            </View>
                        )}
                    />
                    {/* :
                <View>
                    <Text style={{justifyContent:'center', textAlign:'center', color:'gray', fontSize: 20, marginTop:'50%'}}>
                        No more questions available!
                    </Text>
                </View> 
            } */}
                </View>
                <Footer navigation={navigation} />
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        alignItems: "center",
        //   marginBottom: 45,
    },
    questionBox: {
        // marginTop:50,
        // padding: 20,
        height: 300,
        alignSelf: 'stretch',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#f6f6f6',
        width: windowWidth,
        // borderWidth: 2,
        // borderColor:"#f7901f",
        // borderRadius: 20
    },
    questionBox1: {
        margin: 5,
        padding: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryBox: {
        margin: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f7901f',
        borderRadius: 20,
        // marginTop: 15
    },
    category: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 30,
        fontSize: 17,
        fontWeight: 'bold'
    },
    NextButtonStyle: {
        marginTop: 50,
        marginHorizontal: 100,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#37266b',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 20,
        width: 190
    },
    genaralQuestionsCategoryBox: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#f7901f',
        margin: 5,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        position: 'relative',
    },
    genaralQuestionsCategory: {
        color: 'rgb(51, 1, 112)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        textAlign: "center",
        borderBottomWidth: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8
    },
    header: {
        width: '100%',
        height: '8%',
        backgroundColor: '#360A65',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        marginBottom: 10
    },
    headerText: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
});