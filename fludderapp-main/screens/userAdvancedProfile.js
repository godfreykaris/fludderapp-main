import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Modal,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/footer';
import { FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function userAdvancedlProfile({ navigation }) {
    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });

    const [modalVisible, setModalVisible] = useState(false);
    const [accountDeleteModalVisible, setAccountDeleteModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);
    const [ratingOutOfFive, setRatingOutOfFive] = useState(0);
    const [ratingOutOfTen, setRatingOutOfTen] = useState(0);

    const userType = navigation.getParam('userType');
    const userId = navigation.getParam('userId');
    const [profilePicture, setProfilePicture] = useState();
    const [profilePictureLoading, setProfilePictureLoading] = useState(true);

    const [profile, setProfile] = useState([])

    useEffect(() => {
        setLoading(false)
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
                setProfile(json);
                setLoading(false)
                // if(userType==='P'){
                //     if(json.professional_profile_picture!=null){
                //         if(profilePicture===json.professional_profile_picture) {
                //         }
                //         else{
                //             setProfilePicture(json.professional_profile_picture)
                //         }
                //     }   
                //     else {
                //         setProfilePicture("profile-icon.png")
                //     }
                // }
                // else{
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
                // }
                // console.log(profilePicture);
            });
    }, []);

    const pressHandler = (Profile) => {
        navigation.navigate('EditProfile', { profile, userType, userId });
    }

    const pressHandler3 = (Profile) => {
        navigation.push('EditAdvancedProfile', { profile, userType, userId });
    }

    const pressHandler1 = (Profile) => {
        navigation.push('CameraOptions', { profile, userType, userId });
        // setModalVisible(!modalVisible);
    }

    const pressHandler2 = (Profile) => {
        setAccountDeleteModalVisible(!accountDeleteModalVisible);
    }

    const pressHandler4 = async () => {
        if (userType === 'P')
            navigation.push('ProfessionalProfile', { userType, userId });
        else
            navigation.push('UserProfile', { userType, userId });
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
        console.log(dd);
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
                AsyncStorage.getAllKeys()
                    .then(keys => AsyncStorage.multiRemove(keys));
                navigation.replace('SignUp');
            });
    }

    async function getRatingData() {
        // console.log(await AsyncStorage.getItem('userInformationId'));
        let passJson = { user_information_id: await AsyncStorage.getItem('userInformationId') }
        if (passJson.user_information_id != "") {
            await fetch(baseUrl + 'getOverallRatingAndNumberOfAnswers', {
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
                    setRatingOutOfFive(json.ratingOutOfFive);
                    setNumberOfAnswers(json.numberOfAnswers);
                    setRatingOutOfTen(json.ratingOutOfTen)
                });
        }
        else
            navigation.push('Login');
    }

    useEffect(() => {
        getRatingData();
    }, []);

    if (!fontsLoaded && loading)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                <View style={{ marginTop: Constants.statusBarHeight }} />
                <View style={{ ...styles.header, flexDirection: 'row', position: 'relative' }}>
                    <Text style={styles.headerText}>Employment Profile</Text>
                    <View style={{ display: 'flex', position: 'absolute', right: 0, marginRight: 10 }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'column', alignItems: 'center' }}
                            onPress={() => pressHandler3(profile)}
                        >
                            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 100, width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.5)" }}>
                                <Feather name="edit" size={12} color="white" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins_400Regular' }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <View style={styles.container}>
                        {/* <View style={styles.categoryBox}>
                        <FontAwesome name="user" size={24} color="white" />
                        <Text style={styles.category}>&nbsp;Employment Profile</Text>
                    </View> */}
                        {
                            loading ?
                                <Spinner
                                    //visibility of Overlay Loading Spinner
                                    visible={loading}
                                    //Text with the Spinner
                                    textContent={'Loading profile information...'}
                                    //Text style of the Spinner Text
                                    textStyle={{ color: '#FFF' }}
                                />
                                :
                                null
                        }
                        <View elevation={5} style={styles.profileContainerHome}>
                            <View style={styles.profilePictureStyleHome}>
                                <TouchableOpacity
                                    activeOpacity={.5}
                                    onPress={() => pressHandler1()}
                                >
                                    {
                                        profile.user_profile_picture ?
                                            <Image
                                                source={{ uri: 'https://fludder.io/admin/uploads/profile_pictures/' + profile.user_profile_picture }}
                                                style={{ width: 50, height: 50, borderRadius: 100 }}
                                            />
                                            :
                                            // <Image
                                            //     source={require('../assets/profile-icon.png')}
                                            //     style={{ width: 50, height: 50, borderRadius: 100 }}
                                            // />
                                            <FontAwesome5 name="user-plus" size={28} style={{ width: 50, height: 50, alignItems: 'center', padding: 7.9 }} color="#360A65" />
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileTextContainerHome}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.profileNameTextHome}>
                                        {profile.user_name}
                                    </Text>
                                    {/* <MaterialIcons name="verified" size={18} color="#42f54b" style={{ marginTop: 4, marginLeft: 2 }} /> */}
                                </View>
                                {
                                    profile.user_city ?
                                        <Text style={{ color: '#acb5ac', fontFamily: 'Poppins_400Regular', fontSize: 12 }}>{profile.user_city}</Text>
                                        :
                                        null
                                }

                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, marginTop: 2 }}>Number of Questions Answered: </Text><Text style={styles.profileNameText}>{numberOfAnswers}</Text>
                                </View>
                                <View
                                    style={{
                                        marginVertical: 5,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                    }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, marginTop: 7 }}>Average Fludder Score: </Text>
                                    <Image
                                        source={{ uri: "https://fludder.io/admin/assets/images/ratings/" + ratingOutOfTen + ".png" }}
                                        style={{ width: 105, height: 27, marginRight: 5, marginTop: 2 }}
                                    />
                                    <Text style={{ marginTop: 3, fontSize: 16, fontFamily: 'Poppins_600SemiBold' }}>{ratingOutOfFive}</Text>
                                    <Text style={{ marginTop: 6, fontSize: 12, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.profilePictureBox}>
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
                            <View style={{ marginTop: 20, }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: 'white' }}>{profile.user_name}</Text>
                            </View>
                        </View>
                    </View> */}
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 18, fontWeight: "bold" }}>
                                        <MaterialCommunityIcons name="account-search" size={22} color="#360a65" />
                                        &nbsp;Is your profile discoverable?
                                    </Text>
                                    <Text style={{ margin: 10, marginLeft: 30 }}>
                                        {profile.userDiscoverableFlag == 1 ? 'Yes' : 'No'}
                                    </Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        {profile.userDiscoverableFlag == 1 ?
                            <View style={styles.profileTextBox}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <SafeAreaView>
                                        <Text style={{ margin: 5, fontSize: 18, fontWeight: "bold" }}>
                                            <FontAwesome5 name="list-ol" size={22} color="#360a65" />
                                            &nbsp;Job Description you are interested in
                                        </Text>
                                        <Text style={{ margin: 10, marginLeft: 30 }}>
                                            {profile.jobTitles}
                                        </Text>
                                    </SafeAreaView>
                                </View>
                            </View>
                            :
                            null
                        }
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                        <MaterialCommunityIcons name="tag-search" size={22} color="#360a65" />
                                        &nbsp;About the role you are looking for
                                    </Text>
                                    <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userJobDescriptionText}</Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                        <MaterialCommunityIcons name="certificate" size={22} color="#360a65" />
                                        &nbsp;Level of Education
                                    </Text>
                                    <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userLevelOfEducation != "null" ? profile.userLevelOfEducation : ""}</Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                        <FontAwesome name="vcard" size={18} color="#360a65" />
                                        &nbsp;Desired Work Frequency
                                    </Text>
                                    <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userPositionLookingFor != "null" ? profile.userPositionLookingFor : ""}</Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                        <MaterialIcons name="add-location-alt" size={22} color="#360a65" />
                                        &nbsp;Desired Work Location
                                    </Text>
                                    <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userLocationPreference != "null" ? profile.userLocationPreference : ""}</Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        {/* <View style={styles.profileTextBox}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <FontAwesome5 name="business-time" size={18} color="#360a65" />
                                    &nbsp;Desired Shift Length
                                </Text>
                                <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userWorkingHours}</Text>
                            </SafeAreaView>
                        </View>
                    </View> */}
                        {/* <View style={styles.profileTextBox}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <SafeAreaView>
                                <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                    <MaterialIcons name="receipt-long" size={22} color="#360a65" />
                                    &nbsp;Desired Position Type
                                </Text>
                                <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userTypeOfWorkLookingFor}</Text>
                            </SafeAreaView>
                        </View>
                    </View> */}
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                        <MaterialIcons name="event-available" size={20} color="#360a65" />
                                        &nbsp;Weekend Availability
                                    </Text>
                                    <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>
                                        {profile.userWeekendAvailability == 1 ? 'Yes' : 'No'}
                                    </Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        <View style={styles.profileTextBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <SafeAreaView>
                                    <Text style={{ margin: 5, fontSize: 15, fontWeight: "bold" }}>
                                        <FontAwesome name="vcard" size={20} color="#360a65" />
                                        &nbsp;Valid Driver’s License
                                    </Text>
                                    <Text style={{ margin: 5, fontSize: 15, marginTop: 7, marginLeft: 30 }}>{profile.userDrivingLicenseFlag == 1 ? 'Yes' : 'No'}</Text>
                                </SafeAreaView>
                            </View>
                        </View>
                        {/* <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity={.5}
                        onPress={() => pressHandler3(profile)}
                    >
                        <Text style={styles.EditButtonTextStyle}>
                            <FontAwesome5 name="user-edit" size={18} color="white" />
                            &nbsp;Edit Advanced Profile
                        </Text>
                    </TouchableOpacity> */}
                        <View style={{ flexDirection: "row" }}>
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
                            <TouchableOpacity
                                style={styles.SignUpButtonStyle}
                                activeOpacity={.5}
                                onPress={pressHandler4}
                            >
                                <Text style={styles.TextStyle}>
                                    <FontAwesome5 name="times-circle" size={20} color="white" />
                                    &nbsp;Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
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
    header: {
        height: '8%',
        backgroundColor: '#360A65',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    profileHeader: {
        flexDirection: 'row',
        height: '8%',
        backgroundColor: '#360A65',
        paddingLeft: 30
    },
    profileContainer: {
        margin: 30
    },
    profileContainerHome: {
        marginLeft: 40,
        marginRight: 25,
        marginTop: 10,
        // marginTop: 35,
        paddingHorizontal: 20,
        paddingTop: 20,
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
    profilePictureStyleHome: {
        borderWidth: 2,
        borderColor: '#F9A132',
        borderRadius: 50,
        // padding: 3,
        width: 54,
        // marginBottom: 20,s
        // marginTop: -50,
        marginLeft: -50
    },
    profileTextContainerHome: {
        marginLeft: 12,
        marginTop: -60
    },
    profileNameTextHome: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: 'bold',
        color: '#360A65'
    },
});