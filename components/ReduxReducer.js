export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
    selectedFlight: "",
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
    default:
      return state;
  }
}
