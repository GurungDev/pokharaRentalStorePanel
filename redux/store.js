import { configureStore } from "@reduxjs/toolkit";
import{ accountSlice } from "./slices/userSlice";
export const store = configureStore({
  reducer: { account: accountSlice.reducer },
});