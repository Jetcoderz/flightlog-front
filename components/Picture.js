import React, { useRef, useState, useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const DEFAULT = {
  imgUrl: "https://flightlogpics.s3-ap-northeast-1.amazonaws.com/addimg.png",
};
const SLIDER_WIDTH = Dimensions.get("window").width + 200;

export default function Picture() {
  const state = useSelector((state) => state);
  const [entries, setEntries] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const getPhotoURLs = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/photos/" +
        String(state.selectedFlight);
      let response = await fetch(fullURL);
      let jsonRes = await response.json();
      let theURLs = await jsonRes.map((photo) => {
        const photoObj = {};
        photoObj["imgUrl"] = photo.url;
        return photoObj;
      });
      theURLs.push(DEFAULT);
      setEntries(theURLs);
    };
    getPhotoURLs();
  }, [refresh]);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    let cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (
      permissionResult.granted === false ||
      cameraPermissionResult.granted === false
    ) {
      alert("Permission to access camera and camera roll is required.");
      return;
    }

    const getBlob = async (fileuri) => {
      const resp = await fetch(fileuri);
      const imageBody = await resp.blob();
      return imageBody;
    };

    const uploadPhoto = async (asseturi) => {
      // Get signedUrl
      const curUID = uuidv4();
      const awsURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/awsPUT/" +
        curUID;
      const resp = await axios.get(awsURL);

      // Upload to S3
      const imageBody = await getBlob(asseturi);

      await fetch(resp.data, {
        method: "PUT",
        body: imageBody,
      });

      // Add to database
      const bodyObj = {
        url: `https://flightlogpics.s3-ap-northeast-1.amazonaws.com/${curUID}`,
        flightID: state.selectedFlight,
      };
      await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/photos",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyObj),
        }
      );
      setRefresh(!refresh);
    };

    let pickerResult;
    const getPhoto = async () => {
      pickerResult = await ImagePicker.launchImageLibraryAsync();
      const asset = await MediaLibrary.createAssetAsync(pickerResult.uri);
      if (pickerResult !== undefined) {
        await uploadPhoto(asset.uri);
      }
    };
    const takePhoto = async () => {
      pickerResult = await ImagePicker.launchCameraAsync();
      const asset = await MediaLibrary.createAssetAsync(pickerResult.uri);
      if (pickerResult !== undefined) {
        await uploadPhoto(asset.uri);
      }
    };
    Alert.alert("Add Photo", "Choose one:", [
      {
        text: "From Device",
        onPress: () => getPhoto(),
      },
      {
        text: "Take Photo",
        onPress: () => takePhoto(),
      },
      {
        text: "Cancel",
      },
    ]);
  };

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({ item, index }) => {
    if (index === entries.length - 1) {
      return (
        <View style={styles.container} key={index}>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image source={{ uri: item.imgUrl }} style={styles.image} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {entries && (
        <Carousel
          layout={"default"}
          ref={carouselRef}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={180}
          data={entries}
          renderItem={renderItem}
          useScrollView={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 180,
    marginTop: 30,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 180,
    height: 180,
  },
});
