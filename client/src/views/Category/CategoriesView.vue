<script setup>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useCategoryStore } from '@/store/categoryStore';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';

const toast = useToast();
const categoryStore = useCategoryStore();
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 12;
const error = ref(false);

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    toast.error('Failed to fetch categories.');
    error.value = true;
  } finally {
    loading.value = false;
  }
});


const paginatedCategories = computed(() => {
  console.log('Paginated categories:', categoryStore.categories);
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return categoryStore.categories.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value * itemsPerPage < categoryStore.categories.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const noCategories = computed(() => {
  return !loading.value && !error.value && categoryStore.categories.length === 0;
});
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="b-4 pb-2 mb-4 border-b-2 border-dashed border-secondary dark:border-dark-secondary">
      <h3 class="font-bold text-accent dark:text-dark-accent mb-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Explore the News Universe
      </h3>
      <p class="text-secondary dark:text-dark-secondary font-thin italic text-base lg:text-lg">
        Embark on a journey through diverse topics and stay updated.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-48">
      <LoadingAnimation />
    </div>

    <div v-if="error" class="flex justify-center items-center h-48">
      <p>There was an error loading the categories. Please try again later.</p>
    </div>

    <div v-else>
      <div v-if="noCategories" class="flex justify-center items-center h-48">
        <p>No categories available.</p>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div
            v-for="(category, index) in paginatedCategories"
            :key="index"
            class="shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20 p-4 rounded-lg flex flex-col"
          >
            <h5 class="text-accent dark:text-dark-accent font-bold mb-4 pb-2 border-b-[1px] border-primary dark:border-dark-primary">
              {{ category.name }}
            </h5>
            <div v-if="category.articles && category.articles.length > 0" class="flex flex-col lg:flex-row gap-4 flex-grow">
            </div>
            <div v-else>
              <p>No articles available in this category.</p>
            </div>
            <div class="flex justify-end pt-2 mt-auto">
              <router-link :to="`/category/${category.id}`">
                <button class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text p-3 rounded-xl">
                  More articles
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-secondary dark:bg-dark-secondary hover:bg-accent dark:hover:bg-dark-accent transition-shadow rounded">
            Previous
          </button>
          <button @click="nextPage" :disabled="currentPage * itemsPerPage >= categoryStore.categories.length" class="px-4 py-2 bg-secondary dark:bg-dark-secondary hover:bg-accent dark:hover:bg-dark-accent transition-shadow rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
