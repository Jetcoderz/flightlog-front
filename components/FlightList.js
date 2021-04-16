import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";

export default function FlightList() {
  const state = useSelector((state) => state);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {state.flightList.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{l.flightNo}</ListItem.Title>
              <ListItem.Subtitle>
                {l.dep}-{l.arr}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
