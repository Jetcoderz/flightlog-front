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
    if (props.user) {
      getFlights();
      getQrcodes();
    }
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
