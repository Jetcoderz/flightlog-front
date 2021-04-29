import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Picture from "./Picture";
import UserInfo from "./UserInfo";
import Surprise from "./Surprise";
import FlightInfo from "./FlightInfo";

export default function Flight() {
  const state = useSelector((state) => state);

  if (state.language === "jp") {
    airline = "エアライン ";
    aircraft = "飛行機 ";
    gate = "ゲート ";
  }

  const thisFlight = state.flightList.filter(
    (i) => i.id === state.selectedFlight
  )[0];

  return (
    <View style={styles.flight}>
      <ScrollView>
        <FlightInfo />
        <UserInfo thisFlight={thisFlight} />
        {state.qrCodes.length > 0 && <Surprise id={thisFlight.id} />}
        <Picture />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flight: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
