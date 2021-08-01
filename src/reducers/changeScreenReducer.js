import {
  CHANGE_SCREEN,
  LEAVE_AND_CHANGESCREEN,
} from "../actionTypes/placeOrderActionTypes";

export const changeScreenReducer = (
  state = { changeScreen: false, message: "" },
  action
) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return {
        ...state,
        userName: action.payload.userName,
        changeScreen: true,
        message: action.payload.message,
      };

    case LEAVE_AND_CHANGESCREEN:
      return {
        ...state,
        changeScreen: false,
        message: "",
      };

    default:
      return state;
  }
};
