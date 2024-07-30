<template>
  <div>
    <!-- News Details -->
    <h1 class="text-2xl font-bold">{{ news.Title || 'Title not available' }}</h1>
    <p class="text-sm text-gray-600">
      Published on {{ formattedDate(news.PublishedAt) }} 
      • Author: {{ news.Author || 'Unknown' }}
      • Views: {{ news.Views || 0 }}
      • Likes: {{ news.likes || 0 }}
    </p>
    <img
      :src="news.ImageUrl"
      alt="News Image"
      class="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
      v-if="news.ImageUrl"
    />
    <p v-else class="text-base text-gray-800 mb-4">No image available</p>
    <p class="text-base text-gray-800 mb-4">{{ news.Content || 'No Content Available' }}</p>

    <!-- Description Section -->
    <div v-if="news.description" class="mt-4">
      <div v-html="news.description" class="text-gray-700"></div>
    </div>

    <!-- Comment Section -->
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

<script>
export default {
  name: 'NewsView',
  data() {
    return {
      newsId: this.$route.params.id,
      news: {},
      commentContent: '',
      comments: []
    }
  },
  methods: {
    async fetchNewsDetails(id) {
      try {
        const response = await fetch(`https://api.sapientia.life/article/${id}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log('Fetched news details:', data) // Log the fetched news details
        this.news = data.value.Value
      } catch (error) {
        console.error('Error fetching news details:', error)
      }

      // Simulated fetch for comments - replace this with actual API call
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

      this.comments = allComments.filter((comment) => comment.articleId === id)
    },
    formattedDate(date) {
      if (!date) return 'Unknown date'
      const parsedDate = new Date(date)
      return isNaN(parsedDate) ? 'Invalid Date' : parsedDate.toLocaleDateString()
    },
    async submitComment() {
      if (!this.commentContent.trim()) {
        alert('Comment content is required')
        return
      }

      const commentData = {
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Replace with actual user ID
        articleId: this.newsId,
        content: this.commentContent,
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
        this.comments.push(data)
        this.commentContent = ''
      } catch (error) {
        console.error('Error submitting comment:', error)
      }
    }
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        this.newsId = newId
        this.fetchNewsDetails(newId)
      },
      immediate: true
    }
  },
  created() {
    this.fetchNewsDetails(this.newsId)
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
