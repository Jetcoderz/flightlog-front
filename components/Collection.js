import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Stamp from "./Stamp";

const screenWidth = Dimensions.get("window").width;

export default function Collection({ navigation }) {
  const state = useSelector((state) => state);

  function collections() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            margin: 5,
            padding: 5,
          }}
        >
          Airlines
        </Text>
        <Stamp />
        <Text style={{ marginBottom: 20 }}></Text>
      </ScrollView>
    );
  }
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={collections}
        options={{
          headerTitle: "My Collection",
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
    </Stack.Navigator>
  );
}
