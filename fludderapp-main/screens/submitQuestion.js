import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import Constants from 'expo-constants';

export default function submitQuestion({ navigation }) {

    const questionPara = navigation.getParam('questionPara');

    // console.log("Question: ",question)
    const domain = navigation.getParam('domain');
    const pressHandler = () => {
        let questionDetails = {
            domain_id: domain.domain_id,
            question: questionPara.question,
            question_id: questionPara.question_id,
            domain_name: domain.domain_name.replace(/\s{2,}/g, ' ')
        }
        navigation.navigate('EditQuestion', { questionPara, domain });
    }

    const pressHandler1 = () => {
        navigation.navigate('SubmitQuestionSuccess');
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
                    <View style={styles.questionBox}>
                        <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{domain.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                    </View>
                    <View style={styles.questionBox}>
                        <Text style={{ fontWeight: 'bold' }}>Question : </Text><Text>{questionPara.question}</Text>
                    </View>
                    <Image source={require('../assets/Submit-Question-Icon.png')} style={{ height: 100, width: 100, marginVertical: 20 }} />
                    <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={pressHandler}
                    >
                        <Text style={styles.EditButtonTextStyle}> Edit Question </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={pressHandler1}
                    >
                        <Text style={styles.EditButtonTextStyle}> Submit Question </Text>
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
    questionBox: {
        margin: 10,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    SignUpButtonStyle: {
        margin: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#37266b', // Blue
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff'
    },
    TextStyle: {
        textAlign: 'center',
        color: 'white',
    },
    EditButtonTextStyle: {
        textAlign: 'center',
        color: 'white',
        marginHorizontal: 40,
        marginVertical: 5,
        color: 'white'
    },
});