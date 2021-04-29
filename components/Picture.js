import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const DEFAULT = {
  illustration:
    "https://flightlogpics.s3-ap-northeast-1.amazonaws.com/addimg.png",
};
const screenWidth = 270;

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
        photoObj["illustration"] = photo.url;
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

  const renderItem = ({ item, index }, parallaxProps) => {
    if (index === entries.length - 1) {
      return (
        <TouchableOpacity onPress={openImagePickerAsync}>
          <View style={styles.item}>
            <ParallaxImage
              source={{ uri: item.illustration }}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0.4}
              {...parallaxProps}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.illustration }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity> */}
      {entries && (
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth + 100}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={entries}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: 180,
    height: 180,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1,
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
  },
});
