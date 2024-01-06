import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class App extends React.Component {
  constructor(props){
    super(props)    
    this.camera=undefined
    this.state = {permissionsGranted:false,bcolor:'red'}
    this.takeFilm = this.takeFilm.bind(this)
  }

  async componentWillMount() {    
    let cameraResponse = await Permissions.askAsync(Permissions.CAMERA)
    if (cameraResponse.status == 'granted'){
      let audioResponse = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (audioResponse.status == 'granted'){
        this.setState({ permissionsGranted: true });
      }
    }                  
  }

  takeFilm(){    
    let self = this;
    if (this.camera){
      this.camera.recordAsync().then(data => self.setState({bcolor:'green'}))
    }    
  }

  render() {    
    if (!this.state.permissionsGranted){
      return <View><Text>Camera permissions not granted</Text></View>
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{ flex: 1 }}>
            <Camera ref={ref => this.camera = ref} style={{flex: 0.3}} ></Camera>
          </View>
          <TouchableOpacity style={{backgroundColor:this.state.bcolor, flex:0.3}} onPress={() => {

            if(this.state.cameraIsRecording){
              this.setState({cameraIsRecording:false})
              this.camera.stopRecording();
            }
            else{
              this.setState({cameraIsRecording:true})
              this.takeFilm();
            }
          }} />
        </View>)
    }
  }
}