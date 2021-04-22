import React from "react";
import { useSelector, useDispatch } from "react-redux";
<<<<<<< HEAD
import { View, ScrollView, Image, StyleSheet, Button } from "react-native";
import Auth from "@aws-amplify/auth";
=======
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
>>>>>>> 9d740e4386d93ccd6d7eb5b8793507278ca99934
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
import Flight from "./Flight";

export default function FlightList({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    tinyLogo: {
      width: 30,
      height: 30,
    },
  });

  function CreateList() {
    const list = state.flightList.map((l, i) => (
      <ListItem
        key={i}
        bottomDivider
        onPress={() => {
          navigation.navigate("Details");
          dispatch({ type: "SetSelectedFlight", payload: l.id });
        }}
      >
        <ListItem.Content>
          <Image
            style={styles.tinyLogo}
            source={state.logo[l.airlineICAO]}
          ></Image>
          <ListItem.Title>{l.flightNo}</ListItem.Title>
          <ListItem.Subtitle>
            {moment(l.date).format("MMM Do YYYY")}:{l.depAirport}-{l.arrAirport}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ));
    return list;
  }

  function List() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <CreateList></CreateList>
        </ScrollView>
      </View>
    );
  }

  function Details() {
    return <Flight></Flight>;
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: "My Flights",
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Add Flight")}
              style={{ backgroundColor: "#298BD9" }}
            >
              <Text
                style={{ color: "#fff", fontWeight: "bold", marginRight: 15 }}
              >
                Add
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: "Flight Detail",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
        }}
      />
    </Stack.Navigator>
  );
}
