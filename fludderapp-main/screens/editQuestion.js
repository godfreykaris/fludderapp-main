import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Modal,
  TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import { Formik } from 'formik';
import * as yup from 'yup';
import Constants from 'expo-constants';

export default function EditQuestion({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const question = navigation.getParam('questionPara');
  const domain = navigation.getParam('domain');

  // const pressHandler = () => {
  //     navigation.navigate('SubmitQuestion');
  // }

  const ReviewSchema = yup.object({
    question: yup.string().required('Please enter question').min(3)
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
      {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
      <View style={{ marginTop: Constants.statusBarHeight }} />
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <Formik
          initialValues={{
            question: question.question
          }}
          onSubmit={async (values) => {
            let professionalId = await AsyncStorage.getItem("professionalId");
            fetch(baseUrl + 'updateQuestion', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                questionId: question.question_id,
                professional_id: professionalId,
                question: values.question,
              }),
            })
              .then((response) => response.json())
              .then((json) => {
                let questionPara = json.question;
                // alert("Question updated successfully.")
                setModalVisible(!modalVisible);
                // navigation.navigate('SubmitQuestionSuccess');
              });
          }}
          validationSchema={ReviewSchema}
        >
          {(props) => (
            <View style={styles.container}>
              <View style={styles.categoryBox}>
                <Text style={styles.category}>Edit Question</Text>
              </View>
              <View style={styles.questionBox}>
                <Text style={{ fontWeight: 'bold' }}>Category : </Text><Text>{question.domain_name.replace(/\s{2,}/g, ' ')}</Text>
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
                <Text style={styles.TextStyle}> Update Question </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
                <Text style={styles.modalText}>Question updated successfully.</Text>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('SubmitQuestionSuccess');
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
    alignItems: "center",
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
    flexWrap: 'wrap'
  },
  SignUpButtonStyle: {
    marginTop: 10,
    marginHorizontal: 100,
    padding: 10,
    backgroundColor: '#f7901f',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  TextStyle: {
    textAlign: 'center',
    color: 'white'
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#f7901f', // Orange
    padding: 10,
    margin: 10,
    width: 370,
    height: 200,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
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