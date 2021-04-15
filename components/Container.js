import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Navbar from "./Navbar";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";

function flightlist() {
  return <FlightList />;
}

function addflight() {
  return <AddFlight />;
}

const Drawer = createDrawerNavigator();

export default function Container() {
  return (
    <NavigationContainer>
      <Navbar />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={flightlist} />
        <Drawer.Screen name="Add Flight" component={addflight} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
