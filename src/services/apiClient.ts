// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Tu URL base de la API desde .env
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para añadir el token de autenticación a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // O desde tu gestor de estado (Pinia/Vuex)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Opcional: Interceptor para manejar errores globalmente (ej. 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response, // Simplemente devuelve la respuesta si es exitosa
  (error) => {
    if (error.response && error.response.status === 401) {
      // Ejemplo: Desloguear al usuario o redirigir a la página de login
      console.error('Error 401: No autorizado. Redirigiendo a login...');
      localStorage.removeItem('authToken');
      // Aquí usarías tu router para redirigir, por ejemplo:
      // import router from '@/router'; // Asegúrate de que esto no cause dependencias circulares
      // router.push('/login');
      // O emitir un evento global que la app principal escuche para redirigir
    }
    // Es importante rechazar la promesa para que el error pueda ser capturado
    // por el código que realizó la llamada (en el componente o en el servicio)
    return Promise.reject(error);
  }
);
export default apiClient;