import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import Footer from '../components/footer';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function categories({ navigation }) {
  let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
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
  if (!fontsLoaded)
    return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
  else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
          {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
          <View style={{ marginTop: Constants.statusBarHeight }} />
          {/* <View style={styles.categoryBox}>
            <Text style={styles.category}>Choose Question Category</Text>
          </View> */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose Question Category</Text>
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

          {/* <View style={styles.firstCategory}>
            <Image
              source={{ uri: "https://fludder.io/admin/uploads/domain_images/firstCategory3.jpg" }}
              style={{ width: 150, height: 180, alignSelf: 'flex-start', borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
            />
            <View style={styles.firstCategoryTextView}>
              <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#360A65', fontSize: 20 }}>Interview Essentials</Text>
              <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 10 }}>Mastering the Art of Interview Success</Text>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, backgroundColor: '#F9A132', width: 200, height: 50, position: 'absolute', bottom: 0, borderBottomRightRadius: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>CLICK HERE</Text>
                <AntDesign name="arrowright" size={20} color="white" style={{ textAlign: "center", alignSelf: 'center' }} />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* <View style={styles.allCategoryBox}>
            <Text style={{ color: '#360A65', fontFamily: 'Poppins_600SemiBold', width: 200, padding: 10 }}>
              Experience & Competitive Advantage
            </Text>
            <Image
              source={{ uri: "https://fludder.io/admin/uploads/domain_images/1.jpeg" }}
              style={{ width: 150, height: 140, alignSelf: 'flex-start', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
            />
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, backgroundColor: '#F9A132', width: 200, height: 50, position: 'absolute', bottom: 0, borderBottomLeftRadius: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>CLICK HERE</Text>
              <AntDesign name="arrowright" size={20} color="white" style={{ textAlign: "center", alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>

          <View style={styles.allCategoryBoxBlue}>
            <Text style={{ color: '#360A65', fontFamily: 'Poppins_600SemiBold', width: 200, padding: 10 }}>
              Communication & People Skills
            </Text>
            <Image
              source={{ uri: "https://fludder.io/admin/uploads/domain_images/1.jpeg" }}
              style={{ width: 150, height: 140, alignSelf: 'flex-start', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
            />
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, backgroundColor: '#F9A132', width: 200, height: 50, position: 'absolute', bottom: 0, borderBottomLeftRadius: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>CLICK HERE</Text>
              <AntDesign name="arrowright" size={20} color="white" style={{ textAlign: "center", alignSelf: 'center' }} />
            </TouchableOpacity>
          </View> */}

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
                  <View style={styles.firstCategory}>
                    <Image
                      source={{ uri: "https://fludder.io/admin/uploads/domain_images/" + item.domain_image }}
                      style={{ width: 150, height: 180, alignSelf: 'flex-start', borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                    />
                    <View style={styles.firstCategoryTextView}>
                      <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#360A65', fontSize: 20 }}>{item.domain_name}</Text>
                      <Text style={{ fontFamily: 'Poppins_400Regular', marginTop: 10, fontSize: 12 }}>{item.domain_description}</Text>
                      <TouchableOpacity
                        style={{
                          alignSelf: 'stretch',
                          textAlign: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20, backgroundColor: '#F9A132', width: 200, height: 50, position: 'absolute', bottom: 0, borderBottomRightRadius: 10
                        }}
                        onPress={() => pressHandler(item)}
                      >
                        <Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>CLICK HERE</Text>
                        <AntDesign name="arrowright" size={20} color="white" style={{ textAlign: "center", alignSelf: 'center' }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  </TouchableOpacity>
                )}
              />
            }
            keyExtractor={(item) => item.domain_id}
            data={categories.slice(1)}
            // numColumns={2}
            renderItem={({ item, index }) => (
              <TouchableOpacity

                onPress={() => pressHandler(item)}
              >
                <View style={[index % 2 == 0 ? styles.allCategoryBoxBlue : styles.allCategoryBox]}>
                  <Text style={{ color: '#360A65', fontFamily: 'Poppins_600SemiBold', width: 200, padding: 10, zIndex: 2, }}>
                    {item.domain_name.trim()}
                  </Text>
                  <View
                    style={{
                      width: 0,
                      height: 0,
                      backgroundColor: "transparent",
                      borderStyle: "solid",
                      borderLeftWidth: 36,
                      borderRightWidth: 29,
                      borderBottomWidth: 68,
                      borderLeftColor: "transparent",
                      borderRightColor: "transparent",
                      borderBottomColor: index % 2 === 0 ? "#360A65" : "#F9A132",
                      transform: [{ rotate: "180deg" }],
                      position: "absolute",
                      marginTop: 90,
                      marginLeft: 162,
                      zIndex: 2,
                      overflow: "hidden",
                    }}
                  />
                  <View
                    style={{
                      width: 0,
                      height: 0,
                      backgroundColor: "transparent",
                      borderStyle: "solid",
                      borderLeftWidth: 76,
                      borderRightWidth: 76,
                      borderBottomWidth: 152,
                      borderLeftColor: "transparent",
                      borderRightColor: "transparent",
                      borderBottomColor: index % 2 === 0 ? "#E7E2EC" : "#FFF2E1",
                      transform: [{ rotate: "180deg" }],
                      position: "absolute",
                      alignSelf: "flex-start",
                      marginLeft: 118,
                      zIndex: 1,
                    }}
                  />
                  <Image
                    source={{ uri: "https://fludder.io/admin/uploads/domain_images/" + item.domain_image }}
                    style={{ width: '50%', height: 140, alignSelf: 'flex-start', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}
                  />
                  <View style={[index % 2 === 0 ? styles.clickHereButtonStyleBlue : styles.clickHereButtonStyleOrange]}>
                    <Text style={{ color: 'white', textAlign: 'center', alignSelf: 'center', fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}>CLICK HERE</Text>
                    <AntDesign name="arrowright" size={20} color="white" style={{ textAlign: "center", alignSelf: 'center' }} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          {/* </ScrollView> */}
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
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
  firstCategory: {
    flexDirection: 'row',
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
    width: 150,
    padding: 10
  },
  allCategoryBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFF2E1',
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    overflow: "hidden",
  },
  allCategoryBoxBlue: {
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#E7E2EC',
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    overflow: "hidden",
  },
  header: {
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
  clickHereButtonStyleBlue: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#360A65',
    width: 200,
    height: 50,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 10
  },
  clickHereButtonStyleOrange: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#F9A132',
    width: 200,
    height: 50,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 10
  }
});
