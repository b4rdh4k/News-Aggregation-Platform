import { defineStore } from 'pinia';
import { useUserStore } from '@/store/user';

export const useBookmarkStore = defineStore('bookmark', {
  state: () => ({
    bookmarks: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchBookmarks() {
      this.isLoading = true;
      this.error = null;
      const userStore = useUserStore();
      try {
        const response = await fetch('https://api.sapientia.life/bookmark/all', {
          headers: {
            'Authorization': `Bearer ${userStore.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch bookmarks');
        const data = await response.json();
        this.bookmarks = data.value.Value || [];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async addBookmark(articleId) {
      this.isLoading = true;
      this.error = null;
      const userStore = useUserStore();
      try {
        const response = await fetch('https://api.sapientia.life/bookmark/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userStore.token}` 
          },
          body: JSON.stringify({ articleId }),
        });
        if (!response.ok) throw new Error('Failed to add bookmark');
        await this.fetchBookmarks();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async removeBookmark(bookmarkId) {
      this.isLoading = true;
      this.error = null;
      const userStore = useUserStore();
      try {
        const response = await fetch(`https://api.sapientia.life/bookmark/${bookmarkId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${userStore.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to delete bookmark');
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
