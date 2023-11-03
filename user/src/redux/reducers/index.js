import { combineReducers } from "redux";
import { loginReduser } from "./userReducers";
import formReducer from "./formReducers";

const reducers = combineReducers({
  User: loginReduser,
  Form: formReducer,
});

export default reducers;
