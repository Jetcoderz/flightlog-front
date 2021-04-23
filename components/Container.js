import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Auth from "@aws-amplify/auth";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";
import Map from "./Map";
import UserStats from "./UserStats";

export default function Container(props) {
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
    if (props.user) getFlights();
  }, [props.user]);

  function flightlist({ navigation }) {
    return <FlightList navigation={navigation} />;
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

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={flightlist} />
      <Drawer.Screen name="Add Flight" component={addflight} />
      <Drawer.Screen name="Flights Map" component={map} />
      <Drawer.Screen name="View Stats" component={userStats} />
    </Drawer.Navigator>
  );
}
