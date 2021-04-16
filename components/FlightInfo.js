import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function FlightInfo({ flightNum }) {
  const [flightData, SetFlightData] = useState({});
  useEffect(() => {
    const userList = [];
    const getData = async () => {
      let response = await fetch(
        `https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/aviation/${flightNum}`
      );
      let parsed = await response.json();
      SetFlightData(parsed);
    };
    getData();
  }, []);
  return (
    <View>
      <Text>Data from Flight API</Text>
      <Text>{flightNum}</Text>
      {flightData.departure ? (
        <>
          <Text>{flightData.departure.iata}</Text>
          <Text>{flightData.departure.airport}</Text>
          <Text>{flightData.arrival.iata}</Text>
          <Text>{flightData.arrival.airport}</Text>
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
