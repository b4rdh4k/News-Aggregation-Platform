<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ShareNetwork } from 'vue-social-sharing'
import { useUserStore } from '@/store/user'
import CommentSection from '@/components/NewsPage/CommentSection.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const { fetchUser, user } = useUserStore()
const toast = useToast()

const newsId = ref(route.params.id)
const news = ref({})
const shareUrl = ref('')

watch(() => route.params.id, (newId) => {
  newsId.value = newId
  fetchNewsDetails(newsId.value)
}, { immediate: true })

async function fetchNewsDetails(id) {
  try {
    const response = await fetch(`https://89xx7tdx-5095.euw.devtunnels.ms/article/${id}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    news.value = data.value.Value || {}
    shareUrl.value = window.location.href
    postViewData(id)
  } catch (error) {
    console.error('Error fetching news details:', error)
  }
}

async function postViewData(id) {
  try {
    const response = await fetch(`https://89xx7tdx-5095.euw.devtunnels.ms/article/view/${id}`, {
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

function goBack() {
  window.history.back()
}

function toggleBookmark() {
  // Implement the logic to add/remove the bookmark here.
  toast.success('Bookmark toggled!')
}

onMounted(() => {
  fetchUser()
  fetchNewsDetails(newsId.value)
})
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-3xl font-bold">{{ news.Title || 'Oopsie! The title couldnt be fetched correctly.' }}</h1>
      <button @click="toggleBookmark" class="text-xl text-accent dark:text-dark-accent">
        <i class="fa fa-bookmark" aria-hidden="true"></i>
      </button>
    </div>

    <p class="text-sm my-2 text-text dark:text-dark-text">
      Published on {{ formattedDate(news.PublishedAt) }} • Author: {{ news.Author || 'Filan Fisteku' }}
    </p>

    <!-- News Image -->
    <img
      :src="news.ImageUrl || require('@/assets/media/placeholderImage.png')"
      alt="News Image"
      class="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
    />
    
    <p v-if="news.content" class="text-base text-text dark:text-dark-text mb-4 text-justify">
      {{ news.content || 'Apologies, we could not fetch the content of this article. We hope you will find another article that satisfies your needs ' }} 
    </p>

    <div v-if="news.description" class="mt-4">
      <div v-html="news.description" class="text-text dark:text-dark-text"></div>
    </div>

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

    <CommentSection />

    <div class="mt-4">
      <button @click="goBack" class="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary">
        Go Back
      </button>
    </div>
  </div>
</template>

