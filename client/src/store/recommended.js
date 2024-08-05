import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchApi } from '@/utils/fetchApi'

export const useRecommendedStore = defineStore('recommended', () => {
  const recommendedNews = ref([])

  async function fetchRecommendedNews() {
    try {
      const response = await fetchApi('/article/recommended');
      console.log('API Response:', response);  // Log the response to check its structure
      recommendedNews.value = response.value || [];
    } catch (error) {
      console.error('Error fetching recommended news:', error.message);
    }
  }
  

  return {
    recommendedNews,
    fetchRecommendedNews
  }
})
