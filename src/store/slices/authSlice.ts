import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "../../types/dataTypes";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ================= LOGIN =================
    loginStart(state, action: PayloadAction<any>) {
      console.log(action);
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      console.log(action);
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // ================= SIGNUP =================
    signupStart(state, action: PayloadAction<any>) {
      console.log(action);
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<User>) {
      console.log("singup susses", action.payload);
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ================= SESSION CHECK =================
    checkAuthStart(state) {
      state.isLoading = true;
    },
    checkAuthSuccess(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    checkAuthFailure(state) {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    },

    // ================= LOGOUT =================
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
