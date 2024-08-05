<script setup>
import { ref, computed, onMounted } from 'vue';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';
import ArticleModal from '@/components/Personalized/ArticleModal.vue';
import { useGuardianNewsStore } from '@/store/guardian-newsStore';

const newsStore = useGuardianNewsStore();

const loading = ref(true);
const modalVisible = ref(false);
const selectedArticle = ref(null);

const currentPage = ref(1);
const totalPages = computed(() => newsStore.totalPages);


const openArticleModal = (article) => {
  selectedArticle.value = article;
  modalVisible.value = true;
};

const closeArticleModal = () => {
  modalVisible.value = false;
  selectedArticle.value = null;
};

const changePage = async (page) => {
  currentPage.value = page;
  await newsStore.fetchNews(page);
};

onMounted(async () => {
  await newsStore.fetchNews(currentPage.value);
  loading.value = false;
});
</script>

<template>
  <div class="p-4">
    <div v-if="loading" class="flex justify-center items-center h-48">
      <LoadingAnimation />
    </div>

    <div v-else>
      <div
        class="flex justify-between items-center mb-4 pb-2 border-b-2 border-dashed border-accent dark:border-dark-accent"
      >
        <h1 class="text-3xl text-accent dark:text-dark-accent font-bold">Special news</h1>
        <p class="text-text dark:text-dark-text font-thin italic">Collected from The Guardian and brought here just for you 💌</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        <div
          v-for="item in newsStore.news"
          :key="item.id"
          class="p-4 rounded-lg shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary"
          @click="openArticleModal(item)"
        >
          <div class="flex flex-col h-full">
            <div class="mb-4 h-12">
              <h2 class="text-xl line-clamp-2">{{ item.webTitle }}</h2>
            </div>
            <div class="mt-auto">
              <img :src="item.fields.thumbnail" alt="Thumbnail" class="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center mt-4">
        <button
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
          class="px-4 py-2 mx-1 bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text rounded-md"
        >
          Previous
        </button>
        <span class="px-4 py-2">{{ currentPage }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
          class="px-4 py-2 mx-1 bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text rounded-md"
        >
          Next
        </button>
      </div>

      <ArticleModal :show="modalVisible" :article="selectedArticle" @close="closeArticleModal" />
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
