<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/store/categoryStore';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';
import { useToast } from 'vue-toastification';

const route = useRoute();
const categoryStore = useCategoryStore();
const toast = useToast();
const loading = ref(true);
const categoryId = route.params.id;

const articles = computed(() => categoryStore.articles[categoryId] || []);
const pages = computed(() => {
  const totalArticles = articles.value.length;
  const totalPages = Math.ceil(totalArticles / categoryStore.itemsPerPage.value);
  return Array.from({ length: totalPages }, (_, i) => i + 1);
});

const goToPage = (page) => {
  categoryStore.setPage(categoryId, page);
};

onMounted(async () => {
  if (categoryId) {
    try {
      await categoryStore.fetchArticlesByCategory(categoryId);
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
      <div v-if="articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div
          v-for="(article, idx) in articles"
          :key="idx"
          class="shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20 p-4 rounded-lg flex flex-col"
        >
          <router-link :to="`/news/${article.id}`" class="block hover:underline">
            <div class="flex flex-col items-start">
              <img :src="article.image" alt="Article image" class="w-full h-48 object-cover rounded" />
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

      <div v-if="!loading && articles.length">
        <div class="pagination">
          <button v-for="page in pages" :key="page" @click="goToPage(page)">
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
