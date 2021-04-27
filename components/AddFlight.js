import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
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

  let pl = "Purpose of Trip";
  let pl2 = "Flight #";
  let bTitle = "NEXT";
  let hTit = "Add Flight";
  let hTit2 = "Add User Info";
  if (state.language === "jp") {
    pl = "目的";
    pl2 = "フライト番号";
    bTitle = "次";
    hTit = "フライト追加";
    hTit2 = "個人情報追加";
  }

  function addFlight() {
    const [flightNumInput, setFlightNumInput] = useState("");
    return (
      <View>
        {state.language === "en" && <Text>Add a Flight</Text>}
        {state.language === "jp" && <Text>フライト追加</Text>}
        <TextInput
          style={styles.TextInput}
          placeholder={pl2}
          onChangeText={(val) => setFlightNumInput(val)}
        />
        <TextInput style={styles.TextInput} placeholder={pl} />
        <Button
          title={bTitle}
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
    <Stack.Navigator initialRouteName="AddFlight">
      <Stack.Screen
        name="AddFlight"
        component={addFlight}
        options={{
          headerTitle: hTit,
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
              <Image
                source={require("./resources/hamburger.png")}
                style={{ width: 20, height: 20, marginLeft: 10, marginTop: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddUserInfo"
        component={newFlight}
        options={{
          headerTitle: hTit2,
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
