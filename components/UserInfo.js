import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PickerIOSComponent,
} from "react-native";
import { useSelector } from "react-redux";

export default function UserInfo({ thisFlight }) {
  const state = useSelector((state) => state);

  let labels;
  let enLabels = [
    "Purpose:",
    "Entertainment:",
    "Meal:",
    "SeatNo:",
    "Comments:",
  ];
  let jpLabels = ["目的", "エンターテインメント", "食事", "席番号", "コメント"];
  if (state.language === "en") {
    labels = enLabels;
  }
  if (state.language === "jp") {
    labels = jpLabels;
  }
  return (
    <View style={styles.userInfo}>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>{labels[0]}</Text>
        <Text style={styles.eachUserInfo}>{thisFlight.purpose}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>{labels[1]}</Text>
        <Text style={styles.eachUserInfo}>{thisFlight.entertainment}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>{labels[2]}</Text>
        <Text style={styles.eachUserInfo}>{thisFlight.meal}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>{labels[3]}</Text>
        <Text style={styles.eachUserInfo}>{thisFlight.seatNo}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>{labels[4]}</Text>
        <Text style={styles.eachUserInfo}>{thisFlight.review}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    alignItems: "center",
  },
  eachUserInfoContiner: {
    backgroundColor: "lightgray",
    height: 35,
    height: "auto",
    width: "90%",
    margin: 5,
    justifyContent: "center",
    borderRadius: 10,
    padding: 12,
    shadowOpacity: 0.25,
    elevation: 1,
  },
  eachUserInfoTitle: {
    color: "white",
  },
  eachUserInfo: {
    fontSize: 18,
  },
});
