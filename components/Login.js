import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Image, Button, Alert, Text } from "react-native";

export default function Login() {
  const [userInput, setUserInput] = useState("");
  const [pwInput, setPWInput] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  // const state = useSelector((state) => state);

  useEffect(() => {
    const getUsers = async () => {
      let response = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/users"
      );
      let jsonRes = await response.json();
<<<<<<< HEAD
      setUsers(jsonRes.map((i) => i.username));
=======
      setUsers(
        jsonRes.map((i) => {
          const userobj = { username: i.username, pw: i.pw };
          return userobj;
        })
      );
>>>>>>> f240598cb7935541af3369db9ec39616c4e40b80
    };
    getUsers();
  }, []);

  const handleInput = (val) => {
    setUserInput(val);
  };

  const handlePWInput = (val) => {
    setPWInput(val);
  };

  const handlePress = () => {
    let userExists = false;
    let password = "";
    for (const user of users) {
      if (user.username === userInput) {
        userExists = true;
        password = user.pw;
        break;
      }
    }
    if (userExists === false) {
      Alert.alert("That user does not exist");
    } /* else if (password !== pwInput) {
      Alert.alert("Incorrect password");
    } */ else {
      dispatch({ type: "SetUsername", payload: userInput });
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
        placeholder="Enter your password"
        onChangeText={handlePWInput}
      />
      <Button title="Log In" onPress={handlePress} />
    </View>
  );
}
