import { combineReducers } from "redux";
import userReducer from "./userReducer";
import workerReducer from "./workerReducer";
import accountReducer from "./accountReducer";
import costReducer from "./costReducer";
import projectReducer from "./projectReducer";
import specializationReducer from "./specReducer";

export default combineReducers({
  userReducer,
  workerReducer,
  accountReducer,
  costReducer,
  projectReducer,
  specializationReducer,
});
