import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.getToken()) {
      config.headers.Authorization = `Bearer ${authStore.getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      authStore.clearAuthData();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);
export default apiClient;
