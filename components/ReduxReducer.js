export default function ReduxReducer(
  state = {
    username: "",
    flightList: [],
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
    default:
      return state;
  }
}
