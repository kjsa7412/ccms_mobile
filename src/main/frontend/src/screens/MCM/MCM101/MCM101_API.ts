import axios from "axios";

export const signOut = (userId: string) => {
  return axios.post("/api/auth/signOut", {
    userId: userId
  });
};