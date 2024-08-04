<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading" class="flex justify-center p-4">
      <LoadingAnimation />
    </div>
    <div v-else>
      <NewsCard
        :articles="visibleTrendingNews"
        :totalPages="totalPages"
        :currentPage="currentPage"
        :hasNews="hasTrendingNews"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import NewsCard from '@/components/shared/NewsCard.vue'
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const trendingNews = ref([])
const visibleTrendingNews = ref([])
const perPage = 8
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(trendingNews.value.length / perPage))
const isLoading = ref(true)

const hasTrendingNews = computed(() => visibleTrendingNews.value.length > 0)

const fetchTrendingNews = async () => {
  try {
    const response = await fetch('https://api.sapientia.life/article/trending')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log('API Response:', data) // Log the response to inspect it
    if (data && Array.isArray(data.Value)) {
      trendingNews.value = data.Value
      updateVisibleNews()
    } else {
      console.error('Fetched data does not contain the expected array structure:', data)
      toast.error('Failed to load trending news. Please try again later.')
    }
  } catch (error) {
    console.error('Error fetching trending news:', error)
    toast.error('An error occurred while fetching trending news.')
  } finally {
    isLoading.value = false
  }
}

const updateVisibleNews = () => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  visibleTrendingNews.value = trendingNews.value.slice(start, end)
}

const handlePageChange = (page) => {
  currentPage.value = page
  updateVisibleNews()
}

onMounted(async () => {
  await nextTick()
  fetchTrendingNews()
})
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  cursor: pointer;
}

.img {
  width: 100%;
  height: 13em;
  background: linear-gradient(var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 7px 20px;
}

.text-container h5 {
  font-size: medium;
  font-weight: 600;
  margin: 0;
}

.text-container p {
  font-size: 13px;
  margin: 0;
}

.text-container .author,
.text-container .time {
  font-size: 12px;
  margin: 0;
}
</style>
