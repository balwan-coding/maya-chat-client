import type { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import type {
  CreateUserRequest,
  LogingUserRequest,
} from "../../types/dataTypes";
import {
  checkAuthFailure,
  checkAuthSuccess,
  loginSuccess,
  signupFailure,
  signupSuccess,
} from "../slices/authSlice";
import * as api from "../../services/apis";

export function* handleSignupUser(
  action: PayloadAction<CreateUserRequest>
): Generator {
  console.log("user signup");
  try {
    const response = yield call(api.signupUser, action.payload);
    const user = response.user;

    yield put(signupSuccess(user));

    console.log(user);
  } catch (error: any) {
    yield put(signupFailure(error.message));
  }
}

export function* handleLoginUser(
  action: PayloadAction<LogingUserRequest>
): Generator {
  try {
    const response = yield call(api.loginUser, action.payload);
    console.log(response.user);
    const user = response.user;
    yield put(loginSuccess(user));
  } catch (error) {}
}

export function* checkAuthSaga(): Generator {
  try {
    const response = yield call(api.isUser);
    console.log("resposne", response);
    yield put(checkAuthSuccess(response));
  } catch (error) {
    yield put(checkAuthFailure());
  }
}
