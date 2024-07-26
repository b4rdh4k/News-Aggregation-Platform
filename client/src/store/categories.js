import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([]);
  const category = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const createCategory = async (name, description) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const data = await response.json();
      categories.value.push(data);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const deleteCategory = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`/category/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      categories.value = categories.value.filter(cat => cat.id !== id);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getCategory = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`/category/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const data = await response.json();
      category.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getCategoryByName = async (name) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`/category/name/${name}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch category by name');
      }

      const data = await response.json();
      category.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getAllCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('/category/all', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch all categories');
      }

      const data = await response.json();
      categories.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    category,
    loading,
    error,
    createCategory,
    deleteCategory,
    getCategory,
    getCategoryByName,
    getAllCategories,
  };
});
