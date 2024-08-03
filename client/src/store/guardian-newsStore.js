// guardian-newsStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi';

export const useGuardianNewsStore = defineStore('news', () => {
  const news = ref([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(0);

  const fetchNews = async (page = 1) => {
    loading.value = true;
    try {
      const queryParams = new URLSearchParams({
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
        'show-fields': 'headline,thumbnail,body',
        'show-elements': 'image',
        'type': 'article',
        'order-by': 'newest',
        'page': page,
      }).toString();

      const response = await fetchApi(`/search?${queryParams}`, {}, true);

      if (response && response.response) {
        news.value = response.response.results;
        totalPages.value = response.response.pages;
        currentPage.value = page;
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      loading.value = false;
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      fetchNews(currentPage.value + 1);
    }
  };

  const previousPage = () => {
    if (currentPage.value > 1) {
      fetchNews(currentPage.value - 1);
    }
  };

  return { news, loading, fetchNews, nextPage, previousPage, currentPage, totalPages };
});
