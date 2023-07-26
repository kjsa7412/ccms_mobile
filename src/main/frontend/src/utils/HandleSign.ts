import axios from "axios";

export const registerAccessTokenOfHeader = (accessToken: string) => {
    axios.defaults.headers.common["X-AUTH-TOKEN"] = `${accessToken}`;
};