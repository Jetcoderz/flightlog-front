import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";

export default function Calender() {
  const state = useSelector((state) => state);

  const flightDate = {};

  state.flightList.forEach((flight) => {
    const date = flight.date.substring(0, 10);
    flightDate[date] = { selected: true, selectedColor: "#298BD9" };
  });

  return (
    <View>
      <Calendar markedDates={flightDate} theme={{ arrowColor: "#298BD9" }} />
    </View>
  );
}
