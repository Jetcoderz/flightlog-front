import React, { useEffect, useState } from "react";
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

export default function AddFlight() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flightNumInput, setFlightNumInput] = useState("");

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
      <TextInput style={styles.TextInput} placeholder="Purpose of Trip" />
      <Button
        title="ADD"
        onPress={() =>
          dispatch({ type: "setFlightNum", payload: flightNumInput })
        }
      />
      {state.flightNum !== "" ? <FlightInfo /> : <Text>Test</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});
