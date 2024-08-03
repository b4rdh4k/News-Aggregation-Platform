import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi';

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  const preferences = ref([]);
  const apiUrl = '/api/UserPreferences';

  const createUserPreferences = async (userId, categoryId, tags) => {
    try {
      const response = await fetchApi(`${apiUrl}/CreateUserPreferences`, {
        method: 'POST',
        body: JSON.stringify({ userId, categoryId, tags }),
      });

      if (response) {
        preferences.value.push(response);
        localStorage.setItem('userPreferences', JSON.stringify(preferences.value));
      } else {
        console.error('Failed to create user preferences');
      }
    } catch (error) {
      console.error('Error creating user preferences:', error);
    }
  };

  const deleteUserPreferences = async (id) => {
    try {
      const response = await fetchApi(`${apiUrl}/DeleteUserPreferences/${id}`, {
        method: 'DELETE',
      });

      if (response) {
        preferences.value = preferences.value.filter(pref => pref.id !== id);
        localStorage.setItem('userPreferences', JSON.stringify(preferences.value));
      } else {
        console.error('Failed to delete user preferences');
      }
    } catch (error) {
      console.error('Error deleting user preferences:', error);
    }
  };

  const getUserPreferencesById = async (id) => {
    try {
      const response = await fetchApi(`${apiUrl}/GetUserPreferencesById/${id}`);

      if (response) {
        return response;
      } else {
        console.error('Failed to fetch user preferences');
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  };

  const getAllUserPreferences = async () => {
    try {
      const response = await fetchApi(`${apiUrl}/GetAllUserPreferences`);

      if (response) {
        preferences.value = response;
        localStorage.setItem('userPreferences', JSON.stringify(preferences.value));
      } else {
        console.error('Failed to fetch all user preferences');
      }
    } catch (error) {
      console.error('Error fetching all user preferences:', error);
    }
  };

  const updateUserPreferences = async (id, userId, categoryId, tags) => {
    try {
      const response = await fetchApi(`${apiUrl}/UpdateUserPreferences/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ userId, categoryId, tags }),
      });

      if (response) {
        const index = preferences.value.findIndex(pref => pref.id === id);
        if (index !== -1) {
          preferences.value[index] = response;
          localStorage.setItem('userPreferences', JSON.stringify(preferences.value));
        }
      } else {
        console.error('Failed to update user preferences');
      }
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  return {
    preferences,
    createUserPreferences,
    deleteUserPreferences,
    getUserPreferencesById,
    getAllUserPreferences,
    updateUserPreferences,
  };
});
