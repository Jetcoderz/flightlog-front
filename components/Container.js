import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Auth from "@aws-amplify/auth";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";
import Map from "./Map";
import UserStats from "./UserStats";
import Collection from "./Collection";

const Drawer = createDrawerNavigator();

export default function Container() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getFlights = async () => {
      const fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      const response = await fetch(fullURL);
      const jsonRes = await response.json();
      const theFlights = await jsonRes.map((flight) => flight);
      dispatch({ type: "SetFlightList", payload: theFlights });
    };

    const getQrcodes = async () => {
      const res = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/qr-codes/" +
          Auth.user.attributes.email
      );
      const data = await res.json();
      dispatch({ type: "SetQrCodes", payload: data });
    };
    if (Auth.user.attributes.email) {
      getFlights();
      getQrcodes();
    }
  }, [Auth.user.attributes.email]);

  function flightlist({ navigation }) {
    return state.flightListLoaded && <FlightList navigation={navigation} />;
  }

  function addflight({ navigation }) {
    return <AddFlight navigation={navigation} />;
  }

  function map({ navigation }) {
    return <Map navigation={navigation} />;
  }

  function userStats({ navigation }) {
    return <UserStats navigation={navigation} />;
  }

  function collections({ navigation }) {
    return <Collection navigation={navigation} />;
  }

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={flightlist} />
      <Drawer.Screen name="Add Flight" component={addflight} />
      <Drawer.Screen name="Flights Map" component={map} />
      <Drawer.Screen name="View Stats" component={userStats} />
      <Drawer.Screen name="View Collection" component={collections} />
    </Drawer.Navigator>
  );
}
