import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

const DEFAULT = {
  illustration:
    "https://flightlogpics.s3-ap-northeast-1.amazonaws.com/addimg.png",
};

const screenWidth = 270;

export default function Picture() {
  const state = useSelector((state) => state);
  const [entries, setEntries] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");
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
  }, []);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log("HERE", pickerResult);
    // let postURL =
    //   "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/awsPUT/" +
    //   pickerResult.uri;
    // console.log("local path", pickerResult.uri);
    // console.log("POSTURL", postURL);
    const response = await fetch(
      "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/awsPUT/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fflightlog-front-a0f8a6b7-2470-43f7-ae62-e6712aa44e76/ImagePicker/5fe97a59-58ad-4c97-9ef3-83ade8f8c336.jpg"
    );
    // const jsonRes = await response.json();
    console.log("RESOPNSE", response.url);
    const newResponse = await fetch(response.url, {
      method: "PUT",
      body: pickerResult,
    });
    console.log("--------PUT RESPONSE", JSON.stringify(newResponse));
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
      <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
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
