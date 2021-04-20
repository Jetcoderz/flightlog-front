import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Picture from "./Picture";
import { useSelector, useDispatch } from "react-redux";
import FlightInfo from "./FlightInfo";
import UserInfo from "./UserInfo";
import { color } from "react-native-reanimated";

export default function Flight() {
  const state = useSelector((state) => state);

  const thisFlight = state.flightList.filter(
    (i) => i.id === state.selectedFlight
  )[0];

  return (
    <View style={styles.flight}>
      <View style={styles.flightInfo}>
        <View style={styles.logoAirline}>
          <Image source={state.logo[thisFlight.airlineICAO]} style={styles.logo}></Image>
          <Text style={styles.airline}>{thisFlight.airlineICAO}</Text>
        </View>
        {/* <Text>{state.selectedFlight}</Text> */}
        <View style={styles.containerDepArr}>
          <Text style={styles.depArr}>{thisFlight.depAirport}</Text>
          <Text　style={styles.airplane}>✈︎</Text>
          <Text style={styles.depArr}>{thisFlight.arrAirport}</Text>
        </View>
      </View>
        {/* <FlightInfo /> */}
        <UserInfo thisFlight = {thisFlight}/>
      
      <Picture />
    </View>
  );
}

const styles = StyleSheet.create ({
  flight: {
    flex: 1,
  },
  flightInfo: {
    display: "flex",
    backgroundColor: "white",
    margin: 15,
    borderRadius: 8,
    shadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    textShadowRadius: 3.84,
    elevation: 5,
  },
  logoAirline: {
    flexDirection: "row",
  },
  airline: {
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "flex-end",
    color: "gray"
  },
  logo: {
    width: 80,
    height: 80,
    alignItems: "flex-end",
  },
  depArr: {
    fontSize: 40,
    fontWeight: "bold",
    color: "dimgray"
  },
  containerDepArr: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
  },
  airplane: {
    margin: 3,
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
    color: "dimgray"
  }
})
