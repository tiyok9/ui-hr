import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  role: "admin",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<any>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
    },
    logout() {
      localStorage.clear();
      return initialState;
    },
  },
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;
