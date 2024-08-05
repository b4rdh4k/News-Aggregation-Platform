<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useToast } from 'vue-toastification'
import { useNewsStore } from '@/store/newsStore.js'
import { useBookmarkStore } from '@/store/bookmark'
import { useRouter } from 'vue-router'
import NewsCard from '@/components/shared/NewsCard.vue'

const toast = useToast()
const newsStore = useNewsStore()
const bookmarkStore = useBookmarkStore()
const isLoading = ref(true)
const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const loadNews = async () => {
  try {
    isLoading.value = true
    await newsStore.fetchAllStories()
  } catch (error) {
    console.error('Failed to fetch news:', error)
    toast.error('Failed to fetch news.')
  } finally {
    isLoading.value = false
  }
}

const handlePageChange = async (page) => {
  try {
    isLoading.value = true
    await newsStore.fetchPage(page)
  } catch (error) {
    console.error('Failed to fetch news for page:', error)
    toast.error('Failed to fetch news for the selected page.')
  } finally {
    isLoading.value = false
  }
}

const toggleBookmark = async (articleId) => {
  try {
    const isBookmarked = bookmarkStore.bookmarks.some(b => b.id === articleId)
    if (isBookmarked) {
      await bookmarkStore.deleteBookmark(articleId)
    } else {
      await bookmarkStore.createBookmark(articleId)
    }
    await newsStore.fetchAllStories() // Refresh the news after bookmarking
    toast.success(isBookmarked ? 'Bookmark removed.' : 'Article bookmarked.')
  } catch (error) {
    console.error('Failed to toggle bookmark:', error)
    toast.error('Failed to toggle bookmark.')
  }
}

onMounted(async () => {
  await nextTick()
  loadNews()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-4 pb-4 border-b-2 border-dashed border-accent dark:border-dark-accent">
      <h2 class="text-3xl text-accent dark:text-dark-accent font-bold">All News</h2>
      <button @click="goBack" class="btn-go-back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
        <span class="ml-2">Go Back</span>
      </button>
    </div>

    <NewsCard
      :articles="newsStore.visibleNews"
      :isLoading="isLoading"
      :hasNews="newsStore.visibleNews.length > 0"
      @toggleBookmark="toggleBookmark"
    />

    <div v-if="newsStore.totalPages > 1" class="pagination-controls mt-4">
      <button
        v-for="page in newsStore.totalPages"
        :key="page"
        @click="handlePageChange(page)"
        :class="['page-btn', { 'active': page === newsStore.currentPage }]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-go-back {
  background-color: var(--primary);
  color: var(--text);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-go-back:hover {
  background-color: var(--accent);
}

.btn-go-back i {
  font-size: 1.2em;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-btn {
  background-color: var(--primary);
  color: var(--text);
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-btn.active,
.page-btn:hover {
  background-color: var(--accent);
}
</style>

