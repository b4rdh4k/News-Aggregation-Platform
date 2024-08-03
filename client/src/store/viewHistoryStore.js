import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi'; 

export const useViewHistoryStore = defineStore('viewHistory', {
  state: () => ({
    viewHistory: [], 
    error: null, 
  }),
  actions: {
    async fetchViewHistory(range = null) {
      try {
        this.error = null;
        const response = await fetchApi('/user/view-history', {
          method: 'GET',
          query: { range }, 
        });
        this.viewHistory = response; 
      } catch (error) {
        this.error = error.message;
      }
    },
  },
});
