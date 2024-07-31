<script setup>
import { ref, computed, onMounted } from 'vue'
import PreferencesModal from '@/components/YourTopics/PreferencesModal.vue'
import { useCategoryStore } from '@/store/categoryStore'
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue'

const categoryStore = useCategoryStore()

const loading = ref(true)
const showModal = ref(false)

const selectedCategories = computed(() => categoryStore.selectedCategories)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  loading.value = false
})
</script>

<template>
  <div class="p-4">
    <div v-if="loading" class="flex justify-center items-center h-48">
      <LoadingAnimation />
    </div>

    <div v-else>
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
        <router-link :to="`/category/${category.name}`" class="mb-2" @click.stop>
          <div
            v-for="category in selectedCategories"
            :key="category.name"
            class="p-8 text-center rounded-lg shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20"
          >
            <h1 class="text-text dark:text-dark-text">{{ category.name }}</h1>
          </div>
        </router-link>
      </div>
      <PreferencesModal :show="showModal" @close="closeModal" />
    </div>
  </div>
</template>
