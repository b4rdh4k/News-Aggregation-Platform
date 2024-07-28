import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const searchResults = ref([]);
  const isLoading = ref(false);

  const search = async (query) => {
    isLoading.value = true;
    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: mockSearchResults(query) }), 1000)
      );
      searchResults.value = response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return { searchResults, isLoading, search };
});

const mockSearchResults = (query) => {
  const allResults = [
    { id: 1, title: 'Introduction to Vue.js' },
    { id: 2, title: 'Advanced Vue Components' },
    { id: 3, title: 'Understanding Vuex' },
    { id: 4, title: 'Vue Router Basics' },
    { id: 5, title: 'Building a Vue Application' },
    { id: 6, title: 'State Management with Vuex' },
    { id: 7, title: 'Vue 3 Composition API' },
    { id: 8, title: 'Developing with Vite' },
    { id: 9, title: 'Vue.js Performance Optimization' },
    { id: 10, title: 'Testing Vue Applications' },
    { id: 11, title: 'Deploying Vue Applications' },
    { id: 12, title: 'Introduction to Pinia' },
    { id: 13, title: 'Handling Forms in Vue' },
    { id: 14, title: 'Building Reusable Components' },
    { id: 15, title: 'Vue.js and TypeScript' },
    { id: 16, title: 'Server-Side Rendering with Vue' },
    { id: 17, title: 'Building Progressive Web Apps with Vue' },
    { id: 18, title: 'Vue.js Animations and Transitions' },
    { id: 19, title: 'Integrating APIs with Vue' },
    { id: 20, title: 'Vue.js Best Practices' }
  ];

  const terms = query.toLowerCase().split(' ').filter(term => term);

  return allResults.filter(result => 
    terms.every(term => result.title.toLowerCase().includes(term))
  ).slice(0, 10);
};
