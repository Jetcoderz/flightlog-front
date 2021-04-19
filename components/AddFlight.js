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
import FlightInfo from "./displayFlight/FlightInfo";

export default function AddFlight({ navigation }) {
  const state = useSelector((state) => state);
  const [flightNum, setFlightNum] = useState("");
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    navigation.toggleDrawer();
  }, [state.drawerFlag]);

  return (
    <View>
      <Text>ADD & Flight</Text>
      <Text>USERNAME:</Text>
      <Text>{state.username}</Text>
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
