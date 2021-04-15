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
import FlightInfo from "./FlightInfo";

export default function AddFlight() {
  const [flightNum, setFlightNum] = useState("");
  const [submit, setSubmit] = useState(false);

  return (
    <View>
      <Text>ADD & Flight</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Flight #"
        onChangeText={(val) => {
          setFlightNum(val);
        }}
      />
      <TextInput style={styles.TextInput} placeholder="Purpose of Trip" />
      <Button title="ADD" onPress={() => setSubmit(true)} />
      {submit ? <FlightInfo flightNum={flightNum} /> : <Text></Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});
