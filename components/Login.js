import React from "react";
import { View, TextInput, Image, Button, Alert } from "react-native";

export default function Login() {
  return (
    <View>
      <Image
        source={{
          uri: "https://reactnative.dev/docs/assets/p_cat2.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <Button
        title="Press me"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
}
