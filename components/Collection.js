import React from "react";
import { Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Stamp from "./Stamp";

export default function Collection({ navigation }) {
  const state = useSelector((state) => state);
  let label = "Airlines";
  let headerTitle = "My Collection";
  if (state.language === "jp") {
    label = "航空会社";
    headerTitle = "コレクション";
  }

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
            color: "#298BD9",
          }}
        >
          {label}
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
          headerTitle: headerTitle,
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
    </Stack.Navigator>
  );
}
