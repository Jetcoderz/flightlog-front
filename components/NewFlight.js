import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from "./UserInfo";
import NewUserInfo from "./NewUserInfo";

export default function NewFlight() {
  const state = useSelector((state) => state);

  const thisFlight = state.flightList.filter(
    (i) => i.id === state.selectedFlight
  )[0];

  return (
    // Same as the Flight component
    <View style={{ flex: 1 }}>
      <Image source={state.logo[thisFlight.airlineICAO]}></Image>
      <Text>{thisFlight.airlineICAO}</Text>
      <Text>Flight Details</Text>
      <Text>{state.selectedFlight}</Text>
      <Text>Departure: {thisFlight.depAirport}</Text>
      <Text>Arrival: {thisFlight.arrAirport}</Text>
      <UserInfo thisFlight={thisFlight} />
      <NewUserInfo />
    </View>
  );
}
