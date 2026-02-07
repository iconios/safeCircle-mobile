import { createSlice } from "@reduxjs/toolkit";
import { authStateData } from "../types/common.types";

// Create the initial state
const initialState: authStateData = {
  isLoggedIn: false,
  token: "",
  userId: "",
  phoneNumber: "",
  email: "",
  firstname: "",
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.phoneNumber = action.payload.phoneNumber;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    loggedOut: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.firstname = "";
      state.phoneNumber = "";
      state.token = "";
      state.userId = "";
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
