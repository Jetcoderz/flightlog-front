import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

export default function FlightInfo() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flightData, SetFlightData] = useState({});
  const [flightPosted, SetFlightPosted] = useState(false);

  const thisFlight = state.flightList.filter(
    (i) => i.id === state.selectedFlight
  )[0];
  
  let airline = "Airline: ";
  let aircraft = "Type of Aircraft: ";
  let gate = "Gate# ";
  
  return (
    <View style={styles.flightInfo}>
          <View style={styles.logoAirline}>
            <Image
              source={state.logo[thisFlight.airlineICAO]}
              style={styles.logo}
            ></Image>
          </View>
          <View style={styles.containerDepArr}>
            <View>
              <Text style={styles.depArr}>{thisFlight.depAirport}</Text>
              <Text style={styles.moment}>
                {moment(thisFlight.takeoff).format("LT")}
              </Text>
              <Text style={styles.moment}>
                {moment(thisFlight.takeoff).format("LL")}
              </Text>
              <Text style={styles.gate}>
                {gate}
                {thisFlight.depGate}
              </Text>
            </View>
            <Text style={styles.airplane}>✈︎</Text>
            <View>
              <Text style={styles.depArr}>{thisFlight.arrAirport}</Text>
              <Text style={styles.moment}>
                {moment(thisFlight.landing).format("LT")}
              </Text>
              <Text style={styles.moment}>
                {moment(thisFlight.landing).format("LL")}
              </Text>
              <Text style={styles.gate}>
                {gate}
                {thisFlight.arrGate}
              </Text>
            </View>
          </View>
          <Text style={styles.airline}>
            {airline}
            {thisFlight.airlineICAO}
          </Text>
          <Text style={styles.typeOfAircraft}>
            {aircraft}
            {thisFlight.plane}
          </Text>
        </View>
  );
}

const styles = StyleSheet.create({
  flightInfo: {
    display: "flex",
    backgroundColor: "#fff",
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
    margin: 5,
    flexDirection: "row",
  },
  logo: {
    width: 80,
    height: 80,
    alignItems: "flex-end",
  },
  depArr: {
    fontSize: 40,
    fontWeight: "bold",
    color: "dimgray",
    textAlign: "center",
  },
  moment: {
    textAlign: "center",
    color: "gray",
    fontSize: 10,
  },
  gate: {
    textAlign: "center",
    color: "gray",
    fontSize: 10,
  },
  airline: {
    marginLeft: 10,
    color: "gray",
    fontSize: 15,
  },
  typeOfAircraft: {
    marginLeft: 10,
    marginBottom: 10,
    color: "gray",
    fontSize: 15,
  },
  containerDepArr: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
  },
  airplane: {
    margin: 3,
    fontSize: 20,
    paddingTop: 10,
    color: "dimgray",
  },
});