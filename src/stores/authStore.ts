import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    companyId: localStorage.getItem('companyId') || null,
    userType: localStorage.getItem('userType') || null,
    userId: localStorage.getItem('userId') || null,
  }),
  actions: {
    setAuthData(token: string, userType: 'company' | 'applicant') {
      this.token = token;
      this.userType = userType;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userType);
    },
    setCompanyId(companyId: string) {
      this.companyId = companyId;
      localStorage.setItem('companyId', companyId);
    },
    setUserId(userId: string) {
      this.userId = userId;
      localStorage.setItem('userId', userId);
    },
    getUserId() {
      return {
        userId: this.userId,
      };
    },
    getCompanyId() {
      return {
        companyId: this.companyId,
      };
    },
    clearAuthData() {
      this.token = null;
      this.companyId = null;
      this.userType = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('companyId');
    }
  },
  getters: {
    isCompanyUser: (state) => state.userType === 'company',
    isAuthenticated: (state) => !!state.token,
  }
});