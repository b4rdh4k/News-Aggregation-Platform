import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([]);
  const selectedCategories = ref([]);
  const articles = ref({}); 
  const currentPage = ref({});
  const itemsPerPage = ref(10); 

  const fetchCategories = async () => {
    try {
      const data = await fetchApi('/category/all');
      if (data && data.value && data.value.value) {
        categories.value = data.value.value;
        console.log(categories.value);
        localStorage.setItem('categories', JSON.stringify(categories.value));
      } else {
        console.error('Unexpected data format for categories:', data);
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchArticlesByCategory = async (categoryId, page = 1) => {
    try {
      const url = `/article/category?categoryId=${categoryId}&range=${itemsPerPage.value}&page=${page}`;
      const data = await fetchApi(url);

      if (Array.isArray(data)) {
        articles.value[categoryId] = data;
        currentPage.value[categoryId] = page;
        localStorage.setItem(`articles_${categoryId}`, JSON.stringify(data));
      } else {
        console.error('Unexpected data format for articles:', data);
      }
    } catch (error) {
      console.error(`Failed to fetch articles for category ${categoryId}`, error);
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
    if (!selectedCategories.value.includes(category) && selectedCategories.value.length < 9) {
      selectedCategories.value.push(category);
      setSelectedCategories(selectedCategories.value);
    }
  };

  const removeCategory = (category) => {
    selectedCategories.value = selectedCategories.value.filter((cat) => cat.id !== category.id);
    setSelectedCategories(selectedCategories.value);
  };

  const setPage = (categoryId, page) => {
    currentPage.value[categoryId] = page;
    fetchArticlesByCategory(categoryId, page);
  };

  return {
    categories,
    selectedCategories,
    articles,
    currentPage,
    itemsPerPage,
    fetchCategories,
    fetchArticlesByCategory,
    setSelectedCategories,
    initializeFromLocalStorage,
    addCategory,
    removeCategory,
    setPage,
  };
});
