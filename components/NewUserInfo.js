// import React, { useState } from "react";
// import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
// import { useSelector, useDispatch } from "react-redux";

// export default function NewUserInfo() {
//   const [purpose, setPurpose] = useState("");
//   const [entertainmnet, setEntertainmnet] = useState("");
//   const [meal, setMeal] = useState("");
//   const [seatNo, setSeatNo] = useState("");
//   const [reviw, setReviw] = useState("");

//   const postButton = async () => {
//     const bodyObj = {
//       username: state.username,
//       date: "",
//       flightNo: input,
//       depAirport: flightData.departure.iata,
//       arrAirport: "",
//       depGate: flightData.departure.gate,
//       arrGate: "",
//       takeoff: flightData.departure.scheduled,
//       landing: "",
//       airline: "",
//       airlineICAO: flightData.airline.icao,
//       plane: "",
//     };

//     const params = [
//       flightData.flight_date,
//       flightData.arrival.iata,
//       flightData.arrival.gate,
//       flightData.arrival.scheduled,
//       flightData.airline.name,
//     ];

//     const keys = ["date", "arrAirport", "arrGate", "landing", "airline"];

//     for (let i = 0; i < 6; i++) {
//       if (params[i]) {
//         bodyObj[keys[i]] = params[i];
//       }
//     }

//     if (flightData.aircraft) {
//       bodyObj["plane"] = flightData.aircraft.iata;
//     }

//     try {
//       await fetch(
//         "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({}),
//         }
//       );
//     } catch (e) {
//       console.log(e);
//     }

//     const getFlights = async () => {
//       let fullURL =
//         "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
//         state.username;
//       let response = await fetch(fullURL);
//       let jsonRes = await response.json();
//       let theFlights = await jsonRes.map((flight) => flight);
//       dispatch({ type: "SetFlightList", payload: theFlights });
//     };
//     getFlights();
//     navigation.navigate("Home");
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Text>Test</Text>
//       <TextInput
//         style={styles.TextInput}
//         placeholder="purpose"
//         onChangeText={(val) => setPurpose(val)}
//       />
//       <TextInput
//         style={styles.TextInput}
//         placeholder="entertainmnet"
//         onChangeText={(val) => setEntertainmnet(val)}
//       />
//       <TextInput
//         style={styles.TextInput}
//         placeholder="meal"
//         onChangeText={(val) => setMeal(val)}
//       />
//       <TextInput
//         style={styles.TextInput}
//         placeholder="seatNo"
//         onChangeText={(val) => setSeatNo(val)}
//       />
//       <TextInput
//         style={styles.TextInput}
//         placeholder="reviw"
//         onChangeText={(val) => setReviw(val)}
//       />
//       <Button title="ADD" onPress={() => console.log("cliked")} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
// });
