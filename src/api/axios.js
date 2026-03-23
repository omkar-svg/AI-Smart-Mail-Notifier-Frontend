import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7094/api",
});

// ⭐ interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Sending token:", token);   // debug line

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;