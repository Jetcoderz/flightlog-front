import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function FlightInfo() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flightData, SetFlightData] = useState({});
  const [flightPosted, SetFlightPosted] = useState(false);

  return (
    <View>
      <Text>Todo:refactor from Flight.js</Text>
    </View>
  );
}
