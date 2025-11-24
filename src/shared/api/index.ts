import axios from "axios";

export const api = axios.create({
  baseURL: "http://92.62.72.168:50555",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
