import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";
import { createStackNavigator } from "@react-navigation/stack";
import Calender from "./Calender";

const screenWidth = Dimensions.get("window").width;

export default function UserStats({ navigation }) {
  const state = useSelector((state) => state);
  const [data, setData] = useState([]);
  let totFl = "Total Flights";
  let totAl = "Flights by Airline";
  let FlCal = "Flights Calender";
  let headerTitle = "My Stats";
  if (state.language === "jp") {
    totFl = "フライト合計";
    totAl = "搭乗比率";
    FlCal = "フライトカレンダー";
    headerTitle = "分析結果";
  }

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
          backgroundColor: "#eee",
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.container}>
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
          <Text style={styles.title}>{totFl}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{FlCal}</Text>
          <Calender />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{totAl}</Text>
          <PieChart
            data={data}
            width={350}
            height={200}
            chartConfig={chartConfig}
            accessor="numFlights"
            backgroundColor="transparent"
          />
        </View>
        <View style={{ marginTop: 40 }}></View>
      </ScrollView>
    );
  }
  const Stack = createStackNavigator();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      width: "90%",
      marginTop: 20,
      borderRadius: 10,
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#298BD9",
    },
  });

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={stats}
        options={{
          headerTitle: headerTitle,
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
