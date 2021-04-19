import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const state = useSelector((state) => state);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const text = String(state.drawerFlag);

  return (
    <View>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => dispatch({ type: "ToggleDrawer", payload: true }),
        }}
        centerComponent={{ text: text, style: { color: "#fff" } }}
        rightComponent={{ icon: "home", color: "#fff", cursor: "pointer" }}
      />
    </View>
  );
}
