import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function UserFooter({ navigation }) {
    const pressHandler1 = () => {
        navigation.navigate('Categories');
    }
    const pressHandler3 = () => {
        navigation.navigate('AllMyAnswers');
    }
    const pressHandler5 = () => {
        navigation.navigate('UserProfile');
    }
    return(
        <View style={styles.bottomView} >
            <TouchableOpacity
                activeOpacity = { .5 }
                onPress={ pressHandler1 }
            > 
                <Image source={require('../assets/home-icon.png')} style = {styles.footerIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity = { .5 }
                onPress={ pressHandler3 }
            >
                <Image source={require('../assets/answer-icon.png')} style = {styles.footerIcon} />
            </TouchableOpacity>    
            <TouchableOpacity
                activeOpacity = { .5 }
                onPress={ pressHandler5 }
            >
                <Image source={require('../assets/profile-icon.png')} style = {styles.footerIcon} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    bottomView:{
        flexDirection: 'row',
        width: '100%', 
        height: 43, 
        backgroundColor: '#37266b', 
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0,
      },
      footerIcon: {
        height: 30, 
        width:30, 
        resizeMode : 'stretch', 
        marginHorizontal: 25
      }
  });