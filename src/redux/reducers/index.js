import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./user";
import transferReducer from "./transfer";
import { ACTION_STRING } from "../actions/actionsString";

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  transfer: transferReducer,
});

const rootReducer = (state, action) => {
  if (action.type === ACTION_STRING.authLogout) {
    localStorage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
