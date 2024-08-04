<script setup>
import { ref, onMounted } from 'vue';
import { useBookmarkStore } from '@/store/bookmark';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const bookmarkStore = useBookmarkStore();
const router = useRouter();

const fetchBookmarkedArticles = async () => {
  try {
    await bookmarkStore.fetchBookmarks();
  } catch (error) {
    console.error('Failed to fetch bookmarks:', error);
    toast.error('Failed to fetch bookmarks.');
  }
};

const removeBookmark = async (bookmarkId) => {
  try {
    await bookmarkStore.removeBookmark(bookmarkId);
    toast.success('Article removed from bookmarks.');
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    toast.error('Failed to remove bookmark.');
  }
};

onMounted(fetchBookmarkedArticles);
</script>

<template>
  <div class="container mx-auto p-4">
    <div
      class="flex justify-between items-center mb-4 pb-4 border-b-2 border-dashed border-accent dark:border-dark-accent"
    >
      <h2 class="text-3xl text-accent dark:text-dark-accent font-bold">Bookmarked News</h2>
      <button @click="router.go(-1)" class="btn-go-back">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
        <span class="ml-2">Go Back</span>
      </button>
    </div>
    <div
      v-if="bookmarkStore.bookmarks.length > 0"
      class="news-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="(article, index) in bookmarkStore.bookmarks"
        :key="index"
        class="card rounded-lg p-2 shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20"
      >
        <div class="img rounded-lg">
          <img
            :src="article.image"
            alt="Article image"
            class="w-full h-full object-cover rounded-lg hover:animate-pulse"
          />
          <div class="remove" @click="removeBookmark(article.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <div class="text-container p-2 pb-0">
          <div class="items-center pb-2">
            <h5 class="truncate-text">{{ article.title }}</h5>
            <p class="pt-2">{{ article.source }}</p>
            <p>{{ article.time }}</p>
          </div>
          <div class="flex justify-end p-4 border-t-2 border-accent dark:border-dark-accent">
            <router-link :to="article.link" class="flex items-center space-x-2">
              <p class="m-0">Read More</p>
              <i
                class="fa fa-arrow-circle-right"
                aria-hidden="true"
                style="font-size: 1.5em; color: var(--accent)"
              ></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bookmarkStore.isLoading" class="flex justify-center p-4">
      <LoadingAnimation />
    </div>

    <div v-if="!bookmarkStore.isLoading && bookmarkStore.bookmarks.length === 0" class="flex justify-center p-4">
      <p>No bookmarked articles available.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.news-container {
  overflow: auto;
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

  &:hover {
    cursor: pointer;
  }
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

.remove {
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

  svg {
    transition: 0.2s ease-in-out;
    width: 15px;
    height: 15px;
    stroke: var(--accent);
  }
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 7px 20px;

  h5 {
    font-size: medium;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 13px;
    margin: 0;
  }

  .author,
  .time {
    font-size: 12px;
    margin: 0;
  }
}

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

  &:hover {
    background-color: var(--accent);
  }

  i {
    font-size: 1.2em;
  }
}
</style>

