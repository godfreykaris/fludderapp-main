import React, { useState, useRef } from 'react';
import {
    StyleSheet, View, Image, TouchableOpacity, Alert, Modal,
    TouchableHighlight, Text, useWindowDimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialIcons, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PlayerReference from '../screens/PlayerReference';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Spinner from 'react-native-loading-spinner-overlay';
// export default function Footer({navigation}) {
    const Footer = React.forwardRef(({ 
        navigation
    }, ref) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [userType, setUserType] = useState('');
    const pressHandler1 = () => {
        if (ref && ref.current)
            ref.current.pauseAsync();
        if (userType === 'P')
            navigation.navigate('Categories');
        else
            navigation.push('NewHomeScreen');
    }
    const pressHandler2 = () => {
        if (ref && ref.current)
            ref.current.pauseAsync();
        navigation.navigate('AllMyQuestions');
    }
    const pressHandler3 = () => {
        if (ref && ref.current)
            ref.current.pauseAsync();
        navigation.push('AllMyAnswers');
    }
    const pressHandler4 = () => {
        if (ref && ref.current)
            ref.current.pauseAsync();
        navigation.navigate('StudentAnswers');
    }
    let userId;
    const pressHandler5 = async () => {
        if (ref && ref.current)
            ref.current.pauseAsync();
        const userType = await AsyncStorage.getItem('userType');
        userType === 'P' ?
            userId = await AsyncStorage.getItem('professionalId')
            :
            userId = await AsyncStorage.getItem('userInformationId')
        if (userType === 'P')
            navigation.navigate('ProfessionalProfile', { userType, userId });
        else
            navigation.push('UserProfile', { userType, userId });
    }
    const pressHandler6 = () => {
        // Alert.alert(
        //     'Logut',
        //     'Are you sure you want to logout?',
        //     [
        //     //   {
        //     //     text: 'Ask me later',
        //     //     onPress: () => console.log('Ask me later pressed')
        //     //   },
        //       {
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel'
        //       },
        //       { text: 'OK', onPress: async () => {
        //           navigation.navigate('Login'); 
        //           await AsyncStorage.setItem('loginState',''); 
        //         } }
        //     ],
        //     { cancelable: false }
        //   );
        if (ref && ref.current)
            ref.current.pauseAsync();
        if(userType!=='U')
            setModalVisible(!modalVisible);
        else
            navigation.push('InAppNotifications');
    }

    const pressHandler7 = () => {
        navigation.navigate('Chat');
    }


    // const getUserType = async () => {
    //     let userId;
    //     userId = await AsyncStorage.getItem('professionalId')
    //     return userId;
    // }

    let uId;
    const asynchronousFunction = async () => {
        const userId = await AsyncStorage.getItem('userType')
        return userId
    }

    const mainFunction = async () => {
        const result = await asynchronousFunction()
        return result
    }

    (async () => {
        uId = await mainFunction();
        setUserType(uId);
    })()

    // console.log(getUserType()); 

    let [fontsLoaded] = useFonts({ Poppins_400Regular });
    if (!fontsLoaded)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else {
        return (
            <View style={{ backgroundColor: 'white', }}>
                <View style={styles.bottomView} >
                    {
                        userType === 'U' ?
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler1}
                                style={{ width: 100 }}
                            >
                                {/* <Image source={require('../assets/home-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <Entypo name="home" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Home</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler1}
                            >
                                {/* <Image source={require('../assets/home-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <Entypo name="home" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Home</Text>
                                </View>
                            </TouchableOpacity>
                    }

                    {
                        userType === 'P' ?
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler2}
                            >
                                {/* <Image source={require('../assets/question-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <MaterialCommunityIcons name="file-question" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Questions</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                    }
                    {
                        userType === 'U' ?
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler3}
                                style={{ width: 100 }}
                            >
                                {/* <Image source={require('../assets/answer-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <Entypo name="folder" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Answers</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                    }
                    {
                        userType === 'P' ?
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler4}
                            >
                                {/* <Image source={require('../assets/review-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <Entypo name="folder" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Answers</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                    }

                    {/* {
                userType === 'U' ?
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={pressHandler7}
                    >
                        <Image source={require('../assets/chatIcon.png')} style={styles.footerIcon} />
                    </TouchableOpacity>
                    : null
            } */}
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={pressHandler6}
                        style={{ width: 105 }}
                    >
                        {/* <Image source={require('../assets/logout-1.png')} style={styles.footerIcon} /> */}
                        {
                            userType === 'U' ?
                                <View style={styles.footerIcon}>
                                    <Ionicons name="notifications" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Notifications</Text>
                                </View>
                                :
                                <View style={styles.footerIcon}>
                                    <FontAwesome name="power-off" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Sign Out</Text>
                                </View>
                        }
                    </TouchableOpacity>
                    {
                        userType === 'U' ?
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler5}
                                style={{ width: 100 }}
                            >
                                {/* <Image source={require('../assets/profile-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <FontAwesome name="user" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Profile</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={pressHandler5}
                            >
                                {/* <Image source={require('../assets/profile-icon.png')} style={styles.footerIcon} /> */}
                                <View style={styles.footerIcon}>
                                    <FontAwesome name="user" size={24} color="white" />
                                    <Text style={styles.footerMenuText}>Profile</Text>
                                </View>
                            </TouchableOpacity>

                    }


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
                                    {
                                        userType === 'U' ?
                                            <Text style={styles.modalText}>No new notifications found!</Text>
                                            :
                                            <Text style={styles.modalText}>Are you sure, you want sign out?</Text>
                                    }

                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={styles.textStyle}>Close</Text>
                                        </TouchableHighlight>
                                        {
                                            userType === 'P' ?
                                                <TouchableHighlight
                                                    style={{ ...styles.openButton, backgroundColor: '#37266b' }}
                                                    onPress={async () => {
                                                        await AsyncStorage.setItem('loginState', '');
                                                        setModalVisible(!modalVisible);
                                                        navigation.push('Login');
                                                    }}>
                                                    <Text style={styles.textStyle}>Yes</Text>
                                                </TouchableHighlight>
                                                :
                                                null
                                        }
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </View>
        );
    
    }
    
}
    )
const styles = StyleSheet.create({
    bottomView: {
        flexDirection: 'row',
        // width: '100%',
        // height: Platform.OS === 'ios' ? 60 : 60,
        height: 60,
        // height: 60, 
        // backgroundColor: '#37266b',
        backgroundColor: '#F9A132',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        // borderTopColor: 'white',
        // borderTopWidth: 2,
        // position: 'relative',
        // borderTopEndRadius: 20,
        // borderTopStartRadius: 20,
        // marginHorizontal: 20
    },
    footerIcon: {
        // height: Platform.OS === 'ios' ? 35 : 30,
        // width: Platform.OS === 'ios' ? 35 : 30,
        // height: 30, 
        // width:30, 
        // resizeMode: 'stretch',
        marginHorizontal: 8,
        marginBottom: 10,
        alignItems: 'center'
    },
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        margin: 50,
        marginTop: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
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
        marginHorizontal: 10
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
    footerMenuText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular'
    }
});

export default Footer;