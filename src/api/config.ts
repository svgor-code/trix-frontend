import axios from "axios";

console.log(process.env.NODE_ENV);

export const config =
  process.env.NODE_ENV === "development"
    ? {
        API: "http://localhost",
        WS_API: "http://localhost",
      }
    : {
        API: "https://trix-server.onrender.com",
        WS_API: "https://trix-server.onrender.com",
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
