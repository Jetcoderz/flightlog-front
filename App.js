import React from "react";
import { View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import ReduxReducer from "./components/ReduxReducer";

import AuthNavigator from "./components/auth/AuthNavigator";

import AWSconfig from "./components/auth/awsconfig.js";
import Amplify from "@aws-amplify/core";

Amplify.configure(AWSconfig);

function Body() {
  return (
    <View style={{ flex: 1 }}>
      <AuthNavigator />
    </View>
  );
}

export default function App() {
  const store = createStore(ReduxReducer);

  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}
