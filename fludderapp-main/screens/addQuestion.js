import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import { Formik } from 'formik';
import * as yup from 'yup';
import Constants from 'expo-constants';

export default function AddQuestion({ navigation }) {

    const domain = navigation.getParam('domain');

    const ReviewSchema = yup.object({
        question: yup.string().required('Please enter question').min(3)
    });

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }
                }>
                    <Formik
                        initialValues={{
                            question: ''
                        }}
                        onSubmit={async (values, onSubmitProps) => {
                            let professionalId = await AsyncStorage.getItem("professionalId");
                            fetch(baseUrl + 'addQuestion', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    domain_id: domain.domain_id,
                                    professional_id: professionalId,
                                    question: values.question,
                                }),
                            })
                                .then((response) => response.json())
                                .then((json) => {
                                    let questionPara = json.question;
                                    onSubmitProps.resetForm();
                                    navigation.navigate('SubmitQuestion', { questionPara, domain });
                                });
                        }}
                        validationSchema={ReviewSchema}
                    >
                        {(props) => (
                            <View style={styles.container}>
                                <View style={styles.categoryBox}>
                                    <Text style={styles.category}>Add New Question</Text>
                                </View>
                                <View style={styles.questionBox}>
                                    <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{domain.domain_name.replace(/\s{2,}/g, ' ')}</Text>
                                </View>
                                <TextInput
                                    placeholder="Type your question here..."
                                    style={styles.inputText}
                                    onChangeText={props.handleChange('question')}
                                    value={props.values.question}
                                    onBlur={props.handleBlur('question')}
                                    multiline={true}
                                />
                                <Text style={styles.errorText}>{props.touched.question && props.errors.question}</Text>
                                <TouchableOpacity
                                    style={styles.SignUpButtonStyle}
                                    activeOpacity={.5}
                                    onPress={props.handleSubmit}
                                >
                                    <Text style={styles.TextStyle}> Add Question </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </TouchableWithoutFeedback>
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
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20
    },
    SignUpButtonStyle: {
        marginTop: 10,
        marginHorizontal: 100,
        padding: 10,
        backgroundColor: '#37266b',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    TextStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#f7901f', // Orange
        padding: 5,
        margin: 10,
        width: '95%',
        height: 200,
        textAlignVertical: 'top'
    },
    errorText: {
        color: 'red',
    }
});