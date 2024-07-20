import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {//idk
  register(userData) {
    return apiClient.post('/auth/register', userData);
  },
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },
};
