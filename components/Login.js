import React, { useState, useEffect } from "react";
import { View, TextInput, Image, Button, Alert } from "react-native";

export default function Login(props) {
  const [userInput, setUserInput] = useState("");
  const [users, setUsers] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      let response = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/users"
      );
      let jsonRes = await response.json();
      for (const user of jsonRes) {
        if (!users.includes(user.user)) {
          users.push(user.user);
        }
      }
    };
    getUsers();
  }, []);

  const handleInput = (val) => {
    setUserInput(val);
  };

  const handlePress = () => {
    const getFlights = async () => {
      let fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        userInput;
      let response = await fetch(fullURL);
      let jsonRes = await response.json();
      for (const flight of jsonRes) {
        if (!flights.includes(flight)) {
          flights.push(flight);
        }
      }
    };
    if (users.includes(userInput)) {
      getFlights();
      props.setFlightList(flights);
      props.setUsername(userInput);
    } else {
      Alert.alert("That user does not exist");
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#b1ddf1",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image source={require("../assets/cloud.png")} />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          padding: 5,
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        placeholder="Enter your username"
        onChangeText={handleInput}
      />
      <Button title="Log In" onPress={handlePress} />
    </View>
  );
}
