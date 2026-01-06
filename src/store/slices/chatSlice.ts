import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: {},
    error: null as string | null,
  },
  reducers: {
    loadeChats: (state, action: PayloadAction<any>) => {},
    loadChatsSuccese: (state, action: PayloadAction<any>) => {},
    loadChatFailer: (state, action: PayloadAction<any>) => {},
  },
});
export const { loadeChats, loadChatsSuccese, loadChatFailer } =
  chatSlice.actions;
export default chatSlice.reducer;
