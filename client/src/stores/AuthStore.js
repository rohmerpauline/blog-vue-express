import { API_URL } from '@/configs/api';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    users: [],
    isAuthenticated: false,
    username: null,
    userRole: null,
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
          this.userRole = res.data.role;
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
    async createUser(username, password) {
      try {
        const res = await axios.post(API_URL.USERS, {
          username,
          password,
          role,
        });
      } catch (error) {
        this.error = error.message;
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`${API_URL.USERS}/${id}`);
        await this.getAllPosts();
      } catch (error) {
        this.error = error.message;
      }
    },
    async getAllUsers() {
      try {
        const res = await axios.get(API_URL.USERS);
        this.users = res.data;
        this.error = null;
      } catch (error) {
        this.users = [];
        this.error = error.message;
      }
    },
    async getUserInfoByUsername(username) {
      try {
        const res = await axios.get(`${API_URL.USERS}/${username}`);
        this.userRole = res.data.role;
      } catch (error) {
        this.username = null;
        this.isAuthenticated = null;
        this.userRole = null;
        this.error = error.message;
      }
    },
    async checkAuthStatusOnLoad() {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const storedUsername = localStorage.getItem('username');
      if (isAuthenticated && isAuthenticated === 'true' && storedUsername) {
        this.username = storedUsername;
        this.isAuthenticated = true;
        await this.getUserInfoByUsername(storedUsername);
      }
    },
  },
});
