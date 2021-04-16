export default function ReduxReducer(
  state = {
    count: 0,
    username: "",
    flightList: [],
  },
  action
) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };
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
