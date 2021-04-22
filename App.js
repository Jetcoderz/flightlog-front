import React, { useState } from "react";
import { View } from "react-native";

import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReduxReducer from "./components/ReduxReducer";

import Login from "./components/Login";
import Container from "./components/Container";
// import QRScanner from "./components/QRScanner";

function Body() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <View style={{ flex: 1 }}>
      {state.username === "" ? <Login /> : <Container />}
      {/* <QRScanner />s */}
    </View>
    
  );
}

export default function App(props) {
  const store = createStore(ReduxReducer);

  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}
