import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import FlightList from "./components/FlightList";
import Flight from "./components/Flight";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Login />
      <Flight />
      <FlightList />
    </View>
  );
}
