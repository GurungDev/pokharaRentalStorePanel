"use client"
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
 import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./slices/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
  });

// AppStore type
export const AppStore = makeStore().constructor;

// AppState type
export const AppState = makeStore().getState().constructor;

 
export const AppThunk = function (ReturnType) {
  return ThunkAction(
    ReturnType,
    AppState,
    unknown,
    Action
  );
};

export const wrapper = createWrapper<AppStore>(makeStore);