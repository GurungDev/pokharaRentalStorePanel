"use client";
import React from "react";
import { Toaster } from "./ui/toaster";
import Navbar from "./admin/navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      { children }
      <Toaster />
    </Provider>
  );
};

export default StoreProvider;
