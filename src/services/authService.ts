import apiClient from './apiClient';
import { useAuthStore } from '@/stores/authStore';

export const login = async (userData:
  {
    loginInput: string;
    password: string;
  }
) => {
  const response = await apiClient.post('/login', userData);
  console.log('Respuesta del login:', response.data);
  const authStore = useAuthStore();
  authStore.setAuthData(response.data.token, response.data.user_type);
  authStore.setCompanyId(response.data.company_id);
  console.log('el id de la empresa es:', authStore.getCompanyId());
  return response.data;
};

export const registerApplicant = async (userData:
  {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;

  }
) => {
  const response = await apiClient.post('/register', userData);
  const authStore = useAuthStore();
  authStore.setAuthData(response.data.token, 'applicant');
  authStore.setUserId(response.data.user_id);
  return response.data;

};

export const registerCompanyUser = async (userData:
  {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    company_id: null;
    role?: string;


  }) => {
  const response = await apiClient.post('/register-company-user', userData);
  const authStore = useAuthStore();
  authStore.setAuthData(response.data.token, 'company');
  authStore.setUserId(response.data.user_id);
  return response.data;
};

export const authService = {
  async logout() {
    try {
      await apiClient.post("/logout"); // Asume POST, usa el método de tu API
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    const authStore = useAuthStore();
    authStore.clearAuthData();
  }
}

/*export const loginWithGoogle = async (idToken: string) => {
  const response = await apiClient.post("/auth/google", {
    id_token: idToken,
  });

  return response.data;
};*/
