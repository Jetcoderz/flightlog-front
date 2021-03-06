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
      width: 27,
      height: 27,
      opacity: 0.1,
      margin: 2,
    },
    myLogo: {
      width: 27,
      height: 27,
      margin: 2,
    },
    logoBox: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });

  return (
    <View>
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
