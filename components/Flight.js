import React from "react";
import { View, Text } from "react-native";
import Picture from "./Picture";
import FlightInfo from "./FlightInfo"
import UserInfo from "./UserInfo";

export default function Flight() {
  return (
    <View style={{ flex: 1 }}>
      <FlightInfo />
      <UserInfo />
      <Picture />
    </View>
  );
}
