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
import axios from "axios";

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
    console.log("---HERE---", pickerResult);
    console.log(" ");

    const resp = await axios.get(
      "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/awsPUT/whatever.jpg"
    );
    console.log("----------------", resp.data);
    console.log(" ");

    // const bodyFormData = new FormData();
    // bodyFormData.append("image", {
    //   name: "whatever",
    //   type: pickerResult.type,
    //   uri:
    //     Platform.OS === "android"
    //       ? pickerResult.uri
    //       : pickerResult.uri.replace("file://", ""),
    // });
    // console.log("is this right?", bodyFormData);
    // const anotherRes = await axios({
    //   method: "PUT",
    //   url: resp.data,
    //   // body: bodyFormData,
    //   body: pickerResult.uri,
    //   // headers: {
    //   //   // "Content-Type": "multipart/form-data",
    //   //   // "Content-Type": "image/jpg",
    //   // },
    // });
    // console.log("******", anotherRes);

    //NEW ATTEMPT
    function urlToBlob(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response);
          }
        };
        xhr.open("GET", url);
        xhr.responseType = "blob"; // convert type
        xhr.send();
      });
    }

    const imageExt = pickerResult.uri.split(".").pop();
    const imageMime = `image/${imageExt}`;
    //let picture = await fetch(pickerResult.uri);
    //picture = await picture.blob();
    let picture = urlToBlob(pickerResult.uri);

    const imageData = new File([picture], "photo.jpg");

    const axiosResponse = await axios.put(
      resp.data,
      {
        data: imageData,
      },
      {
        headers: {
          "Content-Type": "",
        },
      }
    );
    console.log(axiosResponse);
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
