import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
    },
    authStatusChange(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { logout, authStatusChange } = authSlice.actions;

export default authSlice.reducer;
