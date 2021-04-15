import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Navbar from "./Navbar";
import FlightList from "./FlightList";
import Sidebar from "./Sidebar";

function flightlist() {
  return <FlightList />;
}

function sidebar() {
  return <Sidebar />;
}

const Drawer = createDrawerNavigator();

export default function Container() {
  return (
    <NavigationContainer>
      <Navbar />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={flightlist} />
        <Drawer.Screen name="Notifications" component={sidebar} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
