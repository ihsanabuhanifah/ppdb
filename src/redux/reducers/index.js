import { combineReducers } from "redux";
import authLogin from "./authLogin";

let allReducers = combineReducers({
  auth: authLogin,
});

export default allReducers;
