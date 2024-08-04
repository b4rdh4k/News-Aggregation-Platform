import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useToast } from 'vue-toastification';
import { fetchApi } from '@/utils/fetchApi'; // Ensure this path is correct

export const useBookmarkStore = defineStore('bookmark', () => {
  const userStore = useUserStore();
  const toast = useToast();
  const bookmarks = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchBookmarks = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await fetchApi('/bookmark/all');
      bookmarks.value = data.Value || [];
    } catch (err) {
      error.value = err.message;
      toast.error('Failed to fetch bookmarks');
    } finally {
      isLoading.value = false;
    }
  };

  const addBookmark = async (articleId) => {
    isLoading.value = true;
    error.value = null;
    try {
      const newBookmark = await fetchApi('/bookmark/create', {
        method: 'POST',
        body: JSON.stringify({ articleId }),
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
    isLoading.value = true;
    error.value = null;
    try {
      await fetchApi(`/bookmark/${bookmarkId}`, {
        method: 'DELETE',
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
