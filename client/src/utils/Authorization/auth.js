// auth.js

import VueJwtDecode from 'vue-jwt-decode';
import { useToast } from 'vue-toastification';

export const getUserInfoFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      return VueJwtDecode.decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  } else {
    console.error('Token not found in local storage');
    return null;
  }
};

export const login = async (email, password, userStore, router) => {
  const toast = useToast();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      userStore.$patch({ token: data.accessToken, user: data.user });
      localStorage.setItem('token', data.accessToken);
      toast.success('Login successful!');
      router.push('/');
    } else {
      toast.error('Your username or password is incorrect.');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    toast.error('Failed to connect to server.');
  }
};

export const forgotPassword = async (email) => {
  const toast = useToast();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      toast.success('Password reset email sent!');
    } else {
      toast.error('Failed to send password reset email.');
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    toast.error('Failed to connect to server.');
  }
};
