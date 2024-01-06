import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/homeStack';


global.baseUrl = 'https://fludder.io/admin/api/';
global.webBaseUrl = 'https://fludder.io/admin/WebApi/';

export default function App() {
  // const [IsReady, SetIsReady] = useState(false);

  // const LoadFonts = async () => {
  //   await useFonts();
  // };

  // if (!IsReady) {
  //   return (
  //     <AppLoading
  //       startAsync={LoadFonts}
  //       onFinish={() => SetIsReady(true)}
  //       onError={() => {}}
  //     />
  //   );
  // }
  return (
    // <View>
      <Navigator  />
      // {/* <StatusBar style="auto" /> */}
    // </View> 
  );
}
