import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Surprise() {
  const state = useSelector((state) => state);
  const [clicked, setClicked] = useState(false);

  const arrayOfFlihtId = state.qrCodes.map((qrcode) => qrcode.flightID);
  const surprise = () => {
    setClicked(true);
    for (const qrCode of state.qrCodes) {
      //   console.log("qrCode: ", qrCode);
      if (qrCode.flightID === state.selectedFlight) {
        console.log("qrCode.url: ", qrCode.url);
        return (
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: qrCode.url }}
          />
        );
      }
    }
  };

  return (
    <View>
      {arrayOfFlihtId.includes(state.selectedFlight) && clicked === false ? (
        <Button onPress={surprise} title="surprise" />
      ) : (
        <></>
      )}
    </View>
  );
}

// 画像が表示されない
