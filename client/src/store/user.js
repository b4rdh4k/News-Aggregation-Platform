import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),
  actions: {
    async login(credentials) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok) {
        this.token = data.accessToken;
        this.user = data.user;
        localStorage.setItem('token', this.token);
        await this.fetchUser();
      } else {
        throw new Error('Login failed');
      }
    },
    async register(userInfo) {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      const data = await response.json();
      if (response.ok) {
        this.token = data.accessToken;
        this.user = data.user;
        localStorage.setItem('token', this.token);
        console.log('User registered:', this.user);
      } else {
        throw new Error('Registration failed');
      }
    },
    async fetchUser() {
      if (this.token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/info`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        if (response.ok) {
          this.user = await response.json();
        } else {
          console.error('Failed to fetch user data:', response.status);
        }
      }
    },
    async logout() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      const responseData = await response.json(); // Add this to inspect response
      if (response.ok) {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        console.log('User logged out successfully');
      } else {
        console.error('Logout failed:', responseData); // Log the error response
        throw new Error('Logout failed');
      }
    }
  }
});
