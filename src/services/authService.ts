// src/services/authService.ts
import apiClient from './apiClient';

/*interface LoginPayload {
  loginInput: string;
  password: string;
}*/

/*interface RegisterPayload {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}
*/
export const login = async (userData:
  {
  loginInput: string;
  password: string;
}
) => {
  const response = await apiClient.post('/login', userData);
  localStorage.setItem('authToken', response.data.token); //revisar nombre token
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
  localStorage.setItem('authToken', response.data.token);
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


    })=> {
        const response = await apiClient.post('/register-company-user', userData);
        localStorage.setItem('authToken', response.data.token);
        return response.data;
    };

export const logout = () => {
  localStorage.removeItem('authToken');
};
