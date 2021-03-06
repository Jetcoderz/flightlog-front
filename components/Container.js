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
  const awsLambda = state.awsLambda;

  useEffect(() => {
    const getFlights = async () => {
      const url = awsLambda + "flightlist/" + Auth.user.attributes.email;
      const response = await fetch(url);
      const jsonRes = await response.json();
      const theFlights = await jsonRes.map((flight) => flight);
      dispatch({ type: "SetFlightList", payload: theFlights });
    };

    const getQrcodes = async () => {
      const url = awsLambda + "qr-codes/" + Auth.user.attributes.email;
      const res = await fetch(url);
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
    "フライトを分析する",
    "マイコレクション",
    "言語設定",
  ];
  let enName = [
    "Home",
    "Add Flight",
    "Flight Map",
    "My Stats",
    "My Collection",
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
