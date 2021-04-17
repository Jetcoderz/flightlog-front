import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Button,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import Flight from "./Flight";

export default function FlightList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    tinyLogo: {
      width: 30,
      height: 30,
    },
  });

  function CreateList({ navigation }) {
    const list = state.flightList.map((l, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <Image
            style={styles.tinyLogo}
            source={state.logo[l.airlineICAO]}
          ></Image>
          <ListItem.Title>{l.flightNo}</ListItem.Title>
          <ListItem.Subtitle>
            {l.dep}-{l.arr}
          </ListItem.Subtitle>
          <Button
            title="Go to Details"
            onPress={() => {
              navigation.navigate("Details");
              dispatch({ type: "SetSelectedFlight", payload: l.id });
            }}
          />
        </ListItem.Content>
      </ListItem>
    ));
    return list;
  }

  function List({ navigation }) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView>
          <CreateList navigation={navigation}></CreateList>
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
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
