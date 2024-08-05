<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRecommendedStore } from '@/store/recommended'

const router = useRouter();
const recommendedStore = useRecommendedStore()
const picksForYou = ref([]);

// Dummy data
const dummyData = [
  { id: '1', title: 'Exciting News in Tech', source: 'TechDaily', time: '2 hours ago' },
  { id: '2', title: 'Latest Trends in AI', source: 'AI Times', time: '5 hours ago' },
  { id: '3', title: 'Sports Update: Major League Highlights', source: 'SportsNet', time: '1 day ago' },
  { id: '4', title: 'Finance Tips for the Modern Investor', source: 'Finance World', time: '3 days ago' }
];

onMounted(async () => {
  try {
    await recommendedStore.fetchRecommendedNews()

    if (recommendedStore.recommendedNews.length === 0) {
      picksForYou.value = dummyData;
    } else {
      picksForYou.value = recommendedStore.recommendedNews.slice(0, 4)
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
      @click="goToNewsView(pick)"
    >
      <router-link :to="`/source/${pick.source}`" class="source text-accent dark:text-dark-accent font-serif text-sm italic hover:text-secondary dark:hover:text-dark-secondary">
        {{ pick.source }}
      </router-link>
      <div class="flex-1">
        <h4 class="title text-sm font-medium truncate">{{ pick.title }}</h4>
        <p class="time text-xs text-text dark:text-dark-text truncate">{{ pick.time }}</p>
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
