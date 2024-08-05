// stores/search.js
import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchResults: [], 
    loading: false,
    error: null,
  }),
  actions: {
    stripHtmlTags(html) { //i kane dal <em></em> te search query
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    },

    async search(query, range = '') {
      this.loading = true;
      this.error = null;
      try {
        const url = `/article/search?query=${encodeURIComponent(query)}&range=${encodeURIComponent(range)}`;
        const data = await fetchApi(url, {
          method: 'POST',
          headers: {
            'Accept': '*/*',
          },
        });
    
        this.searchResults = data.map(result => ({
          ...result,
          title: this.stripHtmlTags(result.title)
        }));
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  },
});
