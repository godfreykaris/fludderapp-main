import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";

const LoginWithGoogle = ({ navigation }) => {
  const signInAsync = async () => {
    console.log("LoginWithGoogle.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: ``,
        androidClientId: `415288817533`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginWithGoogle.js 17 | success, navigating to profile");
        navigation.navigate("Profile", { user });
      }
    } catch (error) {
      console.log("LoginWithGoogle.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={signInAsync} />
    </View>
  );
};

export default LoginWithGoogle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center"
    }
});