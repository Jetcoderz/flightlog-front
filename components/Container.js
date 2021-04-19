import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Navbar from "./Navbar";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";
import Map from "./Map";

export default function Container() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getFlights = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        state.username;
      let response = await fetch(fullURL);
      let jsonRes = await response.json();
      let theFlights = await jsonRes.map((flight) => flight);
      dispatch({ type: "SetFlightList", payload: theFlights });
    };
    getFlights();
  }, []);

  function flightlist() {
    return <FlightList />;
  }

  function addflight() {
    return <AddFlight />;
  }

  function map() {
    return <Map />;
  }

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Navbar />
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={flightlist} />
        <Drawer.Screen name="Add Flight" component={addflight} />
        <Drawer.Screen name="Map View" component={map} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
