import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem("isAuth") === "true",
  },
  reducers: {
    login: (state) => {
      state.isAuth = true;
      localStorage.setItem("isAuth", "true");
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("isAuth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

