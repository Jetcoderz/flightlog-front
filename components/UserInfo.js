import React from "react";
import { View, Text } from "react-native";

export default function UserInfo({ thisFlight }) {
  return (
    <View>
      <Text>Purpose:{thisFlight.purpose}</Text>
      <Text>Entertainment:{thisFlight.entertainment}</Text>
      <Text>Meal:{thisFlight.meal}</Text>
      <Text>SeatNo:{thisFlight.seatNo}</Text>
      <Text>Review:{thisFlight.review}</Text>
    </View>
  );
}
