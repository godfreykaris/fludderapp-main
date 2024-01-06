import React, { useContext } from 'react';
// import { StyleSheet, View, AsyncStorage } from 'react-native';
// import { IconButton, Title } from 'react-native-paper';

// import FormButton from '../components/FormButton';
// import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({ navigation }) {
  // const [displayName, setDisplayName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);
  // const user_name = navigation.getParam('user_name');
  // const email_id = navigation.getParam('email_id');
  // const password = navigation.getParam('password');
  // useEffect( async() => {
    // register(user_name, email_id, password)
  // },[])

  const registerHandler = async () => {
    const user_name = await AsyncStorage.getParam('user_name');
    const email_id = await AsyncStorage.getItem("email_id");
    const password = await AsyncStorage.getItem("password");
    register(user_name, email_id, password)
}
registerHandler();

  // if (loading) {
    return <Loading />;
  // }

  // return (
  //     <View style={styles.container}>
  //       <Title style={styles.titleText}>Let's get started!</Title>
  //       <FormInput
  //           labelName="Display Name"
  //           value={displayName}
  //           autoCapitalize="none"
  //           onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
  //       />
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
  //           title="Signup"
  //           modeValue="contained"
  //           labelStyle={styles.loginButtonLabel}
  //           onPress={() => register(displayName, email, password)}
  //       />
  //       <IconButton
  //           icon="keyboard-backspace"
  //           size={30}
  //           style={styles.navButton}
  //           color="#5b3a70"
  //           onPress={() => navigation.goBack()}
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
//     fontSize: 18,
//   },
//   navButton: {
//     marginTop: 10,
//   },
// });