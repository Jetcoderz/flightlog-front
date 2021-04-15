import React, { useState } from "react";
import { View } from "react-native";
import Login from "./components/Login";
import Container from "./components/Container";

export default function App() {
  const [username, setUsername] = useState("");

  return (
    <View style={{ flex: 1 }}>
      {username === "" ? <Login setUsername={setUsername} /> : <Container />}
    </View>
  );
}
