"use client"
import { getToken, isUserLogin, resetlogin, setLoginInfo } from "@/lib/storage.utils";
import { createSlice } from "@reduxjs/toolkit";
 

const initialState = {
  token: getToken() || "",
  loginStatus: isUserLogin() || false,
};

export const accountSlice  = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.loginStatus = true;
      state.token = action.payload?.token;
      setLoginInfo({ ...action.payload });
    },
 

    resetLogin: (state) => {
      state.loginStatus = false;
      state.token = "";
      resetlogin();
    },
  },
});

export const { setLogin, resetLogin } = accountSlice.actions;
export default accountSlice.reducer;
