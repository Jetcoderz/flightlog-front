import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Surprise({ id }) {
  const state = useSelector((state) => state);
  const [clicked, setClicked] = useState(false);

  const arrayOfFlightId = state.qrCodes.map((qrcode) => qrcode.flightID);

  const qrCode = state.qrCodes.filter((item) => item.flightID === id)[0];

  const surprise = () => {
    setClicked(true);
  };

  return (
    <View style={styles.container}>
      {arrayOfFlightId.includes(state.selectedFlight) && clicked === false ? (
        <TouchableHighlight style={styles.button}>
          <Button onPress={surprise} title="surprise" color="#939597" />
        </TouchableHighlight>
      ) : (
        <View>
          {qrCode && (
            <Image style={styles.image} source={{ uri: qrCode.url }} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    width: 120,
    margin: 10,
    padding: 5,
    backgroundColor: "#f5df4d",
    borderColor: "#939597",
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 350,
    height: 300,
    borderColor: "#298BD9",
    borderRadius: 5,
    borderWidth: 10,
  },
});
