import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: {},
    error: null as string | null,
  },
  reducers: {
    loadeChats: (state, action: PayloadAction<any>) => {
      console.log(state , action)
    },
    loadChatsSuccese: (state, action: PayloadAction<any>) => {
       console.log(state, action);
    },
    loadChatFailer: (state, action: PayloadAction<any>) => {
       console.log(state, action);
    },
  },
});
export const { loadeChats, loadChatsSuccese, loadChatFailer } =
  chatSlice.actions;
export default chatSlice.reducer;
