import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
const { airportList } = require("./airportList");

export default function Map() {
  const [pathCoords, setPathCoords] = useState([]);
  const [airports, setAirports] = useState([]);
  const state = useSelector((state) => state);

  useEffect(() => {
    for (const flight of state.flightList) {
      if (!airports.includes(flight.depAirport)) {
        airports.push(flight.depAirport);
      }
      if (!airports.includes(flight.arrAirport)) {
        airports.push(flight.arrAirport);
      }
      pathCoords.push([
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
  }, []);

  const markers = airports.map((airport) => {
    return (
      <Marker
        coordinate={{
          latitude: airportList[airport].Latitude,
          longitude: airportList[airport].Longitude,
        }}
      />
    );
  });

  const paths = pathCoords.map((path) => {
    return <Polyline coordinates={path} />;
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.2048,
          longitude: 138.2529,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {markers}
        {paths}
      </MapView>
    </View>
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
