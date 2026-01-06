import { combineReducers } from "redux";
import messageSlice from "./messagesSlice";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import chatSlice from "./chatSlice";

const reduser = combineReducers({
  messages: messageSlice,
  auth: authSlice,
  users: usersSlice,
  chat: chatSlice,
});

export default reduser;
