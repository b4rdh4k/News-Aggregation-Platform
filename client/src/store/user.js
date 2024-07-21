import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('accessToken') || null);
  const tokenExpiry = ref(localStorage.getItem('accessExpireToken') || null);

  const setToken = (newToken, expiryTime) => {
    token.value = newToken;
    localStorage.setItem('accessToken', newToken);
    localStorage.setItem('accessExpireToken', expiryTime);
    tokenExpiry.value = expiryTime;
  };

  const setUser = (userData) => {
    user.value = userData;
  };

  const isTokenExpired = () => {
    if (!tokenExpiry.value) return true;
    return new Date().getTime() > parseInt(tokenExpiry.value);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const expiryTime = new Date().getTime() + data.expiresIn * 10000;
        setToken(data.accessToken, expiryTime);
        toast.success('Token refreshed successfully!');
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to refresh token.');
      router.push('/signin');
    }
  };

  const register = async (userInfo) => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        setUser(data.user);
        toast.success('Registration successful!');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };


  const fetchUser = async () => {
    try {
      if (isTokenExpired()) {
        await refreshToken();
      }

      const response = await fetch('/auth/info', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token.value}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        toast.success('User data fetched successfully!');
      } else {
        throw new Error('Fetch user failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch user data.');
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const expiryTime = new Date().getTime() + data.expiresIn * 1000; // Assuming response contains expiresIn
        setToken(data.accessToken, expiryTime);
        setUser(data.user);
        toast.success('Login successful!');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Your username or password is incorrect.');
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token.value}` },
      });

      if (response.ok) {
        setToken(null, null);
        setUser(null);
        localStorage.getItem('accessExpireToken', null);
        toast.success('Logout successful!');
        router.push('/register');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success('Password reset email sent!');
      } else {
        throw new Error('Forgot password request failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send password reset email.');
    }
  };

  const changePassword = async (newPassword) => {
    try {
      const response = await fetch('/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}` },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        toast.success('Password changed successfully!');
      } else {
        throw new Error('Change password request failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to change password.');
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await fetch('/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        toast.success('Email verified successfully!');
      } else {
        throw new Error('Email verification failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify email.');
    }
  };

  const setupMFA = async (mfaData) => {
    try {
      const response = await fetch('/auth/setup-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}` },
        body: JSON.stringify(mfaData),
      });

      if (response.ok) {
        toast.success('MFA setup successfully!');
      } else {
        throw new Error('MFA setup failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to setup MFA.');
    }
  };

  const verifyMFA = async (mfaCode) => {
    try {
      const response = await fetch('/auth/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}` },
        body: JSON.stringify({ mfaCode }),
      });

      if (response.ok) {
        toast.success('MFA verified successfully!');
      } else {
        throw new Error('MFA verification failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify MFA.');
    }
  };

  const generateBackupCodes = async () => {
    try {
      const response = await fetch('/auth/generate-backup-codes', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token.value}` },
      });

      if (response.ok) {
        toast.success('Backup codes generated successfully!');
      } else {
        throw new Error('Generate backup codes failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate backup codes.');
    }
  };

  return {
    user,
    token,
    login,
    register,
    fetchUser,
    logout,
    refreshToken,
    forgotPassword,
    changePassword,
    verifyEmail,
    setupMFA,
    verifyMFA,
    generateBackupCodes,
  };
});
