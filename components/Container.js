import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Auth from "@aws-amplify/auth";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";
import Map from "./Map";
import UserStats from "./UserStats";

const Drawer = createDrawerNavigator();

export default function Container() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    const getFlights = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      let response = await fetch(fullURL);
      let jsonRes = await response.json();
      let theFlights = [];
      for (let i = jsonRes.length - 1; i >= 0; i--) {
        theFlights.push(jsonRes[i]);
      }
      let sorted = theFlights.sort((a, b) => {
        let date1 = a.date.slice(0, 10).replace(/-/g, "");
        let date2 = b.date.slice(0, 10).replace(/-/g, "");
        return Number(date2) - Number(date1);
      });
      dispatch({ type: "SetFlightList", payload: sorted });
    };
    if (Auth.user.attributes.email) getFlights();
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

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={flightlist} />
      <Drawer.Screen name="Add Flight" component={addflight} />
      <Drawer.Screen name="Flights Map" component={map} />
      <Drawer.Screen name="View Stats" component={userStats} />
    </Drawer.Navigator>
  );
}
