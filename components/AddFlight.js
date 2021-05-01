import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";

import NewFlight from "./NewFlight";
import { Platform } from "react-native";

export default function AddFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState({});

  LocaleConfig.locales["jp"] = {
    monthNames: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    monthNamesShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    dayNames: [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
    today: "今日",
  };
  LocaleConfig.locales["en"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Today",
  };

  const texts =
    state.language === "en"
      ? {
          pl1: "Flight #",
          b1: "Next",
          h1: "Add Flight",
          h2: "Add User Info",
          t1: "Please select your Flight Date",
          t2: "Please input your Flight Number",
        }
      : {
          pl1: "フライト番号",
          b1: "次へ",
          h1: "フライトを追加",
          h2: "個人情報を追加",
          t1: "日付を選んでください",
          t2: "フライト番号を入力してください",
        };

  if (state.language === "jp") {
    LocaleConfig.defaultLocale = "jp";
  }
  if (state.language === "en") {
    LocaleConfig.defaultLocale = "en";
  }

  const getPostData = async (input) => {
    let flightData;
    try {
      let response = await fetch(
        `https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/aviation/${input}`
      );
      flightData = await response.json();

      dispatch({ type: "SetaddedFlight", payload: flightData });
      dispatch({ type: "SetFlightNo", payload: input });
      dispatch({
        type: "SetFlightDate",
        payload: Object.keys(selectedDate)[0],
      });
    } catch (e) {
      console.log(input, "error: ", e);
    }
  };

  function addFlight() {
    const [flightNumInput, setFlightNumInput] = useState("");

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View
            style={{
              backgroundColor: "#eee",
              alignItems: "center",
              height: Dimensions.get("window").height,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.helperText}>{texts.t1}</Text>
              <Calendar
                style={{ marginTop: 10 }}
                markedDates={selectedDate}
                theme={{ arrowColor: "#298BD9" }}
                onDayPress={(day) => {
                  const obj = {};
                  obj[day.dateString] = {
                    selected: true,
                    selectedColor: "#298BD9",
                  };
                  setSelectedDate(obj);
                }}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.helperText}>{texts.t2}</Text>
              <TextInput
                style={styles.TextInput}
                placeholder={texts.pl1}
                onChangeText={(val) => setFlightNumInput(val)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                getPostData(flightNumInput);
                navigation.navigate("AddUserInfo");
              }}
            >
              <Text style={styles.btnText}>{texts.b1}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  function newFlight({ navigation }) {
    return <NewFlight navigation={navigation} />;
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AddFlight">
      <Stack.Screen
        name="AddFlight"
        component={addFlight}
        options={{
          headerTitle: texts.h1,
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
      <Stack.Screen
        name="AddUserInfo"
        component={newFlight}
        options={{
          headerTitle: texts.h2,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    width: "100%",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    paddingLeft: 20,
    marginBottom: 5,
  },
  helperText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#298BD9",
  },
  button: {
    backgroundColor: "#298BD9",
    alignItems: "center",
    padding: 10,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  container: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
});
