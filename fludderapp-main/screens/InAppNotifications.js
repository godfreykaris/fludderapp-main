import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TouchableHighlight, ScrollView, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import Footer from '../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { FlatList } from 'react-native-gesture-handler';

export default function InAppNotifications({ navigation }) {
    let [fontsLoaded] = useFonts({ Poppins_600SemiBold, Poppins_400Regular });
    const [loading, setLoading] = useState(true)
    const [inAppNotifications, setInAppNotifications] = useState()
    const [closeNotificationFlag, setCloseNotificationFlag] = useState()

    function getDateFormatted(myDate) {
        let dDate = myDate.split(' ');
        let d = new Date(dDate[0]);
        let dd = d.toString().split(' ');
        return dd[1] + " " + dd[2] + " " + dd[3];
    }

    useEffect(() => {
        setLoading(true)
        const getInAppNotifications = async () => {
            console.log("dddddddddddddddddd");
            loginId = await AsyncStorage.getItem('loginId')
            fetch(baseUrl + 'getInAppNotifications', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loginId: loginId }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json)
                        setInAppNotifications(json.inAppNotifications)
                    else
                        setInAppNotifications("");
                    setLoading(false)
                });

        }
        getInAppNotifications();
    }, [closeNotificationFlag]);

    const closeNotification = (requestId) => {
        setLoading(true)
        fetch(baseUrl + 'closeNotification', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestId: requestId }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === 1)
                    setCloseNotificationFlag(requestId)
                setLoading(false)
            });
    }

    if (!fontsLoaded)
        return <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
    else {
        return (
            <>
                <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
                <View style={{ marginTop: Constants.statusBarHeight }} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Notifications</Text>
                    </View>
                    {
                        loading ?
                            <Spinner visible={fontsLoaded} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
                            :
                            <FlatList
                                keyExtractor={(item) => item.requestId}
                                data={inAppNotifications}
                                renderItem={({ item }) => (
                                    <View style={styles.notificationContainer}>
                                        <View style={{ backgroundColor: 'white', alignItems: 'flex-end', borderRadius: 50 }}>
                                            <View style={styles.dateTextGreen}>
                                                <Text style={{ paddingVertical: 5, paddingHorizontal: 15 }}>
                                                    {getDateFormatted(item.createdOn)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            {
                                                item.companyLogo ?
                                                    <Image
                                                        source={{ uri: "https://fludder.io/admin/uploads/companyLogos/" + item.companyLogo }}
                                                        style={{ width: 100, height: 100, alignSelf: 'flex-start', borderRadius: 100, marginLeft: 10, marginBottom: 10 }}
                                                    />
                                                    :
                                                    <FontAwesome style={{ width: 100, height: 100, alignSelf: 'flex-start', borderRadius: 100, marginLeft: 10, marginBottom: 10 }} name="bank" size={70} color="gray" />
                                            }
                                            <View style={styles.notificationText}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {
                                                        item.requestType === 'interview' ?
                                                            <AntDesign name="exclamationcircle" size={24} color="#F9A132" />
                                                            :
                                                            <Feather name="check-circle" size={24} color="green" />
                                                    }
                                                    <Text style={{ fontFamily: 'Poppins_600SemiBold', marginTop: 2, marginLeft: 5, color: '#360A65', textTransform: 'capitalize' }}>{item.requestType} Request</Text>
                                                </View>
                                                <View
                                                    style={{
                                                        marginVertical: 10,
                                                        borderBottomColor: 'black',
                                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                                    }}
                                                />
                                                <Text style={{ fontFamily: 'Poppins_400Regular', margin: 10 }}>{item.message}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => closeNotification(item.requestId)}
                                            style={{ alignSelf: 'flex-end', margin: 10 }}>
                                            <Text style={{ fontFamily: 'Poppins_600SemiBold', alignSelf: 'center', color: '#360A65' }}>
                                                Okay
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                    }

                </View>
                <Footer navigation={navigation} />
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    header: {
        flexDirection: 'row',
        height: '8%',
        backgroundColor: '#360A65',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        justifyContent: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
        alignSelf: 'center',
    },
    notificationContainer: {
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
    dateTextGreen: {
        backgroundColor: '#EBFFF0',
        borderTopEndRadius: 10,
        fontFamily: 'Poppins_400Regular'
    },
    notificationText: {
        width: 250,
        padding: 10
    },
})
