import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Auth from "@aws-amplify/auth";

export default function NewFlight({ navigation }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
  const [reviw, setReviw] = useState("");

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
          button: "Add",
          jumpScreen: "Home",
          placeholder1: "Meal",
          placeholder2: "Seat Number",
          placeholder3: "Comments",
        }
      : {
          helper1: "目的",
          helper2: "エンターテイメント",
          button: "追加",
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
      : "";
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
      // ↓ return null
      // plane: state.addedFlight.aircraft.icao || "",
      purpose: purpose,
      entertainment: entertainment,
      meal: meal,
      seatNo: seatNo,
      reviw: reviw,
    };
    try {
      await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
    } catch (e) {
      console.log(e);
    }

    const getFlights = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      let response = await fetch(fullURL);
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
      <View>
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
      <View>
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
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          height: Dimensions.get("window").height,
        }}
      >
        {state.addedFlight.airline && (
          <View>
            <Image source={state.logo[state.addedFlight.airline.name]}></Image>
            <View>
              <Text>Departure: {state.addedFlight.departure.iata}</Text>
              <Text>Arrival: {state.addedFlight.arrival.iata}</Text>
            </View>
          </View>
        )}
        <Purpose />
        <Entertainment />
        <TextInput
          style={styles.TextInput}
          placeholder={texts.placeholder1}
          onChangeText={(val) => setMeal(val)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={texts.placeholder2}
          onChangeText={(val) => setSeatNo(val)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder={texts.placeholder3}
          onChangeText={(val) => setReviw(val)}
        />
        <Button title={texts.button} onPress={postButton} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 5,
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
    width: 160,
    backgroundColor: "#298BD9",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  radioButtonNotSelected: {
    height: 50,
    width: 160,
    backgroundColor: "#AAAAAA",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  radioButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  helperText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#298BD9",
    marginTop: 20,
    marginLeft: 25,
  },
});
