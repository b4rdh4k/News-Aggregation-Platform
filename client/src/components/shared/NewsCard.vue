<template>
  <div class="container mx-auto p-4">
    <div v-if="hasNews" class="news-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="card rounded-lg p-2 shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20"
        @click="handleClick(article.Id)"
      >
        <div class="img rounded-lg">
          <img
            :src="article.ImageUrl || 'https://via.placeholder.com/500'"
            alt="Article image"
            class="w-full h-full object-cover rounded-lg hover:animate-pulse"
          />
          <button class="bookmark-btn" @click.stop="toggleBookmark(article.Id)">
            <i class="fa" :class="isBookmarked(article.Id) ? 'fa-bookmark' : 'fa-bookmark-o'" aria-hidden="true"></i>
          </button>
        </div>
        <div class="text-container p-2 pb-0">
          <div class="items-center pb-2">
            <h5 class="truncate-text">{{ article.Title }}</h5>
            <p>{{ article.Source }} | {{ article.Time }}</p>
          </div>
          <div class="flex justify-end p-4 border-t-2 border-accent dark:border-dark-accent">
            <router-link :to="readMoreLink(article.Id)" class="flex items-center space-x-2">
              <p class="m-0">Read More</p>
              <i class="fa fa-arrow-circle-right" aria-hidden="true" style="font-size: 1.5em; color: var(--accent)"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center p-4">
      <LoadingAnimation />
    </div>

    <div v-if="!isLoading && !hasNews" class="flex justify-center p-4">
      <p>No news available.</p>
    </div>

    <div v-if="!isLoading && totalPages > 1" class="pagination-controls flex justify-between mt-4">
      <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useBookmarkStore } from '@/store/bookmark'
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue'

const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  totalPages: {
    type: Number,
    default: 1
  },
  currentPage: {
    type: Number,
    default: 1
  },
  hasNews: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['page-change'])

const router = useRouter()
const bookmarkStore = useBookmarkStore()

const handleClick = (articleId) => {
  if (articleId) {
    router.push({ name: 'News', params: { id: articleId } })
  } else {
    console.error('Missing article ID:', articleId)
  }
}

const readMoreLink = (articleId) => ({ name: 'News', params: { id: articleId } })

const handlePageChange = (page) => {
  emit('page-change', page)
}

const toggleBookmark = async (articleId) => {
  const existingBookmark = bookmarkStore.bookmarks.find(bookmark => bookmark.articleId === articleId);
  if (existingBookmark) {
    await bookmarkStore.removeBookmark(existingBookmark.id);
  } else {
    await bookmarkStore.addBookmark(articleId);
  }
};

const isBookmarked = (articleId) => {
  return bookmarkStore.bookmarks.some(bookmark => bookmark.articleId === articleId);
};
</script>

<style scoped>
.bookmark-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: var(--accent);
}
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  cursor: pointer;
}

.img {
  width: 100%;
  height: 13em;
  background: linear-gradient(var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.save {
  transition: 0.2s ease-in-out;
  border-radius: 10px;
  margin: 10px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: var(--accent);
}
</style>
