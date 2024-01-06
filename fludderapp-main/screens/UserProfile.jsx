import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, StyleSheet, Image, Modal, TouchableHighlight } from 'react-native'
import { FontAwesome, Feather, FontAwesome5, Entypo, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Footer from '../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export default function UserProfile({ navigation }) {
    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
    const userType = navigation.getParam('userType');
    const userId = navigation.getParam('userId');
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(true);
    const [accountDeleteModalVisible, setAccountDeleteModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);
    const [ratingOutOfFive, setRatingOutOfFive] = useState(0);
    const [ratingOutOfTen, setRatingOutOfTen] = useState(0);
    const getProfile = async () => {
        setLoading(true)
        await fetch(baseUrl + 'getProfile', {
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

                setTimeout(() => { setLoading(false) }, 500)
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
        getProfile();
        getRatingData();
    }, []);
    const pressHandler = (Profile) => {
        navigation.navigate('EditProfile', { profile, userType, userId });
    }
    const pressHandler1 = (Profile) => {
        navigation.push('CameraOptions', { profile, userType, userId });
    }
    const pressHandler2 = (Profile) => {
        setAccountDeleteModalVisible(!accountDeleteModalVisible);
    }
    const pressHandler3 = (Profile) => {
        navigation.push('UserAdvancedProfile', { profile, userType, userId });
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
                    console.log(json);
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
    const pressHandler4 = () => {
        setModalVisible(!modalVisible);
    }
    if (!fontsLoaded && loading)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else
        return (
            <>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                {/* <View style={{ backgroundColor: '#ffffff', height: 45 }} /> */}
                <View style={{ marginTop: Constants.statusBarHeight }} />
                <View style={{ ...styles.header, flexDirection: 'row', position: 'relative' }}>
                    <Text style={styles.headerText}>User Profile</Text>
                    <View style={{ display: 'flex', position: 'absolute', right: 0, marginRight: 10 }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'column', alignItems: 'center' }}
                            onPress={() => pressHandler(profile)}
                        >
                            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 100, width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.5)" }}>
                                <Feather name="edit" size={20} color="white" />
                            </View>
                            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Poppins_400Regular' }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                        <>
                            {/* <View style={styles.profileHeader}>
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
                                        <Image
                                            source={require('../assets/profile-icon.png')}
                                            style={{ width: 50, height: 50, borderRadius: 100 }}
                                        />
                                }
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', marginRight: 50 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome name="user" size={18} color="white" style={{ marginLeft: 10, marginBottom: 7 }} />
                                    <Text style={{ color: 'white', marginLeft: 5, fontFamily: 'Poppins_400Regular' }}>{profile.user_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome5 name="map-marker-alt" size={18} color="white" style={{ marginLeft: 10, marginTop: 3 }} />
                                    <Text style={{ color: 'white', marginLeft: 5, marginTop: 5, fontFamily: 'Poppins_400Regular' }}>{profile.user_city} {profile.user_city ? "-" : ""} {profile.userZipCode}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{ flexDirection: 'column', alignItems: 'center' }}
                                onPress={() => pressHandler(profile)}
                            >
                                <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 100, width: 30, height: 30, backgroundColor: "rgba(255,255,255,0.5)" }}>
                                    <Feather name="edit" size={18} color="white" />
                                </View>
                                <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Poppins_400Regular' }}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View> */}
                            <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
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
                                <View style={styles.profileContainer}>
                                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#919191', marginLeft: 40, marginBottom: 10 }}>About me</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name="vcard" size={24} color="#919191" />
                                        <Text style={{ marginLeft: 12, fontFamily: 'Poppins_600SemiBold', flex: 1, flexWrap: 'wrap' }}>
                                            {profile.user_description}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 10,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#919191', marginLeft: 40, marginBottom: 10 }}>Email</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="mail" size={24} color="#919191" />
                                        <Text style={{ marginLeft: 12, fontFamily: 'Poppins_600SemiBold', flex: 1, flexWrap: 'wrap' }}>
                                            {profile.email_id}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 10,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#919191', marginLeft: 40, marginBottom: 10 }}>Contact Number</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name="phone" size={24} color="#919191" />
                                        <Text style={{ marginLeft: 12, fontFamily: 'Poppins_600SemiBold', flex: 1, flexWrap: 'wrap' }}>
                                            {profile.user_contact_number}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 10,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#919191', marginLeft: 40, marginBottom: 10 }}>Degree or Specialty</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome5 name="graduation-cap" size={24} color="#919191" />
                                        <Text style={{ marginLeft: 12, fontFamily: 'Poppins_600SemiBold', flex: 1, flexWrap: 'wrap' }}>
                                            {profile.user_degree}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: 10,
                                            borderBottomColor: 'black',
                                            borderBottomWidth: StyleSheet.hairlineWidth,
                                        }}
                                    />
                                    {/* <Text style={{ fontFamily: 'Poppins_600SemiBold', color: '#919191', marginLeft: 40, marginBottom: 10 }}>Date of Birth</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <FontAwesome5 name="calendar-alt" size={24} color="#919191" />
                                    <Text style={{ marginLeft: 20, fontFamily: 'Poppins_600SemiBold', flex: 1, flexWrap: 'wrap', marginTop: 3 }}>
                                        03 Feb 1991
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginVertical: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                    }}
                                /> */}
                                    <TouchableOpacity onPress={() => pressHandler3(profile)} style={styles.advancedProfileButton}>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 45 }}>
                                            <Ionicons name="eye" size={24} color="white" />
                                            <Text style={{ color: 'white', fontFamily: 'Poppins_400Regular', fontSize: 18, marginLeft: 5 }}>
                                                View Employment Profile
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => pressHandler2(profile)} style={{ borderColor: '#F9A132', borderWidth: 1, borderRadius: 10 }}>
                                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                                <AntDesign name="delete" size={20} color="#F9A132" />
                                                <Text style={{ color: '#F9A132', fontFamily: 'Poppins_400Regular', fontSize: 16, marginLeft: 3 }}>
                                                    Delete Account
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={pressHandler4} style={{ borderColor: '#F9A132', borderWidth: 1, borderRadius: 10, marginLeft: 5 }}>
                                            <View style={{ flexDirection: 'row', margin: 10, paddingHorizontal: 30 }}>
                                                <FontAwesome name="power-off" size={20} color="#F9A132" />
                                                <Text style={{ color: '#F9A132', fontFamily: 'Poppins_400Regular', fontSize: 16, marginLeft: 3 }}>
                                                    Sign Out
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {
                                    accountDeleteModalVisible ?
                                        <View style={{ ...styles.centeredView, backgroundColor: 'white' }}>
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
                                        :
                                        null
                                }
                                {
                                    modalVisible ?
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
                                                        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <TouchableHighlight
                                                                style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                                                onPress={() => {
                                                                    setModalVisible(!modalVisible);
                                                                }}>
                                                                <Text style={styles.textStyle}>Cancel</Text>
                                                            </TouchableHighlight>
                                                            <TouchableHighlight
                                                                style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                                                onPress={async () => {
                                                                    await AsyncStorage.setItem('loginState', '');
                                                                    setModalVisible(!modalVisible);
                                                                    navigation.push('Login');
                                                                }}>
                                                                <Text style={styles.textStyle}>Yes</Text>
                                                            </TouchableHighlight>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                        :
                                        null
                                }
                            </ScrollView>
                            <Footer navigation={navigation} />
                        </>
                }

            </>
        )
}
const styles = StyleSheet.create({
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
    advancedProfileButton: {
        backgroundColor: '#F9A132',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        // paddingHorizontal: 55,
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
        width: 105,
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
        marginHorizontal: 15
    },
    modalText: {
        padding: 10,
        marginBottom: 35,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold"
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
})