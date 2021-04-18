export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
    flightNum: "",
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
    case "setFlightNum":
      return {
        ...state,
        flightNum: action.payload,
      };
    default:
      return state;
  }
}
