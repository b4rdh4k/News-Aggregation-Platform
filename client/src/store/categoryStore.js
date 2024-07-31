import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi';  

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([]);
  const selectedCategories = ref([]);

  const fetchCategories = async () => {
    try {
      const data = await fetchApi('/category/all');
      console.log('Fetched categories:', data); 
      if (data && data.value && data.value.value) {
        categories.value = data.value.value;
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };
  
  

  const addCategory = (category) => {
    if (!selectedCategories.value.includes(category) && selectedCategories.value.length < 8) {
      selectedCategories.value.push(category);
    }
  };

  const removeCategory = (category) => {
    selectedCategories.value = selectedCategories.value.filter((cat) => cat !== category);
  };

  fetchCategories();

  return {
    categories,
    selectedCategories,
    addCategory,
    removeCategory,
    setSelectedCategories: (newCategories) => { selectedCategories.value = newCategories; },
    fetchCategories, 
  };
});
