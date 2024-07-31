import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([]);
  const selectedCategories = ref([]);

  const fetchCategories = async () => {
    try {
      const data = await fetchApi('/category/all');
      if (data && data.value && data.value.value) {
        categories.value = data.value.value;
        localStorage.setItem('categories', JSON.stringify(categories.value));
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const setSelectedCategories = (newCategories) => {
    selectedCategories.value = newCategories;
    localStorage.setItem('selectedCategories', JSON.stringify(newCategories));
  };

  const initializeFromLocalStorage = () => {
    const cachedCategories = localStorage.getItem('categories');
    const cachedSelectedCategories = localStorage.getItem('selectedCategories');

    if (cachedCategories) {
      categories.value = JSON.parse(cachedCategories);
    }

    if (cachedSelectedCategories) {
      selectedCategories.value = JSON.parse(cachedSelectedCategories);
    }
  };

  const addCategory = (category) => {
    if (!selectedCategories.value.includes(category) && selectedCategories.value.length < 8) {
      selectedCategories.value.push(category);
      setSelectedCategories(selectedCategories.value);
    }
  };

  const removeCategory = (category) => {
    selectedCategories.value = selectedCategories.value.filter((cat) => cat.id !== category.id);
    setSelectedCategories(selectedCategories.value);
  };

  return {
    categories,
    selectedCategories,
    fetchCategories,
    setSelectedCategories,
    initializeFromLocalStorage,
    addCategory,
    removeCategory,
  };
});
