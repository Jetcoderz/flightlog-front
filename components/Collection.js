import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Stamp from "./Stamp";

export default function Collection({ navigation }) {
  const state = useSelector((state) => state);
  let label = "Airlines";
  let headerTitle = "My Collection";
  if (state.language === "jp") {
    label = "エアライン";
    headerTitle = "マイコレクション";
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      width: "90%",
      marginTop: 20,
      borderRadius: 10,
      padding: 20,
    },
  });

  function collections() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#eee",
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#298BD9",
              marginBottom: 10,
            }}
          >
            {label}
          </Text>
          <Stamp />
        </View>
        <Text style={{ marginBottom: 20 }}></Text>
      </ScrollView>
    );
  }
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={collections}
        options={{
          headerTitle: headerTitle,
          headerStyle: {
            backgroundColor: "#298BD9",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ backgroundColor: "#298BD9" }}
            >
              <Image
                source={require("./resources/newhamburger.png")}
                style={{ width: 20, height: 20, marginLeft: 10, marginTop: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
