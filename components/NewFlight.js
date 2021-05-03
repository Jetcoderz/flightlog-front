import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Auth from "@aws-amplify/auth";
import moment from "moment";

export default function NewFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const awsLambda = state.awsLambda;

  const buttonTexts =
    state.language === "en"
      ? {
          b1: "Business",
          b2: "Travel",
          b3: "Reading",
          b4: "Movie",
          b5: "Music",
          b6: "Game",
        }
      : {
          b1: "ビジネス",
          b2: "トラベル",
          b3: "読書",
          b4: "映画",
          b5: "音楽",
          b6: "ゲーム",
        };

  const [meal, setMeal] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [review, setReview] = useState("");

  const [purposeItems, SetPurposeItems] = useState([
    { id: 1, selected: false, name: buttonTexts.b1 },
    { id: 2, selected: false, name: buttonTexts.b2 },
  ]);
  const [entertainItems, SetEntertainItems] = useState([
    { id: 1, selected: false, name: buttonTexts.b3 },
    { id: 2, selected: false, name: buttonTexts.b4 },
    { id: 3, selected: false, name: buttonTexts.b5 },
    { id: 4, selected: false, name: buttonTexts.b6 },
  ]);

  const texts =
    state.language === "en"
      ? {
          helper1: "Purpose of Trip",
          helper2: "Entertainment",
          button: "Add Flight",
          jumpScreen: "Home",
          placeholder1: "Meal",
          placeholder2: "Seat Number",
          placeholder3: "Comments",
        }
      : {
          helper1: "目的",
          helper2: "エンターテイメント",
          button: "フライト追加",
          jumpScreen: "ホーム",
          placeholder1: "食事",
          placeholder2: "座席番号",
          placeholder3: "コメント",
        };

  async function postButton() {
    const purpose = purposeItems.filter((i) => i.selected === true).length
      ? purposeItems.filter((i) => i.selected === true)[0]["name"]
      : "";

    const entertainment = entertainItems.filter((i) => i.selected === true)
      .length
      ? entertainItems.filter((i) => i.selected === true).map((i) => i.name)
      : [];

    const body = {
      username: Auth.user.attributes.email || "",
      date: state.flightDate || state.addedFlight.flight_date || "",
      flightNo: state.flightNo,
      depAirport: state.addedFlight.departure.iata || "",
      arrAirport: state.addedFlight.arrival.iata || "",
      depGate: state.addedFlight.departure.gate || "",
      arrGate: state.addedFlight.arrival.gate || "",
      takeoff: state.addedFlight.departure.scheduled || "",
      landing: state.addedFlight.arrival.scheduled || "",
      airlineICAO: state.addedFlight.airline.icao || "",
      purpose: purpose,
      entertainment: entertainment,
      meal: meal,
      seatNo: seatNo,
      review: review,
    };

    const url = awsLambda + "flightList";
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.log(e);
    }

    const getFlights = async () => {
      let url = awsLambda + "flightList/" + Auth.user.attributes.email;
      let response = await fetch(url);
      let jsonRes = await response.json();
      dispatch({ type: "SetFlightList", payload: jsonRes });
    };
    getFlights();
    navigation.navigate(texts.jumpScreen);
  }

  function Purpose() {
    function radioButtonOnPress(id) {
      let updatedState = purposeItems.map((item) =>
        item.id === id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      );
      SetPurposeItems(updatedState);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.helperText}>{texts.helper1}</Text>
        <View style={styles.radioButtonContainer}>
          {purposeItems.map((item) => (
            <View key={item.id}>
              {item.selected ? (
                <TouchableOpacity
                  onPress={() => radioButtonOnPress(item.id)}
                  style={styles.radioButtonSelected}
                >
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => radioButtonOnPress(item.id)}
                  style={styles.radioButtonNotSelected}
                >
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  function Entertainment() {
    function radioButtonOnPress(id) {
      const updatedState = entertainItems.slice();
      updatedState[id - 1].selected = !entertainItems[id - 1].selected;
      SetEntertainItems(updatedState);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.helperText}>{texts.helper2}</Text>
        <View style={styles.radioButtonContainer}>
          {entertainItems.map((item) => (
            <View key={item.id}>
              {item.selected ? (
                <TouchableOpacity
                  onPress={() => radioButtonOnPress(item.id)}
                  style={styles.radioButtonSelected}
                >
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => radioButtonOnPress(item.id)}
                  style={styles.radioButtonNotSelected}
                >
                  <Text style={styles.radioButtonText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View
          style={{
            backgroundColor: "#eee",
            alignItems: "center",
          }}
        >
          {state.addedFlight.airline && (
            <View style={styles.flightLabel}>
              <View style={styles.flightLabelUpper}>
                <View style={styles.logo}>
                  <Image
                    style={styles.tinyLogo}
                    source={state.logo[state.addedFlight.airline.name]}
                  ></Image>
                </View>
                <View style={styles.deperatureArrival}>
                  <View>
                    <Text style={styles.deperature}>
                      {state.addedFlight.departure.iata}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.tinyAirplane}> ✈︎ </Text>
                  </View>
                  <View>
                    <Text style={styles.arrival}>
                      {state.addedFlight.arrival.iata}
                    </Text>
                  </View>
                </View>
                <View style={styles.rightInfo}>
                  <View style={styles.rightInfoUpper}>
                    <View>
                      <Text style={styles.detailInfo}>{state.flightNo}</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.detailInfo}>
                      {moment(
                        state.flightDate || state.addedFlight.flight_date || ""
                      ).format("MMM Do YYYY")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <Purpose />
          <Entertainment />
          <View style={styles.container}>
            <Text style={styles.helperText}>{texts.placeholder1}</Text>
            <TextInput
              style={styles.TextInput}
              placeholder={texts.placeholder1}
              onChangeText={(val) => setMeal(val)}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.helperText}>{texts.placeholder2}</Text>
            <TextInput
              style={styles.TextInput}
              placeholder={texts.placeholder2}
              onChangeText={(val) => setSeatNo(val)}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.helperText}>{texts.placeholder3}</Text>
            <TextInput
              style={styles.TextInput}
              placeholder={texts.placeholder3}
              onChangeText={(val) => setReview(val)}
            />
          </View>
          {/* <Button title={texts.button} onPress={postButton} /> */}
          <TouchableOpacity style={styles.button} onPress={postButton}>
            <Text style={styles.btnText}>{texts.button}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    width: "100%",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 5,
    paddingLeft: 20,
  },
  radioButtonContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    height: 50,
    width: 145,
    backgroundColor: "#298BD9",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  radioButtonNotSelected: {
    height: 50,
    width: 145,
    backgroundColor: "#AAAAAA",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
  },
  radioButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  helperText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#298BD9",
    marginBottom: 10,
  },
  flightLabel: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    height: 70,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
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
  detailInfo: {
    fontWeight: "bold",
    marginBottom: 5,
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
  container: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  button: {
    backgroundColor: "#298BD9",
    alignItems: "center",
    padding: 10,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 40,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
