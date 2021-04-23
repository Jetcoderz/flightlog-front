import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import moment from "moment";
import Auth from "@aws-amplify/auth";
import Flight from "./Flight";

const screenwidth = Dimensions.get("window").width - 40;

export default function FlightList({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    tinyLogo: {
      width: 30,
      height: 30,
    },
  });

  const deleteFlight = async (id) => {
    let fullURL =
      "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
      id;
    const resp = await fetch(fullURL, {
      method: "DELETE",
    });
    let jsonR = await JSON.stringify(resp.status);

    if (jsonR === "200") {
      let refreshListURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      let response = await fetch(refreshListURL);
      let jsonRes = await response.json();
      let theFlights = [];
      for (let i = jsonRes.length - 1; i >= 0; i--) {
        theFlights.push(jsonRes[i]);
      }
      dispatch({ type: "SetFlightList", payload: theFlights });
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Flight",
      "Are you sure you want to delete this flight?",
      [
        {
          text: "Yes",
          onPress: () => deleteFlight(id),
        },
        {
          text: "No",
        },
      ]
    );
  };

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
          <View
            style={{
              flexDirection: "row",
              width: screenwidth,
              justifyContent: "space-between",
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={state.logo[l.airlineICAO]}
            ></Image>
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 9,
                alignContent: "center",
                justifyContent: "space-around",
              }}
              onPress={() => {
                confirmDelete(l.id);
              }}
            >
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                X
              </Text>
            </TouchableOpacity>
          </View>
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
