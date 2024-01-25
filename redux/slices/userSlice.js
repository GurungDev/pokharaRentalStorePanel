"use client"
import { getToken, isUserLogin, resetlogin, setLoginInfo } from "@/lib/storage.utils";
import { createSlice } from "@reduxjs/toolkit";
 

const initialState = {
  loginStatus: false,
  token:""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.loginStatus = true;
      state.token = action.payload?.token;
      setLoginInfo({ ...action.payload });
    },
 

    resetLogin: (state, action) => {
      state.loginStatus = false;
      state.token = "";
    resetlogin();
    },
  },
});

export const { setLogin, resetLogin } = userSlice.actions;
export default userSlice.reducer;
