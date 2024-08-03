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
    const response = await fetchApi('/category/all');
    console.log('API response:', response); // Log the raw response

    // Check if 'value' and 'Value' properties exist and are valid
    if (response && response.value && Array.isArray(response.value.Value)) {
      // Transform and set categories
      categories.value = response.value.Value.map(category => ({
        id: category.Id,
        name: category.Name,
        description: category.Description,
        articles: category.Articles
      }));
      console.log('Categories fetched:', categories.value); // Log the fetched categories
    } else {
      console.error('Unexpected data format for categories:', response);
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
      } else {
        console.error('Unexpected data format for articles:', data);
      }
    } catch (error) {
      console.error(`Failed to fetch articles for category ${categoryId}`, error);
    }
  };

  const savePreferencesToServer = async (preferences) => {
    try {
      await fetchApi('/user/save-preferences', {
        method: 'POST',
        body: JSON.stringify({ preferences }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  };

  const setSelectedCategories = async (newCategories) => {
    selectedCategories.value = newCategories;
    await savePreferencesToServer(newCategories);
  };

  const initializeFromServer = async () => {
    try {
      const data = await fetchApi('/user/view-preferences');
      if (data && Array.isArray(data)) {
        selectedCategories.value = data;
      } else {
        console.error('Unexpected data format for preferences:', data);
      }
    } catch (error) {
      console.error('Failed to fetch user preferences', error);
    }
  };

  const addCategory = (category) => {
    if (!selectedCategories.value.some((c) => c.id === category.id) && selectedCategories.value.length < 9) {
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
    initializeFromServer, // Use this function to initialize preferences when the user logs in
    addCategory,
    removeCategory,
    setPage,
  };
});
