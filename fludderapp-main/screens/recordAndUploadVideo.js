import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { ProgressBar } from "react-native-paper";
import Constants from 'expo-constants';

export default function RecordAndUploadVideo() {
  const [selectedVideo, setUploadVideo] = useState(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {

    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Selected Video " + JSON.stringify(result.uri));

    if (!result.cancelled) {
      setUploadVideo(result.uri);
      console.log(selectedVideo)
      uploadVideo();
    }
  };

  const uploadVideo = () => {
    let formData = new FormData();
    formData.append("videoFile", {
      tmp_name: "uploadedVideoName",
      name: "uploadedVideoName",
      uri: selectedVideo,
      type: "video/mp4",
    });

    // Axios.post("http://app.fludderapp.com/api/uploadVideo", formData);

    Axios.request({
      method: "post",
      url: "https://fludder.io/admin/api/uploadVideo",
      data: formData,
      onUploadProgress: (p) => {
        //
        console.log((100 * p.loaded) / p.total);
        setPercent(parseInt((100 * p.loaded) / p.total));
      },
    }).then((data) => {
      console.log("response " + JSON.stringify(data.data));
      ToastAndroid.show(data.data.message, ToastAndroid.SHORT);
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Text style={{ marginVertical: 50 }}>{`${percent} %  uploaded  `}</Text>
      <View style={{ width: "100%", padding: 20 }}>
        <ProgressBar
          progress={percent / 100}
          color="red"
          style={{
            height: 20,
            marginVertical: 50,
            borderRadius: 20,
            width: "100%",
          }}
        />
      </View>

      {selectedVideo && (
        <Image
          source={{ uri: selectedVideo }}
          style={{ backgroundColor: "red", width: 200, height: 200 }}
        />
      )}
    </View>
  );
}
