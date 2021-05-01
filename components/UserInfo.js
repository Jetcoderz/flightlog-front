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
  let enLabels = ["Purpose", "Entertainment", "Meal", "SeatNo", "Comments"];
  let jpLabels = ["目的", "エンターテイメント", "食事", "席番号", "コメント"];
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
        <View style={{ flexDirection: "row" }}>
          <View style={styles.enterItem}>
            <Text>{thisFlight.purpose}</Text>
          </View>
        </View>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>{labels[1]}</Text>
        <View style={{ flexDirection: "row" }}>
          {thisFlight.entertainment.map((e) => (
            <View style={styles.enterItem}>
              <Text>{e}</Text>
            </View>
          ))}
        </View>
      </View>
      {thisFlight.meal !== "" && (
        <View style={styles.eachUserInfoContiner}>
          <Text style={styles.eachUserInfoTitle}>{labels[2]}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.enterItem}>
              <Text>{thisFlight.meal}</Text>
            </View>
          </View>
        </View>
      )}
      {thisFlight.seatNo !== "" && (
        <View style={styles.eachUserInfoContiner}>
          <Text style={styles.eachUserInfoTitle}>{labels[3]}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.enterItem}>
              <Text>{thisFlight.seatNo}</Text>
            </View>
          </View>
        </View>
      )}
      {thisFlight.review !== "" && (
        <View style={styles.eachUserInfoContiner}>
          <Text style={styles.eachUserInfoTitle}>{labels[4]}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.enterItem}>
              <Text>{thisFlight.review}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    alignItems: "center",
  },
  eachUserInfoContiner: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  eachUserInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#298BD9",
    marginBottom: 5,
  },
  eachUserInfo: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
    backgroundColor: "lightgray",
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  enterItem: {
    backgroundColor: "lightgray",
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 16,
  },
});
