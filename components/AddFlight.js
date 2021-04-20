import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import FlightInfo from "./FlightInfo";
import FlightList from "./Flight";

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});

export default function AddFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const getPostData = async (input) => {
    console.log(sq.flightNum);
    let flightData;
    try {
      let response = await fetch(
        `https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/aviation/${input}`
      );
      flightData = await response.json();
    } catch (e) {
      console.log(input, "Here", e);
    }

    const bodyObj = {
      username: state.username,
      date: "",
      flightNo: input,
      depAirport: flightData.departure.iata,
      arrAirport: "",
      depGate: flightData.departure.gate,
      arrGate: "",
      takeoff: flightData.departure.scheduled,
      landing: "",
      airline: "",
      airlineICAO: flightData.airline.icao,
      plane: "",
    };

    const params = [
      flightData.flight_date,
      flightData.arrival.iata,
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

    try {
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

  function addFlight() {
    const [flightNumInput, setFlightNumInput] = useState("");
    return (
      <View>
        <Text>Add a Flight</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Flight #"
          onChangeText={(val) => setFlightNumInput(val)}
        />
        <TextInput style={styles.TextInput} placeholder="Purpose of Trip" />
        <Button title="NEXT" onPress={() => getPostData(flightNumInput)} />
        {/* {state.flightNum !== "" ? <FlightInfo /> : <Text>Test</Text>} */}
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={addFlight}
        options={{
          headerTitle: "Add Flight",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTintColor: "#fff",
          headerLeft: () => (
            <Button
              onPress={() => navigation.openDrawer()}
              title="Menu"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
