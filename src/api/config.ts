import axios from "axios";

export const config = {
  API: import.meta.env.VITE_API,
  WS_API: import.meta.env.VITE_API,
};

export const instance = axios.create({
  baseURL: config.API,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
