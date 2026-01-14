import createSagaMiddleware from "redux-saga";
import { takeLatest, takeLeading } from "redux-saga/effects";
import { checkAuthStart, loginStart, signupStart } from "../slices/authSlice";
import { checkAuthSaga, handleLoginUser, handleSignupUser } from "./authSaga";
import { loadeUsers } from "../slices/usersSlice";
import { getAllUsers } from "./userSaga";
import { loadeChats } from "../slices/chatSlice";
import { getChat } from "./chatSaga";
// import { put, takeEvery } from 'redux-saga/effects'

const sagaMiddlerware = createSagaMiddleware();

export function* rootSaga() {
  yield takeLatest(signupStart.type, handleSignupUser);
  yield takeLatest(loginStart.type, handleLoginUser);
  yield takeLatest(checkAuthStart.type, checkAuthSaga);
  yield takeLeading(loadeUsers.type, getAllUsers);
  yield takeLeading(loadeChats.type, getChat);
  //yield takeLatest(loadeChats.type, createChat);
}

export default sagaMiddlerware;
