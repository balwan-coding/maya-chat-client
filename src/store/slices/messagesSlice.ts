import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "../../types/dataTypes";

const messageInitialState: Message[] = [];

const messageSlice = createSlice({
  name: "messages",
  initialState: messageInitialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
