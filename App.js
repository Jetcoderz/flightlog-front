import React, { useState } from "react";
import { View } from "react-native";
import Login from "./components/Login";
import Container from "./components/Container";

export default function App() {
  const [username, setUsername] = useState("");
  const [flightList, setFlightList] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      {username === "" ? (
        <Login setUsername={setUsername} setFlightList={setFlightList} />
      ) : (
        <Container flightList={flightList} />
      )}
    </View>
  );
}
