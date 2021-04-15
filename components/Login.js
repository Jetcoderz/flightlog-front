import React, { useState, useEffect } from "react";
import { View, TextInput, Image, Button, Alert } from "react-native";

export default function Login(props) {
  const [userInput, setUserInput] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = [];
    const getUsers = async () => {
      let response = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/users"
      );
      console.log("HERE", response);
      // let jsonRes = await response.json();
      // console.log(jsonRes);
      // for (const user of jsonRes) {
      //   if (!userList.includes(user.user)) {
      //     userList.push(user.user);
      //   }
      // }
    };
    getUsers();
    setUsers(userList);
  }, []);

  const handleInput = (val) => {
    setUserInput(val);
  };

  const handlePress = () => {
    if (users.includes(userInput)) {
      props.setUsername(userInput);
    } else {
      Alert.alert("That user does not exist");
    }
  };

  return (
    <View>
      <Image
        source={{
          uri: "https://reactnative.dev/docs/assets/p_cat2.png",
        }}
        style={{ width: 200, height: 200, alignSelf: "center", marginTop: 40 }}
      />
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 30,
          marginBottom: 30,
          padding: 5,
          alignSelf: "center",
        }}
        placeholder="Enter your username"
        onChangeText={handleInput}
      />
      <Button title="Log In" onPress={handlePress} />
    </View>
  );
}
