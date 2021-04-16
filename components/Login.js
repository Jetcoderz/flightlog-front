import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Image, Button, Alert, Text } from "react-native";

export default function Login() {
  const [userInput, setUserInput] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getUsers = async () => {
      let response = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/users"
      );
      let jsonRes = await response.json();
      setUsers(jsonRes.map((i) => i.user));
    };
    getUsers();
  }, []);

  const handleInput = (val) => {
    setUserInput(val);
  };

  const handlePress = () => {
    if (users.includes(userInput)) {
      dispatch({ type: "SetUsername", payload: userInput });
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
