import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Auth from "@aws-amplify/auth";
import FlightList from "./FlightList";
import AddFlight from "./AddFlight";
import Map from "./Map";
import UserStats from "./UserStats";
import LanguageSelect from "./LanguageSelect";
import Collection from "./Collection";

const Drawer = createDrawerNavigator();

export default function Container() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const getFlights = async () => {
      const fullURL =
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/flightlist/" +
        Auth.user.attributes.email;
      const response = await fetch(fullURL);
      const jsonRes = await response.json();
      const theFlights = await jsonRes.map((flight) => flight);
      dispatch({ type: "SetFlightList", payload: theFlights });
    };

    const getQrcodes = async () => {
      const res = await fetch(
        "https://9u4abgs1zk.execute-api.ap-northeast-1.amazonaws.com/dev/qr-codes/" +
          Auth.user.attributes.email
      );
      const data = await res.json();
      dispatch({ type: "SetQrCodes", payload: data });
    };
    if (Auth.user.attributes.email) {
      getFlights();
      getQrcodes();
    }
  }, [Auth.user.attributes.email]);

  let jpName = [
    "ホーム",
    "フライトを追加",
    "地図で見る",
    "フライトの統計",
    "コレクション",
    "言語設定",
  ];
  let enName = [
    "Home",
    "Add Flight",
    "Flight Map",
    "View Stats",
    "View Collection",
    "Language Selection",
  ];
  let drawerNames = [];
  if (state.language === "en") {
    drawerNames = enName;
  }
  if (state.language === "jp") {
    drawerNames = jpName;
  }

  function flightlist({ navigation }) {
    return state.flightListLoaded && <FlightList navigation={navigation} />;
  }

  function addflight({ navigation }) {
    return <AddFlight navigation={navigation} />;
  }

  function map({ navigation }) {
    return <Map navigation={navigation} />;
  }

  function userStats({ navigation }) {
    return <UserStats navigation={navigation} />;
  }

  function collections({ navigation }) {
    return <Collection navigation={navigation} />;
  }

  function language({ navigation }) {
    return <LanguageSelect navigation={navigation} />;
  }

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name={drawerNames[0]} component={flightlist} />
      <Drawer.Screen name={drawerNames[1]} component={addflight} />
      <Drawer.Screen name={drawerNames[2]} component={map} />
      <Drawer.Screen name={drawerNames[3]} component={userStats} />
      <Drawer.Screen name={drawerNames[4]} component={collections} />
      <Drawer.Screen name={drawerNames[5]} component={language} />
    </Drawer.Navigator>
  );
}
