import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SignUpOptions({ navigation }) {

    function pressHandler(userType) {
        navigation.navigate('SignUp',{userType});
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/signupBackground2.jpg')} style={styles.backgroundImage}>
                <View style={styles.whiteOverlay}>
                    <Image source={require('../assets/Fludder-Logo-Transparant.png')} style = {styles.image} />
                    <Text style={styles.roleText}>Select your role!</Text>
                    <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity = { .5 }
                        onPress={() =>  pressHandler('user') }
                    >
                        <Text style={styles.TextStyle}> I am a job seeker! </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.SignUpButtonStyle}
                        activeOpacity = { .5 }
                        onPress={() =>  pressHandler('professional') }
                    >
                        <Text style={styles.TextStyle}> I am a professional! </Text>
                    </TouchableOpacity>
                    </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    whiteOverlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    image: {
        height: 70, 
        width:'70%', 
        resizeMode : 'stretch', 
        margin: 10, 
        marginBottom: 100, 
        marginTop: 40
    },
    SignUpButtonStyle: {
      marginTop:40,
      marginHorizontal: 20,
      paddingTop:10,
      paddingBottom:10,
      borderRadius:30,
      borderWidth:1,
      borderColor: '#37266b',
    },
    TextStyle:{
        color:'#37266b',
        textAlign:'center',
        paddingHorizontal:50,
        fontSize: 22,
        fontWeight: 'bold',
    },
    roleText:{
        color:'#f7901f',
        textAlign:'center',
        paddingHorizontal:50,
        fontSize: 22,
        fontWeight: 'bold'
    },
})