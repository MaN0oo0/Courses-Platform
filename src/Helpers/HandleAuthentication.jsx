import axios from "axios";
import { Navigate } from "react-router-dom";

let api = axios.create({
  baseURL: "https://localhost:7014/api",
});

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    localStorage.removeItem("token");
    console.error(error);
    <Navigate to={"/login"} />;
  }
});

export default api;
