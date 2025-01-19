import axios from "axios";
import { getToken} from ".";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_COMMON_BASE_API + "api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      config.headers["Authorization"] = null;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (responce) => {
    if (
      responce?.data?.status === 702 &&
      responce?.data?.errorDetails === "Time Expired,Invalid Token"
    ) {
      window.location.href = "/login";
    } else {
      return responce;
    }
  },
  async (error) => {
    if (
      error?.data?.status === 702 &&
      error?.data?.errorDetails === "Time Expired,Invalid Token"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
