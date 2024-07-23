import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(null);
  const toast = useToast();

  const login = async (credentials) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (response.ok) {
        token.value = data.accessToken;
        localStorage.setItem('token', data.accessToken);
        user.value = data.user;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
  };

  const register = async (userInfo) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();

      if (response.ok) {
        token.value = data.accessToken;
        user.value = data.user;
        localStorage.setItem('token', data.accessToken);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        token.value = data.accessToken;
        localStorage.setItem('token', data.accessToken);
      } else {
        throw new Error(data.message || 'Token refresh failed');
      }
    } catch (error) {
      console.error('Refresh token error:', error.message);
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Operation successful!');
      } else {
        throw new Error(data.message || 'Forgot password request failed');
      }
    } catch (error) {
      console.error('Forgot password error:', error.message);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Password changed successfully!');
      } else {
        throw new Error(data.message || 'Change password failed');
      }
    } catch (error) {
      console.error('Change password error:', error.message);
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Email verified successfully!');
      } else {
        throw new Error(data.message || 'Email verification failed');
      }
    } catch (error) {
      console.error('Verify email error:', error.message);
    }
  };

  const setupMFA = async (mfaData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/setup-mfa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mfaData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('MFA setup successful!');
      } else {
        throw new Error(data.message || 'MFA setup failed');
      }
    } catch (error) {
      console.error('Setup MFA error:', error.message);
    }
  };

  const verifyMFA = async (mfaCode) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-mfa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mfaCode }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('MFA verified successfully!');
      } else {
        throw new Error(data.message || 'MFA verification failed');
      }
    } catch (error) {
      console.error('Verify MFA error:', error.message);
    }
  };

  const generateBackupCodes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/generate-backup-codes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data.backupCodes);
      } else {
        throw new Error(data.message || 'Generating backup codes failed');
      }
    } catch (error) {
      console.error('Generate backup codes error:', error.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        user.value = data.user;
      } else {
        throw new Error(data.message || 'Fetching user info failed');
      }
    } catch (error) {
      console.error('Get user info error:', error.message);
    }
  };

  return { token, user, login, register, logout, refreshToken, forgotPassword, changePassword, verifyEmail, setupMFA, verifyMFA, generateBackupCodes, getUserInfo };
});
