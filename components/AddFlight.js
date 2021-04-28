import React, { useEffect, useState } from "react";
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
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";

import NewFlight from "./NewFlight";

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
  if (state.language === "jp") {
    LocaleConfig.defaultLocale = "jp";
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
      console.log(input, "Here", e);
    }
  };

  let pl2 = "Flight #";
  let bTitle = "NEXT";
  let hTit = "Add Flight";
  let hTit2 = "Add User Info";
  let text1 = "Please select your Flight Date";
  let text2 = "Please input your Flight Number";
  if (state.language === "jp") {
    pl2 = "フライト番号";
    bTitle = "次";
    hTit = "フライトを追加";
    hTit2 = "個人情報追加";
    text1 = "日付を選んでください";
    text2 = "フライト番号を入力しでください";
  }

  function addFlight() {
    const [flightNumInput, setFlightNumInput] = useState("");

    return (
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            height: Dimensions.get("window").height,
          }}
        >
          <Text style={styles.helperText}>{text1}</Text>
          <Calendar
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
          <Text style={styles.helperText}>{text2}</Text>
          <TextInput
            style={styles.TextInput}
            placeholder={pl2}
            onChangeText={(val) => setFlightNumInput(val)}
          />
          <Button
            title={bTitle}
            style={styles.button}
            onPress={async () => {
              getPostData(flightNumInput);

              navigation.navigate("AddUserInfo");
            }}
          />
        </View>
      </ScrollView>
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
          headerTitle: hTit,
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
          headerTitle: hTit2,
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
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
    paddingLeft: 20,
  },
  helperText: {
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#298BD9",
  },
});
