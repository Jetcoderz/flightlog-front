import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function FlightInfo() {
  const state = useSelector((state) => state);
  const [flightData, SetFlightData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/aviation/${state.flightNum}`
      );
      let parsed = await response.json();
      SetFlightData(parsed);
    };
    getData();
  }, []);

  useEffect(() => {
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
      ];
      const keys = ["date", "arrAirport", "arrGate", "landing", "airline"];
      for (let i = 0; i < 6; i++) {
        if (params[i]) {
          bodyObj[keys[i]] = params[i];
        }
      }
      if (flightData.aircraft) {
        bodyObj["plane"] = flightData.aircraft.iata;
      }

      fetch(
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
  });

  return (
    <View>
      <Text>Data from Flight API</Text>
      <Text>{state.flightNum}</Text>
      {flightData.departure ? (
        <>
          <Text>{flightData.departure.iata}</Text>
          <Text>{flightData.departure.airport}</Text>
          <Text>{flightData.arrival.iata}</Text>
          <Text>{flightData.arrival.airport}</Text>
        </>
      ) : (
        <Text>FlightIngo</Text>
      )}
    </View>
  );
}
