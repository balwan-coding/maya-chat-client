import { call } from "redux-saga/effects";
import * as api from "../../services/apis";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateChat, GetChat } from "../../types/dataTypes";

export function* createChat(action: PayloadAction<CreateChat>): Generator {
  try {
    const response = yield call(api.createChat, action.payload);
    console.log(response);
  } catch (error) {
    console.log("create chat error", error);
  }
}

export function* getChat(action: PayloadAction<GetChat>): Generator {
  try {
    const response = yield call(api.getChat, action.payload);
    console.log(response);
  } catch (error) {
    console.log("get Chat error", error);
  }
}
