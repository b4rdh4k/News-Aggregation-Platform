<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore';
import { useBookmarkStore } from '@/store/bookmark';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';
import { useToast } from 'vue-toastification';

const route = useRoute();
const categoryStore = useCategoryStore();
const bookmarkStore = useBookmarkStore();
const toast = useToast();
const loading = ref(true);
const categoryId = route.params.id;
const currentPage = ref(1);
const itemsPerPage = 12;

const articles = computed(() => categoryStore.articles[categoryId] || []);
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return articles.value.slice(start, start + itemsPerPage);
});
const totalPages = computed(() => Math.ceil(articles.value.length / itemsPerPage));

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const getImageUrl = (imageUrl) => {
  return imageUrl || '@/assets/media/placeholderImage.png';
};

const toggleBookmark = async (articleId) => {
  try {
    const isBookmarked = bookmarkStore.bookmarks.some(b => b.id === articleId);
    if (isBookmarked) {
      await bookmarkStore.deleteBookmark(articleId);
    } else {
      await bookmarkStore.createBookmark(articleId);
    }
    await categoryStore.fetchArticlesByCategory(categoryId); // Refresh the articles after bookmarking
    toast.success(isBookmarked ? 'Bookmark removed.' : 'Article bookmarked.');
  } catch (error) {
    console.error('Failed to toggle bookmark:', error);
    toast.error('Failed to toggle bookmark.');
  }
};

onMounted(async () => {
  if (categoryId) {
    try {
      await categoryStore.fetchArticlesByCategory(categoryId);
      await bookmarkStore.fetchSavedArticles();
    } catch (error) {
      console.error(`Failed to fetch articles for category ${categoryId}:`, error);
      toast.error(`Failed to fetch articles for category ${categoryId}.`);
    } finally {
      loading.value = false;
    }
  } else {
    console.error('Category ID is not defined.');
  }
});
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="b-4 pb-2 mb-4 border-b-2 border-dashed border-secondary dark:border-dark-secondary">
      <h3 class="font-bold text-accent dark:text-dark-accent mb-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Category Articles
      </h3>
      <p class="text-secondary dark:text-dark-secondary font-thin italic text-base lg:text-lg">
        Browse all articles for this category.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-48">
      <LoadingAnimation />
    </div>

    <div v-else>
      <div v-if="paginatedArticles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div
          v-for="(article, idx) in paginatedArticles"
          :key="idx"
          class="shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20 p-4 rounded-lg flex flex-col relative"
        >
          <router-link :to="`/news/${article.id}`" class="block hover:underline">
            <div class="flex flex-col items-start">
              <img :src="getImageUrl(article.image)" alt="Article image" class="w-full h-48 object-cover rounded" />
              <div
                class="absolute top-2 right-2 z-10 text-white cursor-pointer"
                @click.stop="toggleBookmark(article.id)"
              >
                <i :class="['fa', bookmarkStore.bookmarks.some(b => b.id === article.id) ? 'fa-bookmark' : 'fa-bookmark-o']" aria-hidden="true"></i>
              </div>
              <div class="mt-2">
                <h3 class="text-lg font-semibold truncate-multiline">{{ article.title }}</h3>
                <router-link :to="`/source/${article.source}`" class="mb-2" @click.stop>
                  <p class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-primary dark:hover:text-dark-primary">
                    {{ article.source }}
                  </p>
                </router-link>
                <p class="text-text dark:text-dark-text text-sm sm:text-base md:text-base lg:text-lg xl:text-lg">
                  {{ article.time }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500 dark:text-gray-400">No Articles Found</p>
      </div>

      <div v-if="!loading && totalPages > 1" class="pagination mt-4 flex justify-center">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="['page-btn', { 'active': page === currentPage }]"
          class="mx-1 px-3 py-1 border rounded"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-btn {
  background-color: var(--primary);
  color: var(--text);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-btn.active,
.page-btn:hover {
  background-color: var(--accent);
}

.fa-bookmark {
  font-size: 1.5rem; 
  color: var(--accent);
}

.fa-bookmark-o {
  font-size: 1.5rem;
  color: var(--text);
}
</style>
