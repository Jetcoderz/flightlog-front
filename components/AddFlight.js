import React from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  Alert,
  Text,
  StyleSheet,
} from "react-native";

export default function AddFlight() {
  return (
    <View>
      <Text>ADD & Flight</Text>
      <TextInput style={styles.TextInput} placeholder="Flight #" />
      <TextInput style={styles.TextInput} placeholder="Purpose of Trip" />
      <Button
        title="ADD"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: { height: 40, borderColor: "gray", borderWidth: 1, marginTop: 50 },
});
