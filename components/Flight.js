import React from "react";
import { View, Text, Image } from "react-native";
import Picture from "./Picture";
import { useSelector, useDispatch } from "react-redux";
import UserInfo from "./UserInfo";

export default function Flight() {
  const state = useSelector((state) => state);

  const thisFlight = state.flightList.filter(
    (i) => i.id === state.selectedFlight
  )[0];

  return (
    <View style={{ flex: 1 }}>
      <Image source={state.logo[thisFlight.airlineICAO]}></Image>
      <Text>{thisFlight.airlineICAO}</Text>
      <Text>Flight Details</Text>
      <Text>{state.selectedFlight}</Text>
      <Text>Departure: {thisFlight.depAirport}</Text>
      <Text>Arrival: {thisFlight.arrAirport}</Text>
      <UserInfo thisFlight={thisFlight} />
      <Picture />
    </View>
  );
}
