import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  PickerIOSComponent,
} from "react-native";

export default function UserInfo({ thisFlight }) {
  return (
    <View style={styles.userInfo}>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>Purpose: </Text>
        <Text style={styles.eachUserInfo}>{thisFlight.purpose}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>Entertainment: </Text>
        <Text style={styles.eachUserInfo}>{thisFlight.entertainment}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>Meal: </Text>
        <Text style={styles.eachUserInfo}>{thisFlight.meal}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>SeatNo: </Text>
        <Text style={styles.eachUserInfo}>{thisFlight.seatNo}</Text>
      </View>
      <View style={styles.eachUserInfoContiner}>
        <Text style={styles.eachUserInfoTitle}>Review: </Text>
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
