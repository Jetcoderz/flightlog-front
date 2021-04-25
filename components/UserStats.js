import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from "react-native-chart-kit";
import { createStackNavigator } from "@react-navigation/stack";
import Calender from "./Calender";
import Stamp from "./Stamp";

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
          paddingTop: 20,
          paddingBottom: 20,
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {/* <Image
          source={require("./resources/profileIMG.png")}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        /> */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
          Total Flights:
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          {state.flightList.length}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
          Flights by Airline:
        </Text>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="numFlights"
          backgroundColor="transparent"
        />
        <Calender />
        <Stamp />
        <Text style={{ marginBottom: 20 }}></Text>
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
              <Text
                style={{ color: "#fff", fontWeight: "bold", marginLeft: 15 }}
              >
                Menu
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
