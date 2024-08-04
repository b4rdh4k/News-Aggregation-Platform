import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import VueJwtDecode from 'vue-jwt-decode';
import { fetchApi } from '@/utils/fetchApi'; // Ensure this path is correct

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || null);
  const decodedToken = ref(token.value ? VueJwtDecode.decode(token.value) : null);
  const user = ref(null);
  const toast = useToast();

  const requestOptions = {
    method: 'GET',
  };

  async function check_if_logged_in() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/info`, requestOptions);
    const result = await response.json();
    if (result.code !== 40 && result.code !== 41) {
       localStorage.setItem("user", JSON.stringify(result)); 
       return true;
    } else {
       localStorage.removeItem("user");
       return false;
    }
  }

  const fetchUser = async () => {
    let response = check_if_logged_in();

    if (response) {
      user.value = JSON.parse(localStorage.getItem("user"));
    } else {
      user.value = null;
    }
  };

  const refreshAuthToken = async () => {
    try {
      const response = await fetchApi('/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        token.value = data.accessToken;
        localStorage.setItem('token', data.accessToken);
        decodedToken.value = VueJwtDecode.decode(data.accessToken);
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
    try {
      await fetchApi(`/user/${user.value.Id}`, {
        method: 'PUT',
        body: JSON.stringify(userUpdateData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  };

  const updateUserBirthdate = async (newBirthdate) => {
    try {
      await fetchApi('/user/update/birthdate', {
        method: 'PATCH',
        body: JSON.stringify(newBirthdate),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error('Failed to update birthdate:', error);
    }
  };

  const updateUserUsername = async (newUsername) => {
    try {
      await fetchApi('/user/update/username', {
        method: 'PATCH',
        body: JSON.stringify(newUsername),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error('Failed to update username:', error);
    }
  };

  const updateUserFullName = async (newFullName) => {
    try {
      await fetchApi('/user/update/fullname', {
        method: 'PATCH',
        body: JSON.stringify(newFullName),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error('Failed to update full name:', error);
    }
  };

  const updateProfileImage = async (imageUrl) => {
    try {
      await fetchApi('/user/update/profile-image', {
        method: 'PATCH',
        body: JSON.stringify(imageUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });
      await fetchUser(); // Fetch updated user info
    } catch (error) {
      console.error('Failed to update profile image:', error);
    }
  };

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
        decodedToken.value = VueJwtDecode.decode(data.accessToken);
        await fetchUser();
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
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
        localStorage.setItem('token', data.accessToken);
        decodedToken.value = VueJwtDecode.decode(data.accessToken);
        await fetchUser(); // Fetch user info after registration
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const logout = () => {
    token.value = null;
    decodedToken.value = null;
    user.value = null;
    localStorage.removeItem('token');
  };

  return {
    token,
    decodedToken,
    user,
    fetchUser,
    refreshAuthToken,
    updateUser,
    updateUserBirthdate,
    updateUserUsername,
    updateUserFullName,
    updateProfileImage,
    login,
    register,
    logout,
  };
});