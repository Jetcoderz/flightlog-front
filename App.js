import React from "react";
import { View } from "react-native";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import FlightList from "./components/FlightList";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <View>
      <Navbar />
      <Login />
      <FlightList />
      <Sidebar />
    </View>
  );
}
