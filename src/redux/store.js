// redux store setup
// combine all silces
// provides global state
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
   
  },
});

export default store; //  Default export to match index.js
