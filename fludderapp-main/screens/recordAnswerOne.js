import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import Footer from '../components/footer';
import questions from './questions';
import Constants from 'expo-constants';

export default function RecordAnswerOne({ navigation }) {
    const question = navigation.getParam('question');
    const pressHandler = () => {
        // navigation.navigate('RecordAnswerThreeOne',{question});
        navigation.navigate('RecordAnswerCountDown', { question });
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={styles.categoryBox}>
                        <Text style={styles.category}>Question</Text>
                    </View>
                    {/* <View style={styles.questionBox}> 
                    <Text style={{fontWeight: 'bold'}}>Category : </Text><Text>{question.domain_name}</Text>
                </View> */}
                    {/* <Image source={require('../assets/Stopwatch-Icon.png')} style = {{height: 135, width:120, resizeMode : 'stretch', margin: 10, marginTop:50 }} /> */}
                    <ImageBackground source={{ uri: "https://fludder.io/admin/uploads/domain_images/" + question.domain_image }} style={[styles.genaralQuestionsCategoryBox, { width: '97.5%', height: 150, resizeMode: 'cover' }]}>
                        <Text style={styles.genaralQuestionsCategory}>{question.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                    </ImageBackground>
                    <View style={styles.questionBox}>
                        {/* <Text style={{fontWeight: 'bold'}}>Question : </Text> */}
                        <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{question.question}</Text>
                    </View>
                    {/* <View style={{marginTop:10}}> 
                    <Text>The average answer for this question is less that </Text>
                    <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>3:00 minutes </Text>
                </View> */}
                    <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={pressHandler}
                    >
                        <Text style={styles.TextStyle}> Record Your Answer </Text>
                    </TouchableOpacity>
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
        marginTop: 10,
        marginBottom: 150
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
    SignUpButtonStyle: {
        marginTop: 70,
        marginHorizontal: 60,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f7901f',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 50,
        fontSize: 17,
        fontWeight: 'bold'
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
});