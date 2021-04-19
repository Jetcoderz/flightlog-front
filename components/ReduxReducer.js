const { logoObj } = require("./logoObj.js");

export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
    selectedFlight: "",
    logo: logoObj,
    drawerFlag: false,
    navigateFunc: null,
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
    case "SetSelectedFlight":
      return {
        ...state,
        selectedFlight: action.payload,
      };
    case "ToggleDrawer":
      return {
        ...state,
        drawerFlag: action.payload,
      };
    case "NavigateFunc":
      return {
        ...state,
        navigateFunc: action.payload,
      };
    default:
      return state;
  }
}
