import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";

import NewFlight from "./NewFlight";

export default function AddFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const getPostData = async (input) => {
    let flightData;
    try {
      let response = await fetch(
        `https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/aviation/${input}`
      );
      flightData = await response.json();

      dispatch({ type: "SetaddedFlight", payload: flightData });
      dispatch({ type: "SetFlightNo", payload: input });
    } catch (e) {
      console.log(input, "Here", e);
    }
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
        <Button
          title="NEXT"
          onPress={async () => {
            getPostData(flightNumInput);

            navigation.navigate("AddUserInfo");
          }}
        />
      </View>
    );
  }

  function newFlight({ navigation }) {
    return <NewFlight navigation={navigation} />;
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="AddFlight"
        component={addFlight}
        options={{
          headerTitle: "Add Flight",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ backgroundColor: "#298BD9" }}
            >
              <Text
                style={{ color: "#fff", fontWeight: "bold", marginLeft: 15 }}
              >
                Menu
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddUserInfo"
        component={newFlight}
        options={{
          headerTitle: "Add User Info",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});
