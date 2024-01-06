import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Loading from '../components/Loading';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';

export default function ProfessionalProfile({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [accountDeleteModalVisible, setAccountDeleteModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingForAPI, setLoadingForAPI] = useState(false);

    const userType = navigation.getParam('userType');
    const userId = navigation.getParam('userId');
    const [profilePicture, setProfilePicture] = useState();
    const [profilePictureLoading, setProfilePictureLoading] = useState(true);

    const [profile, setProfile] = useState([])

    useEffect(() => {
        setLoadingForAPI(false)
        fetch(baseUrl + 'getProfile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userType: userType,
                userId: userId
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log("json", json)
                setProfile(json);
                setLoadingForAPI(false)
                if (userType === 'P') {
                    if (json.professional_profile_picture != null) {
                        if (profilePicture === json.professional_profile_picture) {
                            // setProfilePictureLoading(false)
                        }
                        else {
                            // setProfilePictureLoading(true)
                            setProfilePicture(json.professional_profile_picture)
                        }
                    }
                    else {
                        setProfilePicture("profile-icon.png")
                    }
                }
                else {
                    if (json.user_profile_picture != null) {
                        if (profilePicture === json.user_profile_picture) {
                            // setProfilePictureLoading(false)
                        }
                        else {
                            // setProfilePictureLoading(true)
                            setProfilePicture(json.user_profile_picture)
                        }
                    }
                    else {
                        setProfilePicture("profile-icon.png")
                    }
                }
                // console.log(profilePicture);
            });
    }, []);

    const pressHandler = (Profile) => {
        navigation.navigate('EditProfile', { profile, userType, userId });
    }

    const pressHandler3 = (Profile) => {
        navigation.navigate('UserAdvancedProfile', { profile, userType, userId });
    }

    const pressHandler1 = (Profile) => {
        navigation.push('CameraOptions', { profile, userType, userId });
        // setModalVisible(!modalVisible);
    }

    const pressHandler2 = (Profile) => {
        setAccountDeleteModalVisible(!accountDeleteModalVisible);
    }

    function deleteProfilePicture(userType, userId) {
        fetch(baseUrl + 'deleteProfilePicture', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userType: userType,
                userId: userId
            }),
        })
            .then((response) => response.json())
            .then((json) => {

            });
    }

    function deleteAccount(userType, userId) {
        const dd = {
            userType: userType,
            userId: userId
        }
        setLoading(false)
        try {
            fetch(baseUrl + 'deleteAccount', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userType: userType,
                    userId: userId
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    setLoading(false)
                    AsyncStorage.getAllKeys()
                        .then(keys => AsyncStorage.multiRemove(keys));
                    navigation.replace('SignUp');
                });
        }
        catch (error) {
            setLoading(false)
            console.log('error : ' + error);
            return error;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
            <View style={{ marginTop: Constants.statusBarHeight }} />
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    {
                        loadingForAPI ?
                            <Spinner
                                //visibility of Overlay Loading Spinner
                                visible={loadingForAPI}
                                //Text with the Spinner
                                textContent={'Loading profile information...'}
                                //Text style of the Spinner Text
                                textStyle={{ color: '#FFF' }}
                            />
                            :
                            null
                    }
                    {
                        loading ?
                            <Spinner
                                //visibility of Overlay Loading Spinner
                                visible={loading}
                                //Text with the Spinner
                                textContent={'Thank you for being with Fludder! \n  Deleting your account securly...'}
                                //Text style of the Spinner Text
                                textStyle={{ color: '#FFF' }}
                            />
                            :
                            null
                    }
                    <View style={styles.categoryBox}>
                        <FontAwesome name="user" size={24} color="white" />
                        <Text style={styles.category}>&nbsp;User Profile</Text>
                    </View>
                    <View style={styles.profilePictureBox}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <View style={{ height: 72, }}>
                                    <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={() => pressHandler1()}
                                    >
                                        {
                                            profilePictureLoading ?
                                                <View style={{ margin: 20 }}>
                                                    <ActivityIndicator size="small" color="#0000ff" />
                                                </View>
                                                :
                                                null
                                        }
                                        <Image
                                            // defaultSource={require('../assets/giphy.gif')}
                                            source={{
                                                uri:
                                                    'https://fludder.io/admin/uploads/profile_pictures/' + profilePicture,
                                            }}
                                            //borderRadius style will help us make the Round Shape Image
                                            style={{ width: 50, height: 50, borderRadius: 200 / 2, margin: 10 }}
                                            onLoadEnd={() => {
                                                setProfilePictureLoading(false);
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </SafeAreaView>
                            {
                                userType === 'P' ?
                                    <View style={[profile.professional_current_role != null && profile.professional_current_role !== "" ? { marginTop: 10, } : { marginTop: 20, }]}>
                                        <Text>
                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: 'white' }}>{profile.professional_name}</Text>
                                            <Text style={{ fontSize: 12, color: 'white' }}>
                                                {"\n"}{profile.professional_current_role}
                                            </Text>
                                        </Text>
                                    </View>
                                    :
                                    <View style={{ marginTop: 20, }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: 'white' }}>{profile.user_name}</Text>
                                    </View>
                            }
                        </View>
                    </View>
                    {
                        userType == 'P' ?
                            <View style={styles.profileTextBox}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <SafeAreaView>
                                        <Text style={{ margin: 5, fontSize: 18, fontWeight: "bold" }}>Question Category: {profile.domain_name ? profile.domain_name.replace(/\s{2,}/g, ' ') : "Belongs All Categories"}</Text>
                                    </SafeAreaView>
                                </View>
                            </View>
                            :
                            null
                    }
                    <View style={styles.profileTextBox}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 18, fontWeight: "bold" }}>
                                    <FontAwesome name="id-card-o" size={18} color="#360a65" />
                                    &nbsp;About Me
                                </Text>
                                {
                                    userType == 'P' ?
                                        <Text style={{ margin: 10, marginLeft: 30 }}>
                                            {profile.professional_description}
                                        </Text>
                                        :
                                        <Text style={{ margin: 10, marginLeft: 30 }}>
                                            {profile.user_description}
                                        </Text>
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={styles.profileTextBox}>
                        {/* <Image
                        source={require('../assets/profile-email.png')}
                        style={{ width: 20, height: 15, margin: 10}}
                    /> */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <MaterialCommunityIcons name="email" size={18} color="#360a65" />
                                    &nbsp;Email
                                </Text>
                                <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.email_id}</Text>
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={styles.profileTextBox}>
                        {/* <Image
                        source={require('../assets/profile-mobile.png')}
                        style={{ width: 15, height: 20, margin: 10}}
                    /> */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <FontAwesome name="phone" size={18} color="#360a65" />
                                    &nbsp;Contact Number
                                </Text>
                                {
                                    userType === 'P' ?
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.professional_contact_number}</Text>
                                        :
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.user_contact_number}</Text>
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={styles.profileTextBox}>
                        {/* <Image
                        source={require('../assets/profile-education.png')}
                        style={{ width: 20, height: 20, margin: 10}}
                    /> */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <FontAwesome5 name="graduation-cap" size={18} color="#360a65" />
                                    &nbsp;Professional Experience Degree or Specialty
                                </Text>
                                {
                                    userType === 'P' ?
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.professional_specialties}</Text>
                                        :
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.user_degree}</Text>
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={styles.profileTextBox}>
                        {/* <Image
                        source={require('../assets/profile-city.png')}
                        style={{ width: 20, height: 20, margin: 10}}
                    /> */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <MaterialCommunityIcons name="city" size={22} color="#360a65" />
                                    &nbsp;City & State
                                </Text>
                                {
                                    userType === 'P' ?
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.professional_city}</Text>
                                        :
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.user_city}</Text>
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={styles.profileTextBox}>
                        {/* <Image
                        source={require('../assets/profile-zipcode.png')}
                        style={{ width: 15, height: 20, margin: 10}}
                    /> */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <FontAwesome5 name="map-marker-alt" size={18} color="#360a65" />
                                    &nbsp;Zip Code
                                </Text>
                                {
                                    userType === 'P' ?
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.professionalZipCode}</Text>
                                        :
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userZipCode}</Text>
                                }
                            </SafeAreaView>
                        </View>
                    </View>
                    {
                        userType === 'P' ?
                            <View style={styles.profileTextBox}>
                                <Image
                                    source={require('../assets/profile-brifcase.png')}
                                    style={{ width: 20, height: 20, margin: 10 }}
                                />
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <SafeAreaView>
                                        <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>Employment Experience</Text>
                                        <Text style={{ margin: 5, fontSize: 15, marginTop: 7 }}>{profile.professional_experience}</Text>
                                    </SafeAreaView>
                                </View>
                            </View>
                            :
                            null
                    }
                    {/* {
                    userType === 'P' ?
                        <View style={styles.profileTextBox}> 
                            <Image
                                source={require('../assets/profile-company.png')}
                                style={{ width: 20, height: 20, alignSelf: 'center', margin: 10}}
                            />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{margin: 5, fontSize: 15, marginTop: 7}}>{profile.professional_current_company}</Text>
                                </SafeAreaView>
                            </View>
                        </View>
                    :
                        null
                } */}
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={styles.SignUpButtonStyle}
                            activeOpacity={.5}
                            onPress={() => pressHandler(profile)}
                        >
                            <Text style={styles.EditButtonTextStyle}>
                                <FontAwesome5 name="user-edit" size={18} color="white" />
                                &nbsp;Edit Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.SignUpButtonStyle}
                            activeOpacity={.5}
                            onPress={() => pressHandler2(profile)}
                        >
                            <Text style={styles.ButtonTextStyle}>
                                <MaterialCommunityIcons name="delete" size={20} color="white" />
                                Delete Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        userType === 'U' ?
                            <TouchableOpacity
                                style={styles.SignUpButtonStyle}
                                activeOpacity={.5}
                                onPress={() => pressHandler3(profile)}
                            >
                                <Text style={styles.EditButtonTextStyle}>
                                    <FontAwesome name="eye" size={20} color="white" />
                                    &nbsp;View Employment Profile
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                </View>
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
                                <Text style={styles.modalText}>Choose an option!</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                        onPress={() => {
                                            let flag = 'C';
                                            setModalVisible(!modalVisible);
                                            navigation.push('EditProfilePicture', { profile, userType, userId, flag });
                                        }}>
                                        <Text style={styles.textStyle}>Camera</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                        onPress={async () => {
                                            let flag = 'G';
                                            setModalVisible(!modalVisible);
                                            navigation.push('EditProfilePicture', { profile, userType, userId, flag });
                                        }}>
                                        <Text style={styles.textStyle}>Gallery</Text>
                                    </TouchableHighlight>
                                    {profilePicture != 'profile-icon.png' ?
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                            onPress={async () => {
                                                let flag = 'G';
                                                setModalVisible(!modalVisible);
                                                deleteProfilePicture(userType, userId);
                                                // navigation.navigate('ProfessionalProfile', { userType, userId });
                                                navigation.push('ProfessionalProfile', { userType, userId })
                                            }}>
                                            <Text style={styles.textStyle}>Remove</Text>
                                        </TouchableHighlight>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={accountDeleteModalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                        onPress={() => {
                                            setAccountDeleteModalVisible(!accountDeleteModalVisible);
                                            deleteAccount(userType, userId);
                                        }}>
                                        <Text style={styles.textStyle}>Delete</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                        onPress={async () => {
                                            setAccountDeleteModalVisible(!accountDeleteModalVisible);
                                        }}>
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableHighlight>
                                </View>
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
        marginBottom: 45,
    },
    profilePictureBox: {
        margin: 7,
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#37266b',
        borderRadius: 10
    },
    profileTextBox: {
        margin: 7,
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#f6f6f6',
        borderRadius: 10
    },
    SignUpButtonStyle: {
        marginTop: 20,
        marginHorizontal: 5,
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
        fontSize: 17
    },
    ButtonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: '6%',
        fontSize: 17
    },
    EditButtonTextStyle: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: '11%',
        fontSize: 17
    },
    questionBox: {
        margin: 10,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f6f6f6'
    },
    categoryBox: {
        flexDirection: 'row',
        margin: "1.5%",
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: '#f7901f',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center'
    },
    category: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        margin: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 40,
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
        backgroundColor: '#f7901f',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5
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
        fontSize: 16,
        fontWeight: "bold"
    },
});