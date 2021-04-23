import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function Stamp() {
  const state = useSelector((state) => state);
  const [myAirline, SetMyAirline] = useState([]);
  useEffect(() => {
    if (state.flightList)
      SetMyAirline(state.flightList.map((l) => l.airlineICAO));
  }, [state.flightList]);
  const styles = StyleSheet.create({
    notYetLogo: {
      width: 30,
      height: 30,
      opacity: 0.1,
    },
    myLogo: {
      width: 30,
      height: 30,
    },
    logoBox: {
      width: "80%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });

  return (
    <View>
      <Text>My Airline Collection</Text>
      {state.flightList && (
        <View style={styles.logoBox}>
          {Object.keys(state.logo).map((i) => {
            if (myAirline.includes(i))
              return (
                <Image
                  key={i}
                  style={styles.myLogo}
                  source={state.logo[i]}
                ></Image>
              );
            else
              return (
                <Image
                  key={i}
                  style={styles.notYetLogo}
                  source={state.logo[i]}
                ></Image>
              );
          })}
        </View>
      )}
    </View>
  );
}
