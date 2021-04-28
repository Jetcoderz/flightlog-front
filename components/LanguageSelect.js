import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

export default function LanguageSelect({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let headerTitle = "Language Select";
  if (state.language === "jp") {
    headerTitle = "言語設定";
  }

  function lan() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.language === "en" && (
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: "SetLanguage", payload: "en" });
                }}
                style={styles.radioButtonSelected}
              >
                <Text style={styles.radioButtonText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: "SetLanguage", payload: "jp" });
                }}
                style={styles.radioButtonNotSelected}
              >
                <Text style={styles.radioButtonText}>Japanese</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {state.language === "jp" && (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "SetLanguage", payload: "en" });
              }}
              style={styles.radioButtonNotSelected}
            >
              <Text style={styles.radioButtonText}>英語</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "SetLanguage", payload: "jp" });
              }}
              style={styles.radioButtonSelected}
            >
              <Text style={styles.radioButtonText}>日本語</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        component={lan}
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
                source={require("./resources/hamburger.png")}
                style={{ width: 20, height: 20, marginLeft: 10, marginTop: 2 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  radioButtonSelected: {
    height: 50,
    width: 160,
    backgroundColor: "#298BD9",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 160,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  radioButtonNotSelected: {
    height: 50,
    width: 160,
    backgroundColor: "#AAAAAA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 160,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  radioButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
