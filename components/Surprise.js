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
        <TouchableOpacity style={styles.button}>
          {/* <Button onPress={surprise} title="surprise" color="#939597" /> */}
          <Text onPress={surprise} style={styles.text}>
            {texts.bTitle}
          </Text>
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
    width: 160,
    margin: 20,
    padding: 5,
    backgroundColor: "#f5df4d",
    borderColor: "#939597",
    borderRadius: 30,
    borderWidth: 4,
    alignItems: "center",
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
  text: {
    fontSize: 20,
    margin: 10,
    fontWeight: "800",
    color: "#939597",
  },
});
