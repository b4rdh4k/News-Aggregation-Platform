<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ShareNetwork } from 'vue-social-sharing'
import { useUserStore } from '@/store/user'
import CommentSection from '@/components/NewsPage/CommentSection.vue'

const route = useRoute()
const { fetchUser } = useUserStore()

const newsId = ref(route.params.id)
const news = ref({})
const shareUrl = ref('')
const dummyComments = ref([])

watch(() => route.params.id, (newId) => {
  newsId.value = newId
  fetchNewsDetails(newsId.value)
}, { immediate: true })

async function fetchNewsDetails(id) {
  try {
    const response = await fetch(`https://api.sapientia.life/article/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    console.log('Fetched news data:', data) // Log data to verify
    news.value = data.value.Value || {}
    shareUrl.value = window.location.href
    postViewData(id)
  } catch (error) {
    console.error('Error fetching news details:', error)
  }
}


async function postViewData(id) {
  try {
    const response = await fetch(`https://api.sapientia.life/article/view/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    console.log('View data posted successfully.')
  } catch (error) {
    console.error('Error posting view data:', error)
  }
}

function formattedDate(date) {
  if (!date) return 'Unknown date'
  const parsedDate = new Date(date)
  return isNaN(parsedDate) ? 'Invalid Date' : parsedDate.toLocaleDateString()
}

onMounted(() => {
  fetchUser()
  fetchNewsDetails(newsId.value)
})
</script>

<template>
  <div>
    <!-- News Title -->
    <h1 class="text-3xl font-bold">{{ news.Title || 'Title not available' }}</h1>

    <!-- Meta Information -->
    <p class="text-sm my-2 text-text dark:text-dark-text">
      Published on {{ formattedDate(news.PublishedAt) }} • Author: {{ news.Author || 'Filan Fisteku' }}
    </p>

    <!-- News Image -->
    <img
      :src="news.ImageUrl"
      alt="News Image"
      class="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
      v-if="news.ImageUrl"
    />
    <p v-else class="text-base text-text dark:text-dark-text mb-4">No image available</p>
    
    <!-- Main News Content -->
    <p v-if="news.content" class="text-base text-text dark:text-dark-text mb-4 text-justify">
      {{ news.content || 'Content not available' }} 
    </p>

    <!-- Additional Description -->
    <div v-if="news.description" class="mt-4">
      <div v-html="news.description" class="text-text dark:text-dark-text"></div>
    </div>

    <!-- Social Sharing Buttons -->
    <div class="p-2 mt-2">
      <ShareNetwork
        network="telegram"
        :url="shareUrl"
        title="Check out this article I read in Sapientia!"
        description="Interesting and very easy to read"
      >
        <button class="px-4 py-2 m-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <i class="fa fa-telegram" aria-hidden="true"></i> Share on Telegram
        </button>
      </ShareNetwork>
      <ShareNetwork
        network="twitter"
        :url="shareUrl"
        title="Check out this article I read in Sapientia!"
        description="Interesting and very easy to read"
        twitter-user="sapientia"
        hashtags="sapientia,newsaggregation"
      >
        <button class="px-4 py-2 m-1 bg-[#229ED9] text-white rounded-md hover:bg-blue-500">
          <i class="fa fa-twitter" aria-hidden="true"></i> Share on Twitter
        </button>
      </ShareNetwork>
      <ShareNetwork
        network="whatsapp"
        :url="shareUrl"
        title="Check out this article I read in Sapientia!"
        description="Interesting and very easy to read"
      >
        <button class="px-4 py-2 m-1 bg-green-500 text-white rounded-md hover:bg-green-600">
          <i class="fa fa-whatsapp" aria-hidden="true"></i> Share on WhatsApp
        </button>
      </ShareNetwork>
    </div>

    <!-- Comment Section -->
    <CommentSection :comments="dummyComments" />
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
