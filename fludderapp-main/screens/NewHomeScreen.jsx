import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, ScrollView, Image } from 'react-native';
// import { WebView } from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from 'react-native-gesture-handler';
// import Footer from '../components/footer';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { Button } from 'react-native-paper';
import Footer from '../components/footer';
import VideoPlayer from 'expo-video-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToggleSwitch from "toggle-switch-react-native";
import Constants from 'expo-constants';

export default function NewHomeScreen({ navigation }) {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
    const [closeProfilePopup, setCloseProfilePopup] = React.useState("");
    // console.log("closeProfilePopup : ",closeProfilePopup);
    const [closeAnswerPopup, setCloseAnswerPopup] = useState("");
    const sendToCategory = () => {
        if (video && video.current)
            video.current.pauseAsync();
        navigation.navigate('Categories');
    }
    const [ratingOutOfFive, setRatingOutOfFive] = useState(0);
    const [ratingOutOfTen, setRatingOutOfTen] = useState(0);
    const [numberOfAnswers, setNumberOfAnswers] = useState(0);
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(true)
    const [makeProfileDiscoverable, setMakeProfileDiscoverable] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [answersModalVisible, setAnswersModalVisible] = useState(false);
    const [employmentProfilemodalVisible, setEmploymentProfileModalVisible] = useState(false);
    const [toggleFlag, setToggleFlag] = useState();
    const [userId, setUserId] = useState();
    let userType = "U"
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
    const getProfile = async () => {
        const userId = await AsyncStorage.getItem('userInformationId')
        const userType = await AsyncStorage.getItem('userType');
        console.log("userId : ", userId); console.log("userType : ", userType);
        if (userId != "" && userType != "") {
            if (await AsyncStorage.getItem("closeProfilePopup") !== "Y")
                await AsyncStorage.setItem("closeProfilePopup", "N");
            else
                setCloseProfilePopup("Y");
            if (await AsyncStorage.getItem("closeAnswerPopup") !== "Y")
                await AsyncStorage.setItem("closeAnswerPopup", "N");
            else
                setCloseAnswerPopup("Y");
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
                    // console.log("json", json);
                    if (json) {
                        setProfile(json);
                        if (json.userDiscoverableFlag == 1)
                            setMakeProfileDiscoverable(true)
                        setLoading(false)
                    }
                    else {
                        setLoading(false)
                        navigation.push('Login');
                    }
                });
        }
        else {
            setLoading(false)
            navigation.push('Login');
        }
    }
    useEffect(() => {
        getProfile();
        getRatingData()

        // return async () => {
        //     if(video)
        //         video.current.playAsync();
        // };
    }, []);

    const pressHandler = (isOn, user_information_id) => {
        if (numberOfAnswers > 0) {
            setToggleFlag(isOn)
            setUserId(user_information_id)
            if (isOn == false)
                setModalVisible(!modalVisible);
            else
                setEmploymentProfileModalVisible(!employmentProfilemodalVisible)
        }
        else
            setAnswersModalVisible(true)
    }

    const changeMakeProfileDiscoverable = () => {
        setLoading(true)
        fetch(baseUrl + 'chnageProfileDiscoverable', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_information_id: userId
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status == 1)
                    setMakeProfileDiscoverable(false)
                else
                    setMakeProfileDiscoverable(false)
            });
        setModalVisible(!modalVisible);
        setLoading(false)
    }

    const sendToEmploymetProfile = () => {
        if (video && video.current)
            video.current.pauseAsync();
        setEmploymentProfileModalVisible(!employmentProfilemodalVisible);
        navigation.push('UserAdvancedProfile', { profile, userType, userId })
    }

    // const sendToEmploymetProfile = () => {
    //     let utype = "U"
    //     // setEmploymentProfileModalVisible(!employmentProfilemodalVisible)
    //     // navigation.navigate('EditAdvancedProfile', { profile, utype, userInformationId });
    // }

    const changeCloseProfilePopup = async () => {
        await AsyncStorage.setItem("closeProfilePopup", "Y")
        setCloseProfilePopup("Y")
    }
    const changeCloseAnswerPopup = async () => {
        await AsyncStorage.setItem("closeAnswerPopup", "Y")
        setCloseAnswerPopup("Y")
    }
    if (!fontsLoaded && loading)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else {
        return (
            <>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                <View style={{ marginTop: Constants.statusBarHeight }} />
                {/* <View style={{ backgroundColor: '#ffffff', height: "4%" }} /> */}
                <View style={styles.header}>
                    <Image
                        source={require('../assets/FludderButterflyTransperant.png')}
                        style={{ width: 60, height: 60, alignSelf: 'center', marginLeft: 10 }}
                    />
                    <Text style={styles.headerText}>Home</Text>
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
                            <ScrollView style={{ backgroundColor: '#fff' }}>
                                {closeProfilePopup !== "Y" ?
                                    <View elevation={5} style={styles.infoContainer}>
                                        <View style={styles.iconStyle}>
                                            <AntDesign name="exclamationcircle" size={40} color="#360A65" />
                                        </View>
                                        <View style={styles.cloaseIconStyle}>
                                            <AntDesign name="closecircleo" size={24} color="#F9A132" onPress={() => changeCloseProfilePopup()} />
                                        </View>
                                        <Text style={styles.infoText}>
                                            Make sure to fill out your profile and employment profile to highlight your strengths and better your chances of getting hired.
                                        </Text>
                                    </View>
                                    :
                                    null
                                }
                                {!closeAnswerPopup ?
                                    <View elevation={5} style={styles.infoContainer}>
                                        <View style={styles.iconStyle}>
                                            <AntDesign name="exclamationcircle" size={40} color="#360A65" />
                                        </View>
                                        <View style={styles.cloaseIconStyle}>
                                            <AntDesign name="closecircleo" size={24} color="#F9A132" onPress={() => changeCloseAnswerPopup()} />
                                        </View>
                                        <Text style={styles.infoText}>
                                            Start answering questions so that you can boost your interviewing skills, get feedback from HR Pros, and get hired!
                                        </Text>
                                    </View>
                                    :
                                    null
                                }
                                <View style={styles.videoContainer}>
                                    <Video
                                        ref={video}
                                        style={styles.video}
                                        source={require('../assets/Fludder.mp4')}
                                        useNativeControls
                                        usePoster
                                        resizeMode={ResizeMode.CONTAIN}
                                        shouldPlay
                                        isLooping
                                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                                        // isMuted={true}
                                    />
                                </View>
                                <View elevation={5} style={styles.profileContainer}>
                                    <View style={styles.profilePictureStyle}>
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
                                    </View>
                                    <View style={styles.profileTextContainer}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.profileNameText}>
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
                                            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12, marginTop: 4 }}>Average Fludder Score: </Text>
                                            <Image
                                                source={{ uri: "https://fludder.io/admin/assets/images/ratings/" + ratingOutOfTen + ".png" }}
                                                style={{ width: 95, height: 22, marginRight: 5, marginTop: 2 }}
                                            />
                                            <Text style={{ marginTop: 3, fontSize: 16, fontFamily: 'Poppins_600SemiBold' }}>{ratingOutOfFive}</Text>
                                            <Text style={{ marginTop: 6, fontSize: 12, fontFamily: 'Poppins_600SemiBold' }}>/5</Text>
                                        </View>
                                        <View
                                            style={{
                                                marginVertical: 5,
                                                borderBottomColor: 'black',
                                                borderBottomWidth: StyleSheet.hairlineWidth,
                                            }}
                                        />
                                        <ToggleSwitch
                                            isOn={makeProfileDiscoverable}
                                            onColor="#360A65"
                                            // offColor="red"
                                            label="Make my profile discoverable"
                                            labelStyle={{
                                                color: "#360A65",
                                                fontFamily: 'Poppins_600SemiBold',
                                                fontSize: 12,
                                                marginBottom: 10,
                                            }}
                                            trackOnStyle={{ marginBottom: 15 }}
                                            trackOffStyle={{ marginBottom: 15 }}
                                            size="large"
                                            onToggle={(isOn) => pressHandler(isOn, profile.user_information_id)}
                                        />
                                    </View>
                                </View>
                                <Button style={styles.answerNowButton} color="white" uppercase={false} onPress={() => sendToCategory()}>
                                    {/* <View style={{ marginTop: -10, marginRight: 10 }}> */}
                                    <Text style={styles.buttonText}>
                                        Answer Questions Now
                                    </Text>
                                    {/* </View> */}
                                    <AntDesign name="arrowright" size={20} color="white" style={{ textAlign: "center", }} />
                                </Button>
                            </ScrollView>

                        </>
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
                                        <Text style={styles.modalText}>Are you sure you want to change profile mode?</Text>
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
                                                onPress={
                                                    async () => {
                                                        changeMakeProfileDiscoverable()
                                                    }
                                                }
                                            >
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
                {
                    employmentProfilemodalVisible ?
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={employmentProfilemodalVisible}
                                onRequestClose={() => {
                                    // Alert.alert('Modal has been closed.');
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>To make your profile viewable to companies, you need to answer at least one question and complete your <Text style={{ ...styles.modalText, color: 'blue', textDecorationLine: 'underline' }} onPress={async () => { sendToEmploymetProfile() }}>Employment Profile.</Text></Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: '#37266b', alignSelf: 'center', height: 60, width: 150 }}
                                                onPress={() => {
                                                    setEmploymentProfileModalVisible(!employmentProfilemodalVisible);
                                                }}>
                                                <Text style={{ ...styles.textStyle, paddingTop: 10 }}>Cancel</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: '#37266b', width: 150 }}
                                                onPress={
                                                    async () => {
                                                        sendToEmploymetProfile()
                                                    }
                                                }
                                            >
                                                <Text style={styles.textStyle}>Employment Profile</Text>
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
                    answersModalVisible ?
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={answersModalVisible}
                                onRequestClose={() => {
                                    // Alert.alert('Modal has been closed.');
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>To make you profile public, you have to answer at least one question!</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableHighlight
                                                style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                                onPress={() => {
                                                    setAnswersModalVisible(!answersModalVisible);
                                                }}>
                                                <Text style={styles.textStyle}>Okay</Text>
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
                    !loading ?
                        <Footer navigation={navigation} ref={video} />
                        :
                        null
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: '8%',
        backgroundColor: '#360A65',
        // justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    },
    headerText: {
        width: 280,
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        alignSelf: 'center',
        // marginLeft: -15
    },
    infoContainer: {
        margin: 40,
        marginTop: 35,
        marginBottom: 0,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        alignItems: 'center'
    },
    infoText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#360A65',
        marginBottom: -10
    },
    iconStyle: {
        borderWidth: 2,
        borderColor: '#F9A132',
        borderRadius: 50,
        padding: 5,
        width: 54,
        // marginBottom: 10,
        marginTop: -50
    },
    cloaseIconStyle: {
        position: 'absolute',
        right: -10,
        top: -10,
    },
    video: {
        alignSelf: 'center',
        width: 310,
        height: 174,
        borderRadius: 10,
    },
    videoContainer: {
        marginHorizontal: 40,
        marginVertical: 10,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        alignItems: 'center'
    },
    profileContainer: {
        marginHorizontal: 40,
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
    profilePictureStyle: {
        borderWidth: 2,
        borderColor: '#F9A132',
        borderRadius: 50,
        // padding: 3,
        width: 54,
        // marginBottom: 20,s
        // marginTop: -50,
        marginLeft: -50
    },
    profileTextContainer: {
        marginLeft: 12,
        marginTop: -60
    },
    profileNameText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        fontWeight: 'bold',
        color: '#360A65'
    },
    answerNowButton: {
        backgroundColor: '#F9A132',
        borderWidth: 0,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 24,
        paddingHorizontal: 35,
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
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
        width: 107,
        backgroundColor: '#f7901f',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5
    },
    textStyle: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        marginHorizontal: 18
    },
    modalText: {
        padding: 10,
        marginBottom: 35,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
})
