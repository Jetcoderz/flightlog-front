import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Surprise({ id }) {
  const state = useSelector((state) => state);
  const [clicked, setClicked] = useState(false);

  const arrayOfFlihtId = state.qrCodes.map((qrcode) => qrcode.flightID);

  const qrCode = state.qrCodes.filter((item) => item.flightID === id)[0];

  const surprise = () => {
    setClicked(true);
  };

  return (
    <View>
      {arrayOfFlihtId.includes(state.selectedFlight) && clicked === false ? (
        <Button onPress={surprise} title="surprise" />
      ) : (
        <View>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: qrCode.url }}
          />
        </View>
      )}
    </View>
  );
}
