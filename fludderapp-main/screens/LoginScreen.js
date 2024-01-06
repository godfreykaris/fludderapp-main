import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Title } from 'react-native-paper';

// import FormButton from '../components/FormButton';
// import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);
  
  // const email_id = navigation.getParam('email_id');
  // const password = navigation.getParam('password');
  // useEffect( async() => {
    // login(email_id, password)
  // },[])

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const email_id = await AsyncStorage.getItem("email_id");
      const password = await AsyncStorage.getItem("password");
      console.log("email_id : ",email_id);
      console.log("password : ",password);
      login(email_id, password)
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

//   useEffect( async() => {
//     const email_id = await AsyncStorage.getItem("email_id");
//     const password = await AsyncStorage.getItem("password");
//     login(email_id, password)
// },[])
// loginHandler();


  // if (loading) {
    return <Loading />;
  // }

  // return (
  //     <View style={styles.container}>
  //       <Title style={styles.titleText}>Welcome!</Title>
  //       <FormInput
  //           labelName="Email"
  //           value={email}
  //           autoCapitalize="none"
  //           onChangeText={(userEmail) => setEmail(userEmail)}
  //       />
  //       <FormInput
  //           labelName="Password"
  //           value={password}
  //           secureTextEntry={true}
  //           onChangeText={(userPassword) => setPassword(userPassword)}
  //       />
  //       <FormButton
  //           title="Login"
  //           modeValue="contained"
  //           labelStyle={styles.loginButtonLabel}
  //           onPress={() => login(email, password)}
  //       />
  //       <FormButton
  //           title="Sign up here"
  //           modeValue="text"
  //           uppercase={false}
  //           labelStyle={styles.navButtonText}
  //           onPress={() => navigation.navigate('Signup')}
  //       />
  //     </View>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f5f5f5',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleText: {
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   loginButtonLabel: {
//     fontSize: 22,
//   },
//   navButtonText: {
//     fontSize: 16,
//   },
// });