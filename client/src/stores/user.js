import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async register(email, password, confirmPassword, firstName, lastName, username, birthdate) {
      try {
        const response = await axios.post('https://test.erzen.tk/api/v1/auth/register', {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          username,
          birthdate,
        });
        if (response.status === 200) {
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async login(email, password) {
      try {
        const response = await axios.post('https://test.erzen.tk/api/v1/auth/login', {
          email,
          password
        });
        if (response.status === 200) {
          this.user = response.data.user;
          this.token = response.data.token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          router.push('/');
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      delete axios.defaults.headers.common['Authorization'];
      router.push('/sign-in');
    }
  }
});
