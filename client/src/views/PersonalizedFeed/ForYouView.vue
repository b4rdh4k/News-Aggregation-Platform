<script setup>
import { ref, computed, onMounted } from 'vue';
import PreferencesModal from '@/components/Personalized/PreferencesModal.vue';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';
import ArticleModal from '@/components/Personalized/ArticleModal.vue';
import { useCategoryStore } from '@/store/categoryStore';
import { useGuardianNewsStore } from '@/store/guardian-newsStore';

const categoryStore = useCategoryStore();
const newsStore = useGuardianNewsStore();

const loading = ref(true);
const showModal = ref(false);
const modalVisible = ref(false);
const selectedArticle = ref(null);
const selectedCategories = computed(() => categoryStore.selectedCategories);

const currentPage = ref(1);
const totalPages = computed(() => newsStore.totalPages);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

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
  await categoryStore.initializeFromServer();
  await newsStore.fetchNews(currentPage.value);
  loading.value = false;
});
</script>

<template>
  <div class="p-4">
    <!-- Loading Animation -->
    <div v-if="loading" class="flex justify-center items-center h-48">
      <LoadingAnimation />
    </div>

    <!-- Content After Loading -->
    <div v-else>
      <!-- Categories Section -->
      <div class="mb-16 bg-primary bg-opacity-20 dark:bg-dark-primary dark:bg-opacity-20 p-2 rounded-lg">
        <div
          class="flex justify-between items-center mb-4 pb-2 border-b-[1px] border-accent dark:border-dark-accent"
        >
          <h1 class="text-3xl text-accent dark:text-dark-accent font-bold">Your topics</h1>
          <div class="relative">
            <button
              @click="openModal"
              class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text p-3 rounded-xl"
            >
              Preferences
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="category in selectedCategories"
            :key="category.id"
            class="p-4 rounded-lg shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20"
          >
            <router-link :to="`/category/${category.name}`" class="mb-2" @click.stop>
              <button
                class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent px-2 rounded-xl -m-1"
              >
                <p class="text-text dark:text-dark-text">{{ category.name }}</p>
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- News Section -->
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

      <!-- Pagination Controls -->
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

      <!-- Modals -->
      <ArticleModal :show="modalVisible" :article="selectedArticle" @close="closeArticleModal" />
      <PreferencesModal :show="showModal" @close="closeModal" />
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
