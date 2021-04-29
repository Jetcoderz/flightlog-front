import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function Surprise({ id }) {
  const state = useSelector((state) => state);
  const [clicked, setClicked] = useState(false);
  const texts =
    state.language === "en"
      ? {
          bTitle: "SURPRISE!",
        }
      : {
          bTitle: "サプライズ",
        };

  const arrayOfFlightId = state.qrCodes.map((qrcode) => qrcode.flightID);

  const qrCode = state.qrCodes.filter((item) => item.flightID === id)[0];

  const surprise = () => {
    setClicked(true);
  };

  return (
    <View style={styles.container}>
      {arrayOfFlightId.includes(state.selectedFlight) && clicked === false ? (
        <TouchableOpacity onPress={surprise} style={styles.button}>
          <Text style={styles.buttonText}>{texts.bTitle}</Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
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
  buttonText: {
    color: "#939597",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
