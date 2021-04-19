import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Image, StyleSheet, Button } from "react-native";
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
          headerLeft: () => (
            <Button
              onPress={() => navigation.openDrawer()}
              title="Menu"
              color="#fff"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Add Flight")}
              title="Add"
              color="#fff"
            />
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
