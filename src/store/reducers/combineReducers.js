import { combineReducers } from "redux";
import workerReducer from "./workerReducer";
import accountReducer from "./accountReducer";
import costReducer from "./costReducer";

export default combineReducers({ workerReducer, accountReducer, costReducer });
