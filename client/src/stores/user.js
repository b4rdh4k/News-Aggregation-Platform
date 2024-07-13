// src/stores/user.js
import { defineStore } from 'pinia';
import apiClient from '@/lib/axios.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async register(email, password, username, fullName, birthdate) {
      try {
        const response = await apiClient.post('/auth/register', {
          email,
          password,
          username,
          fullName,
          birthdate,
        });
        this.user = response.data;
        return true;
      } catch (error) {
        console.error('Registration error:', error);
        return false;
      }
    },

    async login(email, password) {
      try {
        const response = await apiClient.post('/auth/login', {
          email,
          password,
        });
        this.user = response.data;
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
  },
});
