<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ShareNetwork } from 'vue-social-sharing'

const route = useRoute()

const newsId = ref(route.params.id)
const news = ref({})
const commentContent = ref('')
const comments = ref([])
const shareUrl = ref('')

async function fetchNewsDetails(id) {
  try {
    const response = await fetch(`https://api.sapientia.life/article/${id}`)
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

  const allComments = [
    {
      id: 1,
      userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      articleId: id,
      content: 'Great article!',
      createdAt: '2024-07-25T08:00:00Z'
    },
    {
      id: 2,
      userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      articleId: id,
      content: 'Very informative.',
      createdAt: '2024-07-25T09:00:00Z'
    }
  ]

  comments.value = allComments.filter((comment) => comment.articleId === id)
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

async function submitComment() {
  if (!commentContent.value.trim()) {
    alert('Comment content is required')
    return
  }

  const commentData = {
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    articleId: newsId.value,
    content: commentContent.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  try {
    const response = await fetch('https://test.erzen.tk/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    comments.value.push(data)
    commentContent.value = ''
  } catch (error) {
    console.error('Error submitting comment:', error)
  }
}

watch(
  () => route.params.id,
  (newId) => {
    newsId.value = newId
    fetchNewsDetails(newId)
  },
  { immediate: true }
)

onMounted(() => {
  fetchNewsDetails(newsId.value)
})
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">{{ news.Title || 'Title not available' }}</h1>
    <p class="text-sm text-gray-600">
      Published on {{ formattedDate(news.PublishedAt) }} • Author: {{ news.Author || 'Unknown' }} •
      Views: {{ news.Views || 0 }} • Likes: {{ news.likes || 0 }}
    </p>
    <img
      :src="news.ImageUrl"
      alt="News Image"
      class="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
      v-if="news.ImageUrl"
    />
    <p v-else class="text-base text-gray-800 mb-4">No image available</p>
    <p class="text-base text-gray-800 mb-4">{{ news.content || 'No Content Available' }}</p>

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

    <div v-if="news.description" class="mt-4">
      <div v-html="news.description" class="text-gray-700"></div>
    </div>

    <div class="mt-6">
      <textarea
        v-model="commentContent"
        placeholder="Add a comment..."
        class="w-full h-24 p-2 border rounded-md"
      />
      <button
        @click="submitComment"
        class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit Comment
      </button>
      <div v-if="comments.length" class="mt-4 space-y-2">
        <div v-for="comment in comments" :key="comment.id" class="p-4 border rounded-md shadow-sm">
          <p class="text-gray-800">{{ comment.content }}</p>
          <p class="text-xs text-gray-500">{{ new Date(comment.createdAt).toLocaleString() }}</p>
        </div>
      </div>
      <p v-else class="text-gray-500 mt-4">No comments yet.</p>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
