import { call, put } from "redux-saga/effects";
import * as api from "../../services/apis";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateChat, GetChat } from "../../types/dataTypes";
import { addOneUser, getAllUserSuccse } from "../slices/usersSlice";
import {
  createChatFailer,
  createChatSuccese,
  loadChatsSuccese,
  setCrrChat,
} from "../slices/chatSlice";
import { setIsOpen } from "../slices/uiSlice";

export function* createChat(action: PayloadAction<CreateChat>): Generator {
  try {
    const response = yield call(api.createChat, action.payload);

    console.log(
      "the chat response",
      response.data.chats,
      response.data.members,
    );
    yield put(createChatSuccese(response.data.chats));
    yield put(addOneUser(response.data.members));
    yield put(setCrrChat(response.data.chats[0]._id));
    yield put(setIsOpen(false));
  } catch (error: any) {
    console.log("create chat error", error);
    yield put(createChatFailer(error.message));
    yield put(setIsOpen(false));
  }
}

export function* getChat(action: PayloadAction<GetChat>): Generator {
  try {
    const response = yield call(api.getChat, action.payload);

    yield put(getAllUserSuccse(response.data.members));
    yield put(loadChatsSuccese(response.data.chats));
  } catch (error) {
    console.log("get user error", error);
  }
}
