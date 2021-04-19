import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  Alert,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FlightInfo from "./FlightInfo";
import FlightList from "./Flight";

export default function AddFlight() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [flightNumInput, setFlightNumInput] = useState("");
  const [flightData, SetFlightData] = useState({});

  const handlePress = async () => {
    dispatch({ type: "setFlightNum", payload: flightNumInput });

    const getData = async () => {
      const response = await fetch(
        `https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/aviation/${state.flightNum}`
      );
      const parsed = await response.json();
      SetFlightData(parsed);
    };

    getData();

    const postData = async () => {
      if (flightData.departure) {
        const bodyObj = {
          username: state.username,
          date: "",
          flightNo: state.flightNum,
          depAirport: flightData.departure.airport,
          arrAirport: "",
          depGate: flightData.departure.gate,
          arrGate: "",
          takeoff: flightData.departure.scheduled,
          landing: "",
          airline: "",
          plane: "",
        };

        const params = [
          flightData.flight_date,
          flightData.arrival.airport,
          flightData.arrival.gate,
          flightData.arrival.scheduled,
          flightData.airline.name,
          flightData.airline.icao,
        ];

        const keys = [
          "date",
          "arrAirport",
          "arrGate",
          "landing",
          "airline",
          "airlineICAO",
        ];

        for (let i = 0; i < 7; i++) {
          if (params[i]) {
            bodyObj[keys[i]] = params[i];
          }
        }

        if (flightData.aircraft) {
          bodyObj["plane"] = flightData.aircraft.iata;
        }

        await fetch(
          "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObj),
          }
        );
      }
      postData();
    };

    const getFlights = async () => {
      const fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        state.username;
      const response = await fetch(fullURL);
      const jsonRes = await response.json();
      const theFlights = await jsonRes.map((flight) => flight);
      dispatch({ type: "SetFlightList", payload: theFlights });
    };
    getFlights();
  };

  return (
    <View>
      <Text>ADD & Flight</Text>
      <Text>USERNAME:</Text>
      <Text>{state.username}</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Flight #"
        onChangeText={(val) => {
          setFlightNumInput(val);
        }}
      />
      <Button
        title="ADD"
        onPress={handlePress}
        // dispatch({ type: "setFlightNum", payload: flightNumInput })
      />
      {state.flightNum !== "" ? <FlightInfo /> : <Text>Test</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});
