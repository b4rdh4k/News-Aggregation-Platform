// src/lib/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://test.erzen.tk/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log('Response Interceptor:', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;
