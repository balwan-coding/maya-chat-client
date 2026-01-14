import { call, put } from "redux-saga/effects";
import * as api from "../../services/apis";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateChat, GetChat } from "../../types/dataTypes";
import { getAllUserSuccse } from "../slices/usersSlice";
import { loadChatsSuccese } from "../slices/chatSlice";

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

    yield put(getAllUserSuccse(response.data.members));
    yield put(loadChatsSuccese(response.data.chats));
  } catch (error) {}
}
