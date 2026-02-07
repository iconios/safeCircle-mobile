import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/store/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
