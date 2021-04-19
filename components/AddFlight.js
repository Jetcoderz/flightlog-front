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
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import FlightInfo from "./FlightInfo";

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});

export default function AddFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [flightNumInput, setFlightNumInput] = useState("");

  function addFlight() {
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

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={addFlight}
        options={{
          headerTitle: "My Flights",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTintColor: "#fff",
          headerLeft: () => (
            <Button
              onPress={() => navigation.openDrawer()}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
