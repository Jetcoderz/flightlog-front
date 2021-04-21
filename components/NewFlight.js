import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function NewFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [purpose, setPurpose] = useState("");
  const [entertainmnet, setEntertainmnet] = useState([]);
  const [meal, setMeal] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [reviw, setReviw] = useState("");

  const postButton = async () => {
    try {
      await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: state.username || "",
            date: state.addedFlight.flight_date || "",
            flightNo: state.flightNo,
            depAirport: state.addedFlight.departure.iata || "",
            arrAirport: state.addedFlight.arrival.iata || "",
            depGate: state.addedFlight.departure.gate || "",
            arrGate: state.addedFlight.arrival.gate || "",
            takeoff: state.addedFlight.departure.scheduled || "",
            landing: state.addedFlight.arrival.scheduled || "",
            airlineICAO: state.addedFlight.airline.icao || "",
            // ↓ return null
            // plane: state.addedFlight.aircraft.icao || "",
            purpose: purpose,
            entertainment: entertainmnet,
            meal: meal,
            seatNo: seatNo,
            reviw: reviw,
          }),
        }
      );
    } catch (e) {
      console.log(e);
    }

    const getFlights = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        state.username;
      let response = await fetch(fullURL);
      let jsonRes = await response.json();
      let theFlights = await jsonRes.map((flight) => flight);
      dispatch({ type: "SetFlightList", payload: theFlights });
    };

    getFlights();
    navigation.navigate("Home");
  };

  return (
    <View>
      {state.addedFlight.airline && (
        <View>
          <Image source={state.logo[state.addedFlight.airline.name]}></Image>
          <View>
            <Text>Departure: {state.addedFlight.departure.iata}</Text>
            <Text>Arrival: {state.addedFlight.arrival.iata}</Text>
          </View>
        </View>
      )}

      <TextInput
        style={styles.TextInput}
        placeholder="purpose"
        onChangeText={(val) => setPurpose(val)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="entertainmnet"
        onChangeText={(val) => setEntertainmnet(val)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="meal"
        onChangeText={(val) => setMeal(val)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="seatNo"
        onChangeText={(val) => setSeatNo(val)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="reviw"
        onChangeText={(val) => setReviw(val)}
      />
      <Button title="ADD" onPress={postButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});
