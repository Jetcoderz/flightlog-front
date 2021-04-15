import React, { useState } from "react";
import { View } from "react-native";

import { createStore } from "redux";
import { Provider } from "react-redux";
import ReduxReducer from "./components/ReduxReducer";

import Login from "./components/Login";
import Container from "./components/Container";

export default function App() {
  const store = createStore(ReduxReducer);
  const [username, setUsername] = useState("");

  console.log("USERNAME", username);
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        {username === "" ? (
          <Login setUsername={setUsername} />
        ) : (
          <Container username={username} />
        )}
      </View>
    </Provider>
  );
}
