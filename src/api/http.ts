import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Usa variables de entorno
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Interceptores globales (opcional)
http.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;