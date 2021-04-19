const { logoObj } = require("./logoObj.js");

export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
    selectedFlight: "",
    logo: logoObj,
    drawerFlag: false,
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
        drawerFlag: !state.drawerFlag,
      };
    default:
      return state;
  }
}
