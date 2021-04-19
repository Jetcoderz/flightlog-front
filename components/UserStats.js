import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function UserStats() {
  const state = useSelector((state) => state);
  const [flightsPerAirline, setFlightsPerAirline] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const perAirline = {};
    state.flightList.forEach((flight) => {
      if (!perAirline[flight.airlineICAO]) {
        perAirline[flight.airlineICAO] = 1;
      } else {
        perAirline[flight.airlineICAO] = perAirline[flight.airlineICAO] + 1;
      }
    });
    const pieData = [];
    let r = 33;
    let g = 150;
    let b = 243;
    for (const airline in perAirline) {
      const dataSet = {
        name: airline,
        numFlights: perAirline[airline],
        legendFontColor: "#000000",
        legendFontSize: 20,
        color: `rgba(${r}, ${g}, ${b}, 1)`,
      };
      pieData.push(dataSet);
      if (g + 15 < 255) {
        r += 15;
        g += 15;
      } else {
        b -= 15;
      }
    }
    setData(pieData);
  }, []);

  const chartConfig = {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>MY FLIGHT STATS</Text>
      <Text style={{ fontSize: 20, marginTop: 30 }}>Total Flights:</Text>
      <Text style={{ fontSize: 20, marginTop: 5 }}>
        {state.flightList.length}
      </Text>
      <Text style={{ fontSize: 20, marginTop: 30 }}>Flights by Airline:</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="numFlights"
        backgroundColor="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
  },
});
