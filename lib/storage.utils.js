"use client";

export const setLoginInfo = (data) => {
  const { token, isRememberMe } = data;
  if (isRememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

export const getToken = () => {
  if (typeof sessionStorage !== "undefined") {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    return token;
  } else {
    return null;
  }
};

export const isUserLogin = () => {
  const token = getToken();

  if (token) {
    return true;
  }
  return false;
};

export const resetlogin = () => {
  localStorage.clear();
  sessionStorage.clear();

  return;
};

export const setUserDetails = (data) => {
  const { name, email, number, ownerName, isRememberMe } = data;
  if (isRememberMe) {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("number", number);
    localStorage.setItem("ownerName", ownerName);
  } else {
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("ownerName", ownerName);
    sessionStorage.setItem("number", number);
  }
};

export const updateDetails = (data) => {
  const { name, ownerName, number } = data;
 
  if (
    localStorage.getItem("token") != null ||
    localStorage.getItem("token") != undefined
  ) {
    localStorage.setItem("name", name);
    localStorage.setItem("number", number);
    localStorage.setItem("ownerName", ownerName);
  } else {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("ownerName", ownerName);
    sessionStorage.setItem("number", number);
  }
};

export const getName = () => {
  if (typeof sessionStorage !== "undefined") {
    const name = sessionStorage.getItem("name") || localStorage.getItem("name");
    return name;
  } else {
    return null;
  }
};

export const getEmail = () => {
  if (typeof sessionStorage !== "undefined") {
    const email =
      sessionStorage.getItem("email") || localStorage.getItem("email");
    return email;
  } else {
    return null;
  }
};

export const getNumber = () => {
  if (typeof sessionStorage !== "undefined") {
    const number =
      sessionStorage.getItem("number") || localStorage.getItem("number");
    return number;
  } else {
    return null;
  }
};

export const getOwnerName = () => {
  if (typeof sessionStorage !== "undefined") {
    const number =
      sessionStorage.getItem("ownerName") || localStorage.getItem("ownerName");
    return number;
  } else {
    return null;
  }
};
