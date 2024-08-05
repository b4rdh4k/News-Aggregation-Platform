import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi';

export const usePreferencesStore = defineStore('preferences', () => {
  const categories = ref([]);
  const selectedCategories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchAllCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchApi('/category/all');
      if (response && response.value && Array.isArray(response.value.Value)) {
        categories.value = response.value.Value.map((category) => ({
          id: category.Id,
          name: category.Name,
          description: category.Description,
          articles: category.Articles,
        }));
      } else {
        console.error('Unexpected data format for categories:', response);
      }
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching all categories:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchPreferences = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchApi('/user/view-preferences');
      if (Array.isArray(response)) {
        selectedCategories.value = response.map(pref => ({
          id: pref.CategoryId,
          name: categories.value.find(cat => cat.id === pref.CategoryId)?.name || 'Unknown',
        }));
      } else {
        console.error('Unexpected data format for preferences:', response);
      }
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching preferences:', err);
    } finally {
      loading.value = false;
    }
  };

  const addPreference = async (categoryId) => {
    loading.value = true;
    error.value = null;

    try {
      await fetchApi('/preferences/add', {
        method: 'POST',
        body: JSON.stringify({ categoryId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await fetchPreferences();
    } catch (err) {
      error.value = err.message;
      console.error('Error adding preference:', err);
    } finally {
      loading.value = false;
    }
  };

  const removePreference = async (categoryId) => {
    loading.value = true;
    error.value = null;

    try {
      const preferenceToDelete = selectedCategories.value.find(pref => pref.id === categoryId);
      if (preferenceToDelete) {
        await fetchApi(`/preferences/remove/${preferenceToDelete.id}`, {
          method: 'DELETE',
        });
        await fetchPreferences(); 
      } else {
        console.error('Preference not found for removal:', categoryId);
      }
    } catch (err) {
      error.value = err.message;
      console.error('Error removing preference:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    selectedCategories,
    loading,
    error,
    fetchAllCategories,
    fetchPreferences,
    addPreference,
    removePreference,
  };
});
