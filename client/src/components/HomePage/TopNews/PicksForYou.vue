<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRecommendedStore } from '@/store/recommended'

const route = useRoute()
const recommendedStore = useRecommendedStore()
const picksForYou = ref([])

// Dummy data with absolute dates for testing
const dummyData = [
  { id: '1', title: 'Exciting News in Tech', source: 'TechDaily', createdAt: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString() },
  { id: '2', title: 'Latest Trends in AI', source: 'AI Times', createdAt: new Date(new Date().getTime() - 5 * 60 * 60 * 1000).toISOString() },
  { id: '3', title: 'Sports Update: Major League Highlights', source: 'SportsNet', createdAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString() },
  { id: '4', title: 'Finance Tips for the Modern Investor', source: 'Finance World', createdAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() }
]

const formatDate = (date) => {
  if (!date) return 'Unknown date'
  const parsedDate = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now - parsedDate) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return parsedDate.toLocaleDateString()
}

onMounted(async () => {
  try {
    await recommendedStore.fetchRecommendedNews()

    if (recommendedStore.recommendedNews.length === 0) {
      picksForYou.value = dummyData.map(item => ({
        ...item,
        createdAt: formatDate(item.createdAt) // Format date
      }));
    } else {
      picksForYou.value = recommendedStore.recommendedNews.slice(0, 5).map(pick => ({
        ...pick,
        createdAt: formatDate(pick.createdAt) // Format date
      }));
      console.log('Recommended News:', recommendedStore.recommendedNews)
    }
  } catch (error) {
    console.error('Error fetching recommended news:', error)
  }
})
</script>

<template>
  <div class="container bg-secondary dark:bg-dark-secondary rounded-lg p-2">
    <div
      v-for="(pick, index) in picksForYou"
      :key="index"
      class="item cursor-pointer flex items-start space-x-2 border-b pb-2 last:border-b-0"
      @click="goToNewsView(pick.id)"
    >
      <router-link :to="`/source/${pick.source}`" class="source text-accent dark:text-dark-accent font-serif text-sm italic hover:text-secondary dark:hover:text-dark-secondary">
        {{ pick.source }}
      </router-link>
      <div class="flex-1">
        <h4 class="title text-sm font-medium truncate">{{ pick.title }}</h4>
        <p class="time text-xs text-text dark:text-dark-text truncate">{{ pick.createdAt }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%; /* Ensure the container takes up the full width of its parent */
  margin: 0 auto; /* Center horizontally if the parent has a specific width */
  overflow: hidden; /* Hide overflow to ensure no elements spill out */
}

.item {
  max-width: 100%; /* Ensure items don't exceed the container's width */
}

.source {
  max-width: 20%; /* Adjust based on available space */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title {
  max-width: 80%; /* Adjust based on available space */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.time {
  max-width: 80%; /* Adjust based on available space */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bg-secondary, .dark:bg-dark-secondary {
  background-color: #f7f7f7; /* Light background for compact view */
}

.text-accent, .dark:text-dark-accent {
  color: #007bff; /* Accent color for source */
}

.text-text, .dark:text-dark-text {
  color: #333; /* Text color */
}

.border-b {
  border-bottom-width: 1px;
}

.pb-2 {
  padding-bottom: 0.5rem;
}

.last\:border-b-0:last-child {
  border-bottom-width: 0;
}
</style>
