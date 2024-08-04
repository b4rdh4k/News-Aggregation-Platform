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
      const response = await authService.refreshAuthToken(refreshToken.value);
      if (response?.accessToken) {
        token.value = response.accessToken;
        localStorage.setItem('token', response.accessToken);
        decodedToken.value = VueJwtDecode.decode(response.accessToken);
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
  

  const updateUser = async (userUpdateData) => {
    if (!user.value?.Id || !token.value) return;

    try {
      await authService.updateUser(user.value.Id, userUpdateData, token.value);
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const updateUserPart = async (endpoint, data) => {
    if (!user.value?.Id || !token.value) return;

    try {
      await authService.updateUserPart(user.value.Id, endpoint, data, token.value);
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error(`Failed to update ${endpoint}:`, error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      token.value = response.accessToken;
      refreshToken.value = response.refreshToken;
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      decodedToken.value = VueJwtDecode.decode(response.accessToken);
      await fetchUser();
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const register = async (userInfo) => {
    try {
      const response = await authService.register(userInfo);
      token.value = response.accessToken;
      refreshToken.value = response.refreshToken;
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      decodedToken.value = VueJwtDecode.decode(response.accessToken);
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
      const { accessToken, refreshToken } = await authService.handleProviderCallback();
      token.value = accessToken;
      refreshToken.value = refreshToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      decodedToken.value = VueJwtDecode.decode(accessToken);
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

  return {
    token,
    refreshToken,
    decodedToken,
    user,
    fetchUser,
    refreshAuthToken,
    updateUser,
    updateUserBirthdate: (newBirthdate) => updateUserPart('/user/update/birthdate', newBirthdate),
    updateUserUsername: (newUsername) => updateUserPart('/user/update/username', newUsername),
    updateUserFullName: (newFullName) => updateUserPart('/user/update/fullname', newFullName),
    updateProfileImage: (imageUrl) => updateUserPart('/user/update/profile-image', imageUrl),
    login,
    register,
    loginWithProvider,
    handleProviderCallback,
    logout,
    getUserRole,
    hasRole,
  };
});
