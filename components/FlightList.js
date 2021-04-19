import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
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
    useEffect(() => {
      if (state.drawerFlag) navigation.openDrawer();
      else navigation.closeDrawer();
    }, [state.drawerFlag]);

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
