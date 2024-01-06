import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default function categories({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [professionalName, setProfessionalName] = useState('');
  const [loading, setLoading] = useState(false);

  const pressHandler = async (domain) => {
    let uType = await AsyncStorage.getItem('userType');
    let professionalHRFlag = await AsyncStorage.getItem('professionalHRFlag');

    if (await AsyncStorage.getItem('userType') == 'P')
      navigation.navigate('SelectAction', { domain, professionalName, professionalHRFlag });
    else
      navigation.navigate('Questions', { domain });
  }
  let passJson;


  useEffect(() => {
    setLoading(true)
    const getAllCategories = async () => {
      const uType = await AsyncStorage.getItem('userType');
      if (uType === "P" && await AsyncStorage.getItem('professionalHRFlag') == 'N') {
        const loginId = await AsyncStorage.getItem('loginId');
        passJson = { loginId: loginId }
        fetch(baseUrl + 'getProfessionalCategories', {
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
            setCategories(json.data);
            setProfessionalName(json.professionalName);
            setLoading(false)
          });
      }
      else {
        fetch(baseUrl + 'getCategories')
          .then((response) => response.json())
          .then((json) => {
            setCategories(json);
            setLoading(false)
          });
      }
    }
    getAllCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: '#ffffff', height: 34 }} />
        <View style={styles.categoryBox}>
          <Text style={styles.category}>Choose Question Category</Text>
        </View>
        {
          loading ?
            <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading question categories...'}
              //Text style of the Spinner Text
              textStyle={{ color: '#FFF' }}
            />
            :
            null
        }
        {/* <ScrollView> */}

        {professionalName !== '' ?
          <Text style={styles.welcome}>Welcome {professionalName}</Text>
          :
          null
        }

        <FlatList
          ListHeaderComponent={
            <FlatList
              keyExtractor={(item) => item.domain_id}
              data={categories.slice(0, 1)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={.5}
                  onPress={() => pressHandler(item)}
                >
                  <ImageBackground source={{ uri: "https://fludder.io/admin/uploads/domain_images/" + item.domain_image }} style={styles.imageBox}>
                    <Text style={styles.text}>{item.domain_name}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          }
          keyExtractor={(item) => item.domain_id}
          data={categories.slice(1)}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={.5}
              onPress={() => pressHandler(item)}
              style={styles.imageBox}
            >
              <ImageBackground source={{ uri: "https://fludder.io/admin/uploads/domain_images/" + item.domain_image }} style={styles.image}>
                <Text style={styles.text}>{item.domain_name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
        {/* </ScrollView> */}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center"
    // flexDirection: "row"
  },
  imageBox: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    height: 150,
    margin: 5,
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    height: 150,
    // margin: 5,
    // borderWidth: 2,
    // borderColor: 'orange',
    borderRadius: 20,
    overflow: 'hidden'
  },
  text: {
    color: "#37266b",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  text1: {
    color: "#37266b",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  categoryBox: {
    margin: 7,
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
  welcome: {
    fontWeight: 'bold',
    color: '#37266b',
    fontSize: 22,
    textAlign: "center",
    marginVertical: 50
  },
});
