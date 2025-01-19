// third-party
import { combineReducers } from "redux";

import auth from "./auth";
import chat from "./chat"
// ============================== ROOT REDUCER ==============================

const reducers = combineReducers({
  auth,
  chat,
});

export default reducers;
