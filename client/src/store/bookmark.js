import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useToast } from 'vue-toastification';
import { fetchApi } from '@/utils/fetchApi';

export const useBookmarkStore = defineStore('bookmark', () => {
  const userStore = useUserStore();
  const toast = useToast();
  const bookmarks = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchBookmarks = async () => {
    if (!userStore.token) {
      error.value = 'User not authenticated';
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      const data = await fetchApi('https://89xx7tdx-5095.euw.devtunnels.ms/bookmark/all', {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      bookmarks.value = data.Value || [];
    } catch (err) {
      error.value = err.message;
      toast.error('Failed to fetch bookmarks');
    } finally {
      isLoading.value = false;
    }
  };

  const addBookmark = async (articleId) => {
    if (!userStore.token) {
      error.value = 'User not authenticated';
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      const newBookmark = await fetchApi('https://89xx7tdx-5095.euw.devtunnels.ms/bookmark/create', {
        method: 'POST',
        body: JSON.stringify({ articleId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      bookmarks.value.push(newBookmark);
      toast.success('Bookmark added successfully');
    } catch (err) {
      error.value = err.message;
      toast.error('Failed to add bookmark');
    } finally {
      isLoading.value = false;
    }
  };

  const removeBookmark = async (bookmarkId) => {
    if (!userStore.token) {
      error.value = 'User not authenticated';
      return;
    }

    isLoading.value = true;
    error.value = null;
    try {
      await fetchApi(`https://89xx7tdx-5095.euw.devtunnels.ms/bookmark/${bookmarkId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      bookmarks.value = bookmarks.value.filter(bookmark => bookmark.id !== bookmarkId);
      toast.success('Bookmark removed successfully');
    } catch (err) {
      error.value = err.message;
      toast.error('Failed to delete bookmark');
    } finally {
      isLoading.value = false;
    }
  };

  return {
    bookmarks,
    isLoading,
    error,
    fetchBookmarks,
    addBookmark,
    removeBookmark,
  };
});
