import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);

  return (
    <View>
      {/* <TouchableOpacity> */}
      <Header
        leftComponent={{ icon: "menu", color: "#fff", cursor: "pointer" }}
        centerComponent={{ text: "Jetcoderz✈️", style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff", cursor: "pointer" }}
      />
      {/* </TouchableOpacity> */}
    </View>
  );
}
