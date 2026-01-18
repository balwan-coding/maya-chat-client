import { call, put } from "redux-saga/effects";
import * as api from "../../services/apis";
import { getAllUserSuccse, loadUserFailer } from "../slices/usersSlice";

export function* getAllUsers(): Generator {
  try {
    const users = yield call(api.getAlluser);
    yield put(getAllUserSuccse(users.users));
  } catch (error) {
    yield put(loadUserFailer());
  }
}
