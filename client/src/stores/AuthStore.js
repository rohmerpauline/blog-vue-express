import { API_URL } from '@/configs/api';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuthenticated: false,
    username: null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await axios.post(API_URL.LOGIN, {
          username,
          password,
        });
        if (res.status === 200) {
          this.isAuthenticated = true;
          this.username = res.data.username;
          this.error = null;
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('username', this.username);
        } else {
          this.error = res.data.message;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.username = null;
      this.error = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
    },
    checkAuthStatusOnLoad() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const storedUsername = localStorage.getItem('username');
      if (isAuthenticated && isAuthenticated === 'true' && storedUsername) {
        this.isAuthenticated = true;
        this.username = storedUsername;
      }
    },
  },
});
