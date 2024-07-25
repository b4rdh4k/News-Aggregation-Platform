<template>
  <div>
    <!-- News Details -->
    <h1 class="text-2xl font-bold">{{ news.title }}</h1>
    <p class="text-sm text-gray-600">{{ news.time }} • {{ news.authors }}</p>
    <img
      :src="news.image"
      alt="News Image"
      class="w-full h-48 object-cover mb-4 rounded-lg shadow-md"
    />
    <p class="text-base text-gray-800">{{ news.content }}</p>

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
        {
          id: 1,
          title: 'Ukraine Looms Over NATO Summit, and Biden Is Defiant on Running',
          time: '5 hours ago',
          authors: 'Julian E. Barnes, Ian Stewart',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the Ukraine NATO summit...'
        },
        {
          id: 2,
          title: 'Congressional Democrats',
          time: '1 hour ago',
          authors: 'Anders Hagstrom',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about Congressional Democrats...'
        },
        {
          id: 3,
          title: 'The 2022 NFL Draft is coming to Las Vegas',
          time: '2 hours ago',
          authors: 'Author C',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the 2022 NFL Draft...'
        },
        {
          id: 4,
          title: 'The 2022 NFL Draft is coming to Las Vegas',
          time: '2 hours ago',
          authors: 'Author D',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the 2022 NFL Draft...'
        },
        {
          id: 5,
          title: 'Dead Online Shooter Refunds DrDisrespect Skins In The Worst Way',
          time: '23 hours ago',
          authors: 'Author A',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the Dead Online Shooter...'
        },
        {
          id: 6,
          title: 'Netflix’s next live event is a Joe Rogan comedy special',
          time: '1 hour ago',
          authors: 'Author B',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the Netflix live event...'
        },
        {
          id: 7,
          title: 'The 2022 NFL Draft is coming to Las Vegas',
          time: '2 hours ago',
          authors: 'Author C',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the 2022 NFL Draft...'
        },
        {
          id: 8,
          title: 'Thanks, Obama: USA Basketball survives rust, roster drama in exhibition win',
          time: '2 minutes ago',
          authors: 'Ben Golliver',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about the USA Basketball exhibition win...'
        },
        {
          id: 9,
          title: 'Former NFL defensive coordinator Monte Kiffin has died',
          time: '1 hour ago',
          authors: 'Charean Williams',
          image: 'https://via.placeholder.com/400x200',
          content: 'Detailed content about Monte Kiffin...'
        }
      ]

      this.news = allNews.find((newsItem) => newsItem.id === parseInt(id))

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
