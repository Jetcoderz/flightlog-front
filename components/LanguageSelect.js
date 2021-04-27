import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

export default function LanguageSelect() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  function lan() {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {state.language === "en" && (
          <View>
            <Text style={{ textAlign: "center" }}>Set Language</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: "SetLanguage", payload: "en" });
                }}
              >
                <Text>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: "SetLanguage", payload: "jp" });
                }}
              >
                <Text>Japanese</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {state.language === "jp" && (
          <View>
            <Text>言語設定</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "SetLanguage", payload: "en" });
              }}
            >
              <Text>英語</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "SetLanguage", payload: "jp" });
              }}
            >
              <Text>日本語</Text>
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
          headerTitle: "Language Select",
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
