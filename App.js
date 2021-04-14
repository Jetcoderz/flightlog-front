import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <Sidebar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
