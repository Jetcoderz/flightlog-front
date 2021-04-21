import React, { useState } from "react";
import { View } from "react-native";

import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReduxReducer from "./components/ReduxReducer";

import Login from "./components/Login";
import Container from "./components/Container";

import AuthNavigator from "./components/auth/AuthNavigation";

import AWSconfig from "./components/auth/awsconfig.js";
import Amplify from "@aws-amplify/core";

Amplify.configure(AWSconfig);

function Body() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <View style={{ flex: 1 }}>
      {/* {state.username === "" ? <Login /> : <Container />} */}
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
