const { logoObj } = require("./logoObj.js");

export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
    flightListLoaded: false,
    flightNo: "",
    selectedFlight: "",
    logo: logoObj,
    addedFlight: {},
    qrCodes: [],
    language: "en",
  },
  action
) {
  switch (action.type) {
    case "SetUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "SetFlightList":
      return {
        ...state,
        flightList: action.payload,
        flightListLoaded: true,
      };
    case "SetFlightNo":
      return {
        ...state,
        flightNo: action.payload,
      };
    case "SetSelectedFlight":
      return {
        ...state,
        selectedFlight: action.payload,
      };
    case "SetaddedFlight":
      return {
        ...state,
        addedFlight: action.payload,
      };
    case "SetQrCodes":
      return {
        ...state,
        qrCodes: action.payload,
      };
    case "SetLanguage":
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}
