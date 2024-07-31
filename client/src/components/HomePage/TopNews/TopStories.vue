<template>
  <div class="container mx-auto p-4">
    <div v-if="hasTrendingNews" class="news-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="(article, index) in visibleTrendingNews"
        :key="index"
        class="card rounded-lg p-2 shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20"
        @click="goToNewsView(article.Id)"
      >
        <div class="img rounded-lg">
          <img
            :src="article.ImageUrl || 'https://via.placeholder.com/500'"
            alt="Article image"
            class="w-full h-full object-cover rounded-lg hover:animate-pulse"
          />
        </div>

        <div class="text-container p-2 pb-0">
          <div class="items-center pb-2">
            <h5 class="truncate-text">{{ article.Title }}</h5>
            <p>{{ article.Source }} | {{ article.Time }}</p>
          </div>
          <div class="flex justify-end p-4 border-t-2 border-accent dark:border-dark-accent">
            <router-link :to="{ name: 'News', params: { id: article.Id } }" class="flex items-center space-x-2">
              <p class="m-0">Read More</p>
              <i
                class="fa fa-arrow-circle-right"
                aria-hidden="true"
                style="font-size: 1.5em; color: var(--accent)"
              ></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center p-4">
      <LoadingAnimation />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()
const trendingNews = ref([])
const visibleTrendingNews = ref([])
const page = ref(1)
const perPage = 10
const hasTrendingNews = computed(() => visibleTrendingNews.value.length > 0)
const isLoading = ref(false)

const fetchTrendingNews = async () => {
  try {
    const response = await fetch('https://api.sapientia.life/article/trending')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    if (data && Array.isArray(data.Value)) {
      trendingNews.value = data.Value
      visibleTrendingNews.value = trendingNews.value.slice(0, perPage * page.value)
    } else {
      console.error('Fetched data does not contain the expected array structure:', data)
    }
  } catch (error) {
    console.error('Error fetching trending news:', error)
    toast.error('Failed to fetch trending news.')
  }
}

const goToNewsView = (articleId) => {
  if (articleId) {
    router.push({ name: 'News', params: { id: articleId } })
  } else {
    console.error('Missing article ID:', articleId)
  }
}

onMounted(async () => {
  await nextTick()
  fetchTrendingNews()
})
</script>

<style scoped>
.news-container {
  max-height: calc(100vh - 100px); 
  overflow: auto;
}

.news-container::-webkit-scrollbar {
  display: none;
}

.news-container {
  scrollbar-width: none; 
}

.news-container {
  -ms-overflow-style: none;
}

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
