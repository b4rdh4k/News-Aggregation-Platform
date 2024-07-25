<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PreferencesModal from '@/components/HomePage/YourTopics/PreferencesModal.vue'
import { useCategoryStore } from '@/store/categoryStore'

const router = useRouter()
const categoryStore = useCategoryStore()
const selectedCategories = computed(() => categoryStore.selectedCategories)

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const goToNewsView = (story) => {
  if (story && story.id) {
    router.push({ name: 'News', params: { id: story.id } })
  } else {
    console.error('Missing story ID')
  }
}

onMounted(() => {
  categoryStore.initializeDefaults()
})
</script>

<template>
  <div class="p-4">
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
        :key="category.title"
        class="p-4 rounded-lg shadow-inner shadow-secondary dark:shadow-dark-secondary"
      >
        <router-link :to="`/category/${category.title}`" class="mb-2" @click.stop>
          <button
            class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent px-2 rounded-xl -m-1"
          >
            <p class="text-text dark:text-dark-text">{{ category.title }}</p>
          </button>
        </router-link>
        <ul>
          <li
            v-for="(item, index) in category.items"
            :key="item.id"
            class="mb-4 mt-4 cursor-pointer"
            @click="goToNewsView(item)"
          >
            <h4 class="truncate-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mb-2">
              {{ item.title }}
            </h4>
            <router-link :to="`/source/${item.source}`" class="mb-2" @click.stop>
              <p
                class="text-accent dark:text-dark-accent cursor-pointer hover:text-secondary dark:hover:text-dark-secondary"
              >
                <span class="italic font-serif">{{ item.source }}</span>
                <span class="text-text dark:text-dark-text"> | {{ item.time }}</span>
              </p>
            </router-link>
            <hr
              v-if="index < category.items.length - 1"
              class="border-b mt-4 border-secondary dark:border-dark-secondary"
            />
          </li>
        </ul>
      </div>
    </div>
    <PreferencesModal :show="showModal" @close="closeModal" />
  </div>
</template>
