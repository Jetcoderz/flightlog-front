import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import Swipeable from "react-native-gesture-handler/Swipeable";
import moment from "moment";
import Auth from "@aws-amplify/auth";
import DropDownPicker from "react-native-dropdown-picker";
import Flight from "./Flight";
import QRScanner from "./QRScanner";
import { Platform } from "react-native";
import { getMediaLibraryPermissionsAsync } from "expo-image-picker";

const screenwidth = Dimensions.get("window").width - 40;
const fullWidth = Dimensions.get("window").width;

const Stack = createStackNavigator();

export default function FlightList({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filteredList, setFilteredList] = useState(state.flightList);

  const styles = StyleSheet.create({
    flightLabel: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      alignItems: "center",
      height: "auto",
      width: "100%",
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      elevation: 5,
    },
    flightLabelUpper: {
      flexDirection: "row",
    },
    rightInfo: {
      flexDirection: "column",
      justifyContent: "center",
    },
    rightInfoUpper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tinyLogo: {
      width: 40,
      height: 40,
      margin: 3,
    },
    deperatureArrival: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 10,
      marginLeft: 10,
    },
    deperature: {
      fontSize: 30,
      fontWeight: "bold",
      height: 35,
      color: "gray",
    },
    arrival: {
      fontSize: 30,
      fontWeight: "bold",
      height: 35,
      color: "gray",
    },
    tinyAirplane: {
      fontSize: 15,
      marginLeft: 5,
      marginRight: 5,
      color: "gray",
    },
    deleteBox: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 100,
    },
    deleteText: {
      fontSize: 15,
      color: "white",
    },
    labelHead: {
      fontWeight: "bold",
    },
  });

  const resetList = () => {
    setFilteredList(state.flightList);
  };

  const airlines = [];
  const years = [];
  const months = [];
  const enNames = [
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
  ];
  const jpNames = [
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
  ];
  let monNames = [];
  if (state.language === "en") {
    monNames = enNames;
  }
  if (state.language === "jp") {
    monNames = jpNames;
  }

  if (state.flightList.length > 0) {
    state.flightList.forEach((flight) => {
      let yr = flight.date.slice(0, 4);
      if (!years.includes(yr)) years.push(yr);
      let mn = flight.date.slice(5, 7);
      let monIndex = Number(mn) - 1;
      if (!months.includes(monNames[monIndex])) {
        months.unshift(monNames[monIndex]);
      }
      let airl = flight.airlineICAO;
      if (!airlines.includes(airl)) {
        airlines.push(airl);
      }
    });
  }
  let filterItems = [];

  years.forEach((yr) => {
    if (filterItems.length === 0) {
      let yLabel = "Year";
      if (state.language === "jp") {
        yLabel = "年";
      }
      filterItems.push({
        label: yLabel,
        value: "yr",
        untouchable: true,
        textStyle: styles.labelHead,
      });
    }
    filterItems.push({
      label: yr,
      value: yr,
      parent: "yr",
    });
  });

  let mLabel = "Month";
  if (state.language === "jp") {
    mLabel = "月";
  }
  filterItems.push({
    label: mLabel,
    value: "mn",
    untouchable: true,
    textStyle: styles.labelHead,
  });

  months.forEach((mn) => {
    filterItems.push({
      label: mn,
      value: monNames.indexOf(mn) + 1,
      parent: "mn",
    });
  });

  let aLabel = "Airline";
  if (state.language === "jp") {
    aLabel = "航空会社";
  }
  filterItems.push({
    label: aLabel,
    value: "airline",
    untouchable: true,
    textStyle: styles.labelHead,
  });

  airlines.forEach((airl) => {
    filterItems.push({
      label: airl,
      value: airl,
      parent: "airline",
    });
  });

  const applyFilters = (item) => {
    const filteredFlights = filteredList.filter((flight) => {
      if (item[0]) {
        if (item[0].parent === "mn") {
          let checkVal = flight.date.slice(5, 7);
          return Number(checkVal) === item[0].value;
        }

        if (item[0].parent === "yr") {
          let checkVal = flight.date.slice(0, 4);
          return checkVal === item[0].value;
        }
        if (item[0].parent === "airline") {
          let checkVal = flight.airlineICAO;
          return checkVal === item[0].value;
        }
      }
    });
    setFilteredList(filteredFlights);
  };

  const deleteFlight = async (id) => {
    let fullURL =
      "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
      id;
    const resp = await fetch(fullURL, {
      method: "DELETE",
    });
    let jsonR = await JSON.stringify(resp.status);

    if (jsonR === "200") {
      let newfullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      let response = await fetch(newfullURL);
      let jsonRes = await response.json();
      dispatch({ type: "SetFlightList", payload: jsonRes });
    }
  };

  const confirmDelete = (id) => {
    if (state.language === "en") {
      Alert.alert(
        "Delete Flight",
        "Are you sure you want to delete this flight?",
        [
          {
            text: "Yes",
            onPress: () => deleteFlight(id),
          },
          {
            text: "No",
          },
        ]
      );
    }
    if (state.language === "jp") {
      Alert.alert(
        "フライト削除",
        "このフライトを削除してもよろしいでしょうか？",
        [
          {
            text: "はい",
            onPress: () => deleteFlight(id),
          },
          {
            text: "いいえ",
          },
        ]
      );
    }
  };
  let placeholdertxt = "Filter by...";
  if (state.language === "jp") {
    placeholdertxt = "フィルター";
  }

  function CreateList() {
    const arrayOfFlihtId = state.qrCodes.map((qrcode) => qrcode.flightID);

    const list = filteredList.map((l, i) => (
      <Swipeable
        key={i}
        renderRightActions={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                confirmDelete(l.id);
              }}
              activeOpacity={0.6}
            >
              <View style={styles.deleteBox}>
                {state.language === "en" && (
                  <Text style={styles.deleteText}>Delete</Text>
                )}
                {state.language === "jp" && (
                  <Text style={styles.deleteText}>削除</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      >
        <ListItem
          onPress={() => {
            navigation.navigate("Details");
            dispatch({ type: "SetSelectedFlight", payload: l.id });
          }}
        >
          <View style={styles.flightLabel}>
            <View style={styles.flightLabelUpper}>
              <View style={styles.logo}>
                <Image
                  style={styles.tinyLogo}
                  source={state.logo[l.airlineICAO]}
                ></Image>
              </View>
              <View style={styles.deperatureArrival}>
                <View>
                  <Text style={styles.deperature}>{l.depAirport}</Text>
                </View>
                <View>
                  <Text style={styles.tinyAirplane}> ✈︎ </Text>
                </View>
                <View>
                  <Text style={styles.arrival}>{l.arrAirport}</Text>
                </View>
              </View>
              <View style={styles.rightInfo}>
                <View style={styles.rightInfoUpper}>
                  <View>
                    <Text>{l.flightNo}</Text>
                  </View>
                  <View>
                    <Text>
                      {arrayOfFlihtId.includes(l.id) ? <Text>🎁</Text> : <></>}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text>{moment(l.date).format("MMM Do YYYY")}</Text>
                </View>
              </View>
            </View>
          </View>
        </ListItem>
      </Swipeable>
    ));
    return list;
  }

  function List() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 40,
          }}
        >
          <TouchableOpacity
            style={{
              height: 35,
              width: 130,
              borderColor: "lightgray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 20,
              marginLeft: 15,
              marginTop: 5,
              backgroundColor: "#cccccc",
            }}
            onPress={resetList}
          >
            <Text
              style={{
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              {state.language === "en" ? "Clear Filter" : "フィルター削除"}
            </Text>
          </TouchableOpacity>
          <DropDownPicker
            scrollViewProps={{
              persistentScrollbar: true,
            }}
            items={filterItems}
            multiple={true}
            multipleText="%d items have been selected."
            min={0}
            max={10}
            defaultValue={""}
            placeholder={placeholdertxt}
            containerStyle={{
              width: 200,
              marginTop: 5,
              marginRight: 15,
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            onChangeItemMultiple={(item) => applyFilters(item)}
          />
        </View>
        <Text
          style={{
            width: fullWidth,
            height: 0,
            borderColor: "gray",
            borderBottomWidth: 1,
          }}
        ></Text>
        <ScrollView>
          <CreateList></CreateList>
        </ScrollView>
      </View>
    );
  }

  function Details() {
    return <Flight></Flight>;
  }

  function Scanner({ navigation }) {
    return <QRScanner navigation={navigation}></QRScanner>;
  }

  let hTitle = "My Flights";
  let h2 = "Flight Details";
  let jumpScreen = "Add Flight";
  if (state.language === "jp") {
    hTitle = "フライトリスト";
    h2 = "フライト情報";
    jumpScreen = "フライトを追加";
  }

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: hTitle,
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(jumpScreen, { screen: "AddFlight" })
              }
              style={{ backgroundColor: "#298BD9" }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 30,
                  marginRight: 15,
                  paddingBottom: 2,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: h2,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("QRscanner")}
              style={{ backgroundColor: "#298BD9" }}
            >
              <Image
                source={require("./resources/qrsearch.png")}
                style={{ width: 25, height: 25, marginRight: 20, marginTop: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="QRscanner"
        component={Scanner}
        option={{
          headerTitle: "QRScanner",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#298BD9",
          },
        }}
      />
    </Stack.Navigator>
  );
}
