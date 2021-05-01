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

  if (state.language === "jp") {
    airline = "エアライン ";
    aircraft = "飛行機 ";
    gate = "ゲート ";
  }

  return (
    <View style={styles.flightLabel}>
      <View style={styles.flightInfo}>
        <View style={styles.flightInfoHead}>
          <View style={styles.logo}>
            <Image
              style={styles.tinyLogo}
              source={state.logo[thisFlight.airlineICAO]}
            ></Image>
          </View>
          <View style={styles.flightInfoHeadRight}>
            <View>
              <Text style={styles.mainInfo}>{thisFlight.flightNo}</Text>
            </View>
            {/* <View>
              <Text >
              {airline}
              {thisFlight.airlineICAO}
              </Text>
            </View> */}
          </View>
        </View>
        <View style={styles.deperatureArrival}>
          <View>
            <View>
              <Text style={styles.deperature}>{thisFlight.depAirport}</Text>
            </View>
            <View style={styles.depInfo}>
              <View>
                <Text style={styles.detailInfo}>
                  {moment(thisFlight.takeoff).format("LL")}
                </Text>
              </View>
              <View>
                <Text style={styles.detailInfo}>
                  {moment(thisFlight.takeoff).format("LT")}
                </Text>
              </View>
              <View>
                <Text style={styles.detailInfo}>
                  {gate}
                  {thisFlight.depGate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.altitude}>
            <View>
              <Text style={styles.tinyAirplane}> ✈︎ </Text>
            </View>
            <View style={styles.dammySpace}>
              {/* <Text style={styles.dammyAirplane}> ✈︎ </Text> */}
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.arrival}>{thisFlight.arrAirport}</Text>
            </View>
            <View style={styles.arrInfo}>
              <View>
                <Text style={styles.detailInfo}>
                  {moment(thisFlight.landing).format("LL")}
                </Text>
              </View>
              <View>
                <Text style={styles.detailInfo}>
                  {moment(thisFlight.landing).format("LT")}
                </Text>
              </View>
              <View>
                <Text style={styles.detailInfo}>
                  {gate}
                  {thisFlight.arrGate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flightLabel: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  mainInfo: {
    fontSize: 25,
    fontWeight: "bold",
  },
  flightInfo: {
    alignItems: "center",
  },
  flightInfoHead: {
    flexDirection: "row",
  },
  detailInfo: {
    color: "gray",
    fontSize: 12,
  },
  flightInfoHeadRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: "center",
  },
  deperatureArrival: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  deperature: {
    fontSize: 45,
    fontWeight: "bold",
    height: 45,
    color: "gray",
  },
  depInfo: {
    alignItems: "center",
    margin: 3,
    height: 40,
  },
  arrInfo: {
    alignItems: "center",
    margin: 3,
    height: 40,
  },
  arrival: {
    fontSize: 45,
    fontWeight: "bold",
    height: 45,
    color: "gray",
  },
  tinyAirplane: {
    fontSize: 15,
    marginLeft: 5,
    marginRight: 5,
    color: "gray",
  },
  dammyAirplane: {
    color: "white",
    height: 40,
  },
  dammySpace: {
    height: 40,
  },
});
