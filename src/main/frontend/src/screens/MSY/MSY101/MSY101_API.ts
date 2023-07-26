import axios from "axios";

export const signIn = (userId: string, password: string) => {
  return axios.post("/api/auth/signIn", {
    userId: userId,
    pwd: password
  });
};

export const signOut = (userId: string) => {
  return axios.post("/api/auth/signOut", {
    userId: userId
  });
};

export const silentSignIn = (refreshToken: string) => {
  return axios.post("/api/auth/silentSignIn", {
    refreshToken: refreshToken
  });
};