import { defineStore } from 'pinia';
import { ref } from 'vue';
import VueJwtDecode from 'vue-jwt-decode';
import { authService } from '@/services/authService';
import { useToast } from 'vue-toastification';

export const useUserStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const refreshToken = ref(localStorage.getItem('refreshToken') || null);
  const decodedToken = ref(token.value ? VueJwtDecode.decode(token.value) : null);
  const user = ref(null);
  const toast = useToast();

  const fetchUser = async () => {
    if (!token.value) return;

    try {
      const response = await authService.fetchUserInfo(token.value);
      if (response?.code !== 40 && response?.code !== 41) {
        user.value = response;
        localStorage.setItem('user', JSON.stringify(response));
      } else {
        user.value = null;
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const refreshAuthToken = async () => {
    if (!refreshToken.value) return;

    try {
      const { accessToken } = await authService.refreshAuthToken(refreshToken.value);
      if (accessToken) {
        token.value = accessToken;
        localStorage.setItem('token', accessToken);
        decodedToken.value = VueJwtDecode.decode(accessToken);
        await fetchUser(); // Fetch user info after refreshing token
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      toast.error('Error refreshing token');
      logout(); // Log out user if token refresh fails
    }
  };

  const login = async (credentials) => {
    try {
      const { accessToken, refreshToken: newRefreshToken } = await authService.login(credentials);
      token.value = accessToken;
      refreshToken.value = newRefreshToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      decodedToken.value = VueJwtDecode.decode(accessToken);
      await fetchUser();
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const register = async (userInfo) => {
    try {
      const { accessToken, refreshToken: newRefreshToken } = await authService.register(userInfo);
      token.value = accessToken;
      refreshToken.value = newRefreshToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      decodedToken.value = VueJwtDecode.decode(accessToken);
      await fetchUser(); // Fetch user info after registration
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const loginWithProvider = async (provider) => {
    try {
      await authService.loginWithProvider(provider);
    } catch (error) {
      console.error('Login with provider error:', error.message);
    }
  };

  const handleProviderCallback = async () => {
    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await authService.handleProviderCallback();
      token.value = newAccessToken;
      refreshToken.value = newRefreshToken;
      localStorage.setItem('token', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      decodedToken.value = VueJwtDecode.decode(newAccessToken);
      await fetchUser();
    } catch (error) {
      console.error('Provider callback error:', error.message);
    }
  };

  const logout = () => {
    token.value = null;
    refreshToken.value = null;
    decodedToken.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const getUserRole = () => {
    return decodedToken.value?.role || 'guest'; // Adjust based on your JWT structure
  };

  const hasRole = (requiredRole) => {
    const userRole = getUserRole();
    return userRole === requiredRole;
  };

  const updateUserBirthdate = async (newBirthDay) => {
    try {
      await authService.updateUserBirthdate(newBirthDay);
      await fetchUser(); // Refresh user data after update
      toast.success('Birthdate updated successfully');
    } catch (error) {
      console.error('Error updating birthdate:', error.message);
      toast.error('Failed to update birthdate');
    }
  };

  const updateUserUsername = async (newUsername) => {
    try {
      await authService.updateUserUsername(newUsername);
      await fetchUser(); // Refresh user data after update
      toast.success('Username updated successfully');
    } catch (error) {
      console.error('Error updating username:', error.message);
      toast.error('Failed to update username');
    }
  };

  const updateUserFullName = async (newName) => {
    try {
      await authService.updateUserFullName(newName);
      await fetchUser(); // Refresh user data after update
      toast.success('Full name updated successfully');
    } catch (error) {
      console.error('Error updating full name:', error.message);
      toast.error('Failed to update full name');
    }
  };

  const updateProfileImage = async (imageUrl) => {
    try {
      await authService.updateProfileImage(imageUrl);
      await fetchUser(); // Refresh user data after update
      toast.success('Profile image updated successfully');
    } catch (error) {
      console.error('Error updating profile image:', error.message);
      toast.error('Failed to update profile image');
    }
  };

  return {
    token,
    refreshToken,
    decodedToken,
    user,
    fetchUser,
    refreshAuthToken,
    login,
    register,
    loginWithProvider,
    handleProviderCallback,
    logout,
    getUserRole,
    hasRole,
    updateUserBirthdate,
    updateUserUsername,
    updateUserFullName,
    updateProfileImage,
  };
});
