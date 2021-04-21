const { logoObj } = require("./logoObj.js");

export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
    flightNo: "",
    selectedFlight: "",
    logo: logoObj,
    addedFlight: {},
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
    default:
      return state;
  }
}
