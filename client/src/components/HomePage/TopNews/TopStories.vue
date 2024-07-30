<template>
  <ArticleList :articles="topStories" @click="goToNewsView" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ArticleList from '@/components/ArticleList.vue' // Adjust path as necessary

const router = useRouter()

// Reactive data for top stories
const topStories = reactive([])

// Function to fetch top stories
const fetchTopStories = async () => {
  try {
    const response = await fetch('https://api.sapientia.life/article/all')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    // Log the entire fetched data to inspect its structure
    console.log('Fetched data:', data.Value.Articles)

    // Update topStories based on the structure of data
    if (data.Value && Array.isArray(data.Value.Articles)) {
      topStories.splice(0, topStories.length, ...data.Value.Articles)
    } else {
      console.error('Fetched data does not contain the expected array structure:', data)
    }
  } catch (error) {
    console.error('Error fetching top stories:', error)
  }
}

// Fetch data when component mounts
onMounted(() => {
  fetchTopStories()
})

// Function to navigate to news view
const goToNewsView = (story) => {
  if (story && story.Id) {
    console.log('Navigating to story with ID:', story.Id)
    router.push({ name: 'News', params: { id: story.Id } })
  } else {
    console.error('Missing story ID:', story)
  }
}
</script>
