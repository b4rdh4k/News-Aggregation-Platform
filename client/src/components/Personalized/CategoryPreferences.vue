<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePreferencesStore } from '@/store/preferences';
import PreferencesModal from '@/components/Personalized/PreferencesModal.vue';
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue';

const preferencesStore = usePreferencesStore();

const loading = ref(true);
const showModal = ref(false);

const selectedCategories = computed(() => preferencesStore.selectedCategories);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const initializeFromServer = async () => {
  await preferencesStore.fetchPreferences(); 
};

onMounted(async () => {
  try {
    await initializeFromServer();
  } catch (err) {
    console.error('Error during component initialization:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-48">
    <LoadingAnimation />
  </div>

  <div v-else class="mb-16 bg-primary bg-opacity-20 dark:bg-dark-primary dark:bg-opacity-20 p-2 rounded-lg">
    <div class="flex justify-between items-center mb-4 pb-2 border-b-[1px] border-accent dark:border-dark-accent">
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
    <PreferencesModal :show="showModal" @close="closeModal" />
  </div>
</template>
