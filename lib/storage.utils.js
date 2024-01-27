"use client"

export const setLoginInfo = (data) => {
  const { token, isRememberMe } = data;
  if (isRememberMe) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

 
export const getToken = () => {
 
  if (typeof sessionStorage !== 'undefined') {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
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
