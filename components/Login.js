import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { View, TextInput, Image, Button, Alert, Text } from "react-native";

function Login(props) {
  const [userInput, setUserInput] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      let response = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/users"
      );
      let jsonRes = await response.json();
      for (const user of jsonRes) {
        users.push(user.user);
      }
    };
    getUsers();
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
      <Text>{props.count}</Text>
      <Button
        title="Add"
        onPress={() => {
          props.dispatch({ type: "INCREMENT" });
        }}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(Login);
