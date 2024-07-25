<template>
  <ArticleList :articles="topStories" @click="goToNewsView" />
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ArticleList from '@/components/ArticleList.vue' // Adjust path as necessary

const router = useRouter()

// Static data
const topStories = reactive([
  {
    id: 1,
    category: 'World',
    title: 'Ukraine Looms Over NATO Summit, and Biden Is Defiant on Running',
    time: '5 hours ago',
    company: 'The New York Times'
  },
  {
    id: 2,
    category: 'Politics',
    title: 'Congressional Democrats',
    time: '1 hour ago',
    company: 'The Daily Caller'
  },
  {
    id: 3,
    category: 'Business',
    title: 'The 2022 NFL Draft is coming to Las Vegas',
    time: '2 hours ago',
    company: 'The Washington Post'
  },
  {
    id: 4,
    category: 'Technology',
    title: 'The 2022 NFL Draft is coming to Las Vegas',
    time: '2 hours ago',
    company: 'The Wall Street Journal'
  }
])

// Function to fetch top stories
const fetchTopStories = async () => {
  try {
    const response = await fetch('https://test.erzen.tk/article/all')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    console.log('Fetched data:', data) // Log the entire fetched data
    console.log('Fetched data.value:', data.value) // Log the data.value to inspect its structure
    if (Array.isArray(data.value)) {
      console.log('Fetched data:', data.value) // Log the entire fetched data
    }

    // Assuming you need to inspect `data.value` to find the array of articles
    // Modify the following code based on the actual structure of data.value
    if (Array.isArray(data.value.articles)) {
      topStories.splice(0, topStories.length, ...data.value.articles)
    } else {
      console.error(
        'Fetched data.value does not contain the expected articles array or is not an array:',
        data.value
      )
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
  if (story && story.id) {
    router.push({ name: 'News', params: { id: story.id } })
  } else {
    console.error('Missing story ID')
  }
}
</script>
