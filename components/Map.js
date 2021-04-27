import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
const { airportList } = require("./resources/airportList");

export default function Map({ navigation }) {
  const [pathCoords, setPathCoords] = useState([]);
  const [theAirports, setTheAirports] = useState([]);
  const state = useSelector((state) => state);

  useEffect(() => {
    const paths = [];
    const airports = [];
    for (const flight of state.flightList) {
      if (!airports.includes(flight.depAirport)) {
        airports.push(flight.depAirport);
      }
      if (!airports.includes(flight.arrAirport)) {
        airports.push(flight.arrAirport);
      }
      paths.push([
        {
          latitude: airportList[flight.depAirport].Latitude,
          longitude: airportList[flight.depAirport].Longitude,
        },
        {
          latitude: airportList[flight.arrAirport].Latitude,
          longitude: airportList[flight.arrAirport].Longitude,
        },
      ]);
    }
    setPathCoords(paths);
    setTheAirports(airports);
  }, []);

  const markers = theAirports.map((airport, i) => {
    return (
      <Marker
        coordinate={{
          latitude: airportList[airport].Latitude,
          longitude: airportList[airport].Longitude,
        }}
        key={i}
      />
    );
  });

  const paths = pathCoords.map((path, i) => {
    return (
      <Polyline
        coordinates={path}
        strokeColor={"#0f0f6c"}
        strokeWidth={3}
        key={i}
      />
    );
  });

  function map() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 36.2048,
            longitude: 135.4529,
            latitudeDelta: 20,
            longitudeDelta: 20,
          }}
        >
          {markers}
          {paths}
        </MapView>
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={map}
        options={{
          headerTitle: "Flights Map",
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
