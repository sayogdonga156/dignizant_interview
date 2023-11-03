import { combineReducers } from "redux";
import { loginReduser } from "./adminReducers";
import formReducer from "./formReducers";

const reducers = combineReducers({
  Admin: loginReduser,
  Form: formReducer,
});

export default reducers;
