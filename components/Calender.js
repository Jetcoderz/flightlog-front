import React from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector } from "react-redux";

export default function Calender() {
  const state = useSelector((state) => state);
  LocaleConfig.locales["jp"] = {
    monthNames: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    monthNamesShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    dayNames: [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
    today: "今日",
  };
  LocaleConfig.locales["en"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    today: "Today",
  };
  if (state.language === "jp") {
    LocaleConfig.defaultLocale = "jp";
  }
  if (state.language === "en") {
    LocaleConfig.defaultLocale = "en";
  }

  const flightDate = {};

  state.flightList.forEach((flight) => {
    const date = flight.date.substring(0, 10);
    flightDate[date] = { selected: true, selectedColor: "#298BD9" };
  });

  return (
    <View>
      <Calendar markedDates={flightDate} theme={{ arrowColor: "#298BD9" }} />
    </View>
  );
}
