import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import IMAGE from "./bg.jpg";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground source={IMAGE} style={styles.image}>
      {children}
    </ImageBackground>
  );
}
