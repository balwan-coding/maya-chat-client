import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CreateChat } from "../../types/dataTypes";

export const chatAdapter = createEntityAdapter({
  selectId: (chats: any) => chats._id,
});

const chatSlice = createSlice({
  name: "chat",
  initialState: chatAdapter.getInitialState({
    loading: false,
    error: null as string | null,
    crrChat: "",
  }),
  reducers: {
    // get chats
    loadeChats: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      state.loading = true;
    },

    loadChatsSuccese: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      chatAdapter.setAll(state, action.payload);
      state.loading = false;
    },

    loadChatFailer: (state, action: PayloadAction<any>) => {
      console.log(state, action);
      state.loading = false;
    },

    // create chat

    createChatStart: (state, action: PayloadAction<CreateChat>) => {
      console.log(action);
      state.loading = true;
    },

    createChatSuccese: (state, action: PayloadAction<any>) => {
      console.log("---------- the chats data", action.payload);
      chatAdapter.addMany(state, action.payload);
      state.loading = false;
    },

    createChatFailer: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.loading = false;
    },

    setCrrChat: (state, action: PayloadAction<any>) => {
      state.crrChat = action.payload;
    },
  },
});
export const {
  loadeChats,
  loadChatsSuccese,
  loadChatFailer,
  setCrrChat,
  createChatStart,
  createChatSuccese,
  createChatFailer,
} = chatSlice.actions;
export default chatSlice.reducer;
