import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";
import { createStackNavigator } from "@react-navigation/stack";
import Calender from "./Calender";

const screenWidth = Dimensions.get("window").width;

export default function UserStats({ navigation }) {
  const state = useSelector((state) => state);
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
        legendFontSize: 16,
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

  function stats() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            margin: 0,
            padding: 0,
          }}
        >
          {state.flightList.length}
        </Text>
        <Text
          style={{ fontSize: 15, marginTop: 0, padding: 0, marginBottom: 5 }}
        >
          Total Flights
        </Text>
        <Calender />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
          Flights by Airline:
        </Text>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="numFlights"
          backgroundColor="transparent"
          paddingLeft={18}
        />
      </ScrollView>
    );
  }
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={stats}
        options={{
          headerTitle: "My Stats",
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
