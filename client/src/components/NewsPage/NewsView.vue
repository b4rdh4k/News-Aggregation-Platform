<template>
  <div>
    <!-- News Details -->
    <h1 class="text-2xl font-bold">{{ news.title }}</h1>
    <p class="text-sm text-gray-600">
      Published on {{ new Date(news.publishedAt).toLocaleDateString() }} 
      • Author: {{ news.author || 'Unknown' }}
      • Views: {{ news.views || 0 }}
      • Likes: {{ news.likes || 0 }}
    </p>
    <img
      :src="news.imageUrl"
      alt="News Image"
      class="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
    />
    <p class="text-base text-gray-800 mb-4">{{ news.content || 'No Content Available' }}</p>

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
      comments: [] // Store comments
    }
  },
  methods: {
    async fetchNewsDetails(id) {
      // Simulated API call - replace this with your actual API call
      const allNews = [
        // Simulated news data
        {
          id: '1f9245c6-8bac-4277-abd6-b2062483ca78',
          title: 'Tatum ‘will play’ for Team USA vs. South Sudan after Sunday benching, Kerr says - The New York Times',
          time: '2 hours ago',
          author: null,
          imageUrl: 'https://via.placeholder.com/500',
          content: 'No Content',
          description: '<a href="https://news.google.com/rss/articles/CBMiVWh0dHBzOi8vd3d3Lm55dGltZXMuY29tL2F0aGxldGljLzU2NjU0NTQvMjAyNC8wNy8yOS9qYXlzb24tdGF0dW0tb2x5bXBpY3MtYmFza2V0YmFsbC_SAQA?oc=5" target="_blank">Tatum ‘will play’ for Team USA vs. South Sudan after Sunday benching, Kerr says</a>&nbsp;&nbsp;<font color="#6f6f6f">The New York Times</font><strong><a href="https://news.google.com/stories/CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2pBd0p1SURCRURSSTRoaXBNZkN5Z0FQAQ?hl=en-US&gl=US&ceid=US:en&oc=5" target="_blank">View Full Coverage on Google News</a></strong>',
          id: '1f9245c6-8bac-4277-abd6-b2062483ca78',
          imageUrl: 'https://via.placeholder.com/500',
          publishedAt: '2024-07-29T20:35:27Z',
          views: 0,
          likes: 0,
        }
      ]

      this.news = allNews.find((newsItem) => newsItem.id === this.newsId)

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
        this.comments.push(data) // Add the new comment to the list
        this.commentContent = '' // Clear the comment input
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
/* Style adjustments */
textarea {
  resize: none;
}
</style>
