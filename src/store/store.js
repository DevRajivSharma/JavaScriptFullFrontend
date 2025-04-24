import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice";
import videoReducer from "./feature/videoSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
  },
});
