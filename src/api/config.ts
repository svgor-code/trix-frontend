import axios from "axios";

export const config = {
  API: "http://localhost:8080",
};

export const instance = axios.create({
  baseURL: config.API,
});
