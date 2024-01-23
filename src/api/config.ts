import axios from "axios";

export const config = {
  API: "http://localhost:8080",
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
