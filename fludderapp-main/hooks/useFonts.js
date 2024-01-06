import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'ProximaNova-Light': require('../assets/fonts/FontsFree-Net-Proxima-Nova-Light.otf'),
    'MaterialCommunityIcons': require('../assets/fonts/MaterialIcons-Regular.ttf'),
  });