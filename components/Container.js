import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Navbar from "./Navbar";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";

export default function Container(props) {
  function flightlist() {
    return <FlightList flightList={props.flightList} />;
  }

  function addflight() {
    return <AddFlight username={props.username} />;
  }

  const Drawer = createDrawerNavigator();
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
