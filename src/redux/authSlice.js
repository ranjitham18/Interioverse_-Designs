// authentication state manager
// stores isLoggedIn and role
// used by protectedRoute


import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: null,
    authChecked: false
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.authChecked = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.authChecked = true;
    },
    authChecked: (state) => {
      state.authChecked = true;
    }
  }
});

export const { setAuth, logout, authChecked } = authSlice.actions;
export default authSlice.reducer;
