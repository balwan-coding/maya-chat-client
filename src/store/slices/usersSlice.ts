import {
  createEntityAdapter,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Users } from "../../types/dataTypes";

export const usersAdapter = createEntityAdapter({
  selectId: (users: Users) => users._id,
});

const usersSlice = createSlice({
  name: "user",
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null as string | null,
    currentUserId: null as string | null,
  }),
  reducers: {
    loadeUsers: (state) => {
      state.loading = true;
    },

    getAllUserSuccse: (state, action: PayloadAction<Users[]>) => {
      usersAdapter.setAll(state, action.payload);
      state.loading = false;
    },

    loadUserFailer: (state) => {
      state.loading = false;
    },

    onlineUser: (state, action: PayloadAction<any>) => {
      usersAdapter.updateOne(state, {
        id: action.payload,
        changes: { isOnlie: true },
      });
    },

    offlineUser: (state, action: PayloadAction<any>) => {
      usersAdapter.updateOne(state, {
        id: action.payload,
        changes: { isOnlie: false },
      });
    },

    setCurrentUserId: (state, action: PayloadAction<string>) => {
      console.log(
        "------------------------------------------------",
        action.payload,
      );
      state.currentUserId = action.payload;
    },

    addOneUser: (state, action: PayloadAction<Users[]>) => {
      console.log("----------------- user data in file", action.payload);
      usersAdapter.addMany(state, action.payload);
    },
  },
});

export const {
  loadeUsers,
  getAllUserSuccse,
  loadUserFailer,
  onlineUser,
  offlineUser,
  setCurrentUserId,
  addOneUser,
} = usersSlice.actions;

export default usersSlice.reducer;
