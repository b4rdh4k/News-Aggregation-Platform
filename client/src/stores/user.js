import { defineStore } from 'pinia';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async register(email, password, username, fullName, birthdate) {
      try {
        const response = await axios.post(`${apiBaseUrl}/auth/register`, {
          email,
          password,
          username,
          fullName,
          birthdate,
        });
        this.user = response.data.user;
        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        return true;
      } catch (error) {
        console.error('Registration failed:', error);
        return false;
      }
    },
    async login(email, password) {
      try {
        const response = await axios.post(`${apiBaseUrl}/auth/login`, {
          email,
          password,
        });
        this.user = response.data.user;
        this.token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
  },
});
