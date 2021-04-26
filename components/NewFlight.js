import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Auth from "@aws-amplify/auth";

export default function NewFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  //const [purpose, setPurpose] = useState("");
  const [entertainmnet, setEntertainmnet] = useState([]);
  const [meal, setMeal] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [reviw, setReviw] = useState("");

  const [purposeItems, SetPurposeItems] = useState([
    { id: 1, selected: false, name: "Business" },
    { id: 2, selected: false, name: "Travel" },
  ]);

  async function postButton() {
    const purpose = purposeItems.filter((i) => i.selected === true).length
      ? purposeItems.filter((i) => i.selected === true)[0]["name"]
      : "";
    const body = {
      username: Auth.user.attributes.email || "",
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
    };
    try {
      await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    } catch (e) {
      console.log(e);
    }

    const getFlights = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      let response = await fetch(fullURL);
      let jsonRes = await response.json();
      dispatch({ type: "SetFlightList", payload: jsonRes });
    };
    getFlights();
    navigation.navigate("Home");
  }

  function Purpose() {
    function radioButtonOnPress(id) {
      let updatedState = purposeItems.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      );
      SetPurposeItems(updatedState);
    }

    return (
      <View>
        <Text>Purpose of Travel</Text>
        <View style={styles.radioButtonContainer}>
          {purposeItems.map((item) => (
            <View key={item.id}>
              {item.selected ? (
                <TouchableOpacity
                  onPress={() => radioButtonOnPress(item.id)}
                  style={styles.radioButtonSelected}
                >
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => radioButtonOnPress(item.id)}
                  style={styles.radioButtonNotSelected}
                >
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

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
      <Purpose />
      {/* <TextInput
        style={styles.TextInput}
        placeholder="purpose"
        onChangeText={(val) => setPurpose(val)}
      /> */}
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
        placeholder="seat number"
        onChangeText={(val) => setSeatNo(val)}
      />
      <TextInput
        style={styles.TextInput}
        placeholder="review"
        onChangeText={(val) => setReviw(val)}
      />
      <Button title="ADD" onPress={postButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
  radioButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    height: 50,
    width: 160,
    backgroundColor: "#298BD9",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  radioButtonNotSelected: {
    height: 50,
    width: 160,
    backgroundColor: "#AAAAAA",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  radioButtonText: {
    fontSize: 16,
  },
});
