import { combineReducers } from "redux";
import authReducer from "./auth";
import ticketReducer from "./ticket";
import messageReducer from "./message";

export default combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  message:messageReducer
});
