<template>
  <div class="py-4">
    <!-- Display Comments Section -->
    <div v-if="comments.length" class="mt-4 space-y-2 max-h-96 overflow-y-auto">
      <div
        v-for="comment in comments"
        :key="comment.Id"
        class="flex p-4 border border-accent dark:border-dark-accent rounded-md shadow-sm items-start"
      >
      <img
          :src="comment.UserProfilePhoto || 'https://via.placeholder.com/50'"
          alt="User Profile"
          class="w-12 h-12 rounded-full mr-4"
        />
        <div class="flex-1">
          <p class="font-semibold">{{ comment.Username }}</p>
          <p class="text-text dark:text-dark-text">{{ comment.Content }}</p>
          <p class="text-xs text-gray-500">{{ new Date(comment.CreatedAt).toLocaleString() }}</p>
        </div>
        <button
          class="ml-4 text-red-600 hover:text-red-800"
          @click="openReportModal(comment.Id)"
        >
          <i class="fa fa-flag-o"></i>
        </button>
      </div>
    </div>
    <p v-else class="text-text dark:text-dark-text mt-4">No comments yet.</p>

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
        Add Comment
      </button>
      <button
        @click="clearComment"
        class="px-4 py-2 rounded-md bg-gray-300 dark:bg-dark-gray text-black dark:text-text hover:bg-opacity-80 dark:hover:bg-opacity-80"
      >
        Clear
      </button>
    </div>

    <!-- Report Modal -->
    <ReportModal
      v-if="showReportModal"
      @submit="handleReportSubmit"
      @close="showReportModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useCommentsStore } from '@/store/comments'
import ReportModal from '@/components/NewsPage/ReportModal.vue'
import { useToast } from 'vue-toastification'

const route = useRoute()
const { fetchUser, user } = useUserStore()
const commentsStore = useCommentsStore()
const toast = useToast()
console.log('useriiiiiiiiiiiiii',user)

const newsId = ref(route.params.id)
const commentContent = ref('')
const showReportModal = ref(false)
const selectedCommentId = ref(null)
const comments = ref([])

watch(() => route.params.id, (newId) => {
  newsId.value = newId
  fetchAndSetComments(newsId.value)
}, { immediate: true })

onMounted(() => {
  fetchAndSetComments(newsId.value)
})

async function fetchAndSetComments(id) {
  try {
    const fetchedComments = await commentsStore.loadComments(id);
    console.log("Fetched comments:", fetchedComments);
    if (Array.isArray(fetchedComments.Value || fetchedComments.value)) {
      comments.value = fetchedComments.Value || fetchedComments.value;
    } else {
      comments.value = [];
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    comments.value = [];
  }
}

function clearComment() {
  commentContent.value = ''
}

async function submitComment() {
  if (!commentContent.value.trim()) {
    toast.error('Comment content is required');
    return;
  }

  if (!user.id) {
    console.error('User ID is not available.');
    toast.error('User ID is required to submit a comment');
    return;
  }

  try {
    const commentData = {
      userId: user.id,
      articleId: newsId.value,
      content: commentContent.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await commentsStore.addComment(commentData);
    toast.success('Comment added successfully, it will be updated soon!');
    commentContent.value = '';

  } catch (error) {
    console.error('Failed to add comment:', error);
    toast.error('Failed to add comment.');
  }
}

function openReportModal(commentId) {
  selectedCommentId.value = commentId
  showReportModal.value = true
}

function handleReportSubmit(data) {
  console.log('Report submitted:', { ...data, commentId: selectedCommentId.value })
  showReportModal.value = false
}

function handleKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    submitComment()
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>