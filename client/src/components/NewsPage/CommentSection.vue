<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCommentsStore } from '@/store/comments'
import { useUserStore } from '@/store/user'
import ReportModal from '@/components/NewsPage/ReportModal.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const route = useRoute()
const { userId, fetchUser } = useUserStore()
const commentsStore = useCommentsStore()

const newsId = ref(route.params.id)
const news = ref({})
const commentContent = ref('')
const shareUrl = ref('')
const showReportModal = ref(false)
const selectedCommentId = ref(null)

// Dummy comments data
const dummyComments = [
  {
    id: 1,
    userId: 1,
    username: 'JohnDoe',
    userProfilePhoto: 'https://via.placeholder.com/50',
    content: 'Great article! Very informative.',
    createdAt: '2024-08-03T10:30:00Z'
  },
  {
    id: 2,
    userId: 2,
    username: 'JohnDoe',
    userProfilePhoto: 'https://via.placeholder.com/50',
    content: 'Great article! Very informative.',
    createdAt: '2024-08-03T10:30:00Z'
  },
  {
    id: 3,
    userId: 3,
    username: 'JohnDoe',
    userProfilePhoto: 'https://via.placeholder.com/50',
    content: 'Great article! Very informative.',
    createdAt: '2024-08-03T10:30:00Z'
  },
  {
    id: 4,
    userId: 4,
    username: 'JohnDoe',
    userProfilePhoto: 'https://via.placeholder.com/50',
    content: 'Great article! Very informative.',
    createdAt: '2024-08-03T10:30:00Z'
  }
  // ... (rest of dummy comments)
]

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

function clearComment() {
  commentContent.value = ''
}

async function submitComment() {
  if (!commentContent.value.trim()) {
    toast.error('Comment content is required')
    return
  }

  if (!userId.value) {
    toast.error('User ID is required to submit a comment')
    return
  }

  try {
    const commentData = {
      id: dummyComments.length + 1,
      userId: userId.value,
      username: 'CurrentUser', // Replace with actual user's username
      userProfilePhoto: 'https://via.placeholder.com/50', // Replace with actual user's profile photo URL
      content: commentContent.value,
      createdAt: new Date().toISOString(),
    }

    // Simulating adding a comment to the store
    dummyComments.push(commentData)
    toast.success('Comment added successfully!')
    commentContent.value = ''
  } catch (error) {
    toast.error('Failed to add comment.')
  }
}

function openReportModal(commentId) {
  selectedCommentId.value = commentId
  showReportModal.value = true
}

function handleReportSubmit(data) {
  console.log('Report submitted:', { ...data, commentId: selectedCommentId.value })
  // Handle report submission (e.g., send to server)
  showReportModal.value = false
}

function handleKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    submitComment()
  }
}

watch(
  () => route.params.id,
  (newId) => {
    newsId.value = newId
    fetchNewsDetails(newId)
    // Load dummy comments
    commentsStore.comments = dummyComments
  },
  { immediate: true }
)

onMounted(() => {
  fetchUser()
  fetchNewsDetails(newsId.value)
  // Load dummy comments
  commentsStore.comments = dummyComments
})
</script>

<template>
  <div class="py-4">
    <div class="mt-6">
      <!-- Display Comments Section -->
      <div v-if="dummyComments.length" class="mt-4 space-y-2 max-h-96 overflow-y-auto">
        <div
          v-for="comment in dummyComments"
          :key="comment.id"
          class="flex p-4 border border-accent dark:border-dark-accent rounded-md shadow-sm items-start"
        >
          <img
            :src="comment.userProfilePhoto"
            alt="User Profile"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div class="flex-1">
            <p class="font-semibold">{{ comment.username }}</p>
            <p class="text-text dark:text-dark-text">{{ comment.content }}</p>
            <p class="text-xs text-gray-500">{{ new Date(comment.createdAt).toLocaleString() }}</p>
          </div>
          <button
            class="ml-4 text-red-600 hover:text-red-800"
            @click="openReportModal(comment.id)"
          >
            <i class="fa fa-flag-o"></i>
          </button>
        </div>
      </div>
      <p v-else class="text-text dark:text-dark-text mt-4">No comments yet.</p>
    </div>
    <!-- Add Comment Section -->
    <div class="flex items-center mb-4 mt-4">
      <img
        src="https://via.placeholder.com/50"
        alt="User Profile"
        class="w-12 h-12 rounded-full"
      />
      <textarea
        v-model="commentContent"
        placeholder="Add a comment..."
        class="flex-1 ml-4 p-2 border border-accent dark:border-dark-accent rounded-md text-text dark:text-dark-text outline-none"
        rows="2"
        @keydown="handleKeydown"
      />
    </div>
    <div class="flex justify-end">
      <button
        @click="submitComment"
        class="mr-2 px-6 py-2 bg-accent dark:bg-dark-accent text-text dark:text-dark-text rounded-md hover:bg-opacity-80 dark:hover:bg-opacity-80"
      >
        Save
      </button>
      <button
        @click="clearComment"
        class="px-4 py-2 rounded-md bg-gray-300 dark:bg-dark-gray text-black dark:text-text hover:bg-opacity-80 dark:hover:bg-opacity-80"
      >
        Clear
      </button>
    </div>
  </div>
  <!-- Report Modal -->
  <ReportModal
    v-if="showReportModal"
    @closeModal="showReportModal = false"
    @submitReport="handleReportSubmit"
  />
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
