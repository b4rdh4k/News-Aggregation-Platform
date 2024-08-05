import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi';

export const useBookmarkStore = defineStore('bookmark', {
  state: () => ({
    bookmarks: [],
    loading: false,
    error: null,
  }),

  actions: {
    async createBookmark(articleId) {
      this.loading = true;
      this.error = null;

      try {
        await fetchApi('/bookmark/create', {
          method: 'POST',
          body: JSON.stringify({ articleId }),
        });
      } catch (error) {
        this.error = error.message;
        console.error('Error creating bookmark:', error);
      } finally {
        this.loading = false;
      }
    },

    async deleteBookmark(bookmarkId) {
      this.loading = true;
      this.error = null;

      try {
        await fetchApi(`/bookmark/${bookmarkId}`, {
          method: 'DELETE',
        });
      } catch (error) {
        this.error = error.message;
        console.error('Error deleting bookmark:', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchSavedArticles(range = null) {
      this.loading = true;
      this.error = null;

      try {
        const url = `/user/saved-articles${range ? `?range=${range}` : ''}`;
        const response = await fetchApi(url);

        this.bookmarks = response;
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching saved articles:', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
