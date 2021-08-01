import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { placeOrderReducer } from "./reducers/placeOrederReducer";
import { changeScreenReducer } from "./reducers/changeScreenReducer";

const reducer = combineReducers({
  placeOrder: placeOrderReducer,
  changeScreen: changeScreenReducer,
});

// const UserInfoFromLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initalState = {};

const store = createStore(reducer, initalState, applyMiddleware(thunk));

export default store;
