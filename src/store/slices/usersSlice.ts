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
  },
});

export const {
  loadeUsers,
  getAllUserSuccse,
  loadUserFailer,
  onlineUser,
  offlineUser,
} = usersSlice.actions;

export default usersSlice.reducer;
