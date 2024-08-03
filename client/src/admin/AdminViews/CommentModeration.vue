<script setup>
import { ref, computed } from 'vue'

const reportedComments = ref([
  {
    id: 1,
    username: 'johndoe',
    commentText: 'This is an inappropriate comment.',
    reportReason: 'Inappropriate language',
    reportedBy: 'admin',
    reportedAt: '2024-07-01'
  },
  {
    id: 2,
    username: 'janesmith',
    commentText: 'This is spam.',
    reportReason: 'Spam',
    reportedBy: 'moderator',
    reportedAt: '2024-07-02'
  },
  {
    id: 3,
    username: 'sarahjohnson',
    commentText: 'Offensive content.',
    reportReason: 'Harassment',
    reportedBy: 'user123',
    reportedAt: '2024-07-03'
  }
  // Add more reported comments as needed
])

const currentPage = ref(1)
const commentsPerPage = 3

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * commentsPerPage
  const end = start + commentsPerPage
  return reportedComments.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(reportedComments.value.length / commentsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToComment = (commentId) => {
  console.log(`Navigating to comment with ID: ${commentId}`)
  // Implement navigation logic here, e.g., using a router
}

const notifyUser = (username) => {
  console.log(`Notifying user: ${username}`)
  // Implement notification logic here, e.g., using an API call
}
</script>

<template>
  <div class="reported-comments-page">
    <h2 class="text-2xl font-semibold mb-4">Reported Comments</h2>
    <div class="table-container">
      <table class="responsive-table min-w-full">
        <thead>
          <tr>
            <th class="sticky-column py-2 px-8 border">Comment</th>
            <th class="py-2 px-4 border">Username</th>
            <th class="py-2 px-4 border">Reason</th>
            <th class="py-2 px-6 border">Reported By</th>
            <th class="py-2 px-4 border">Reported At</th>
            <th class="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in paginatedComments" :key="comment.id">
            <td class="sticky-column py-2 px-4 border">{{ comment.commentText }}</td>
            <td class="py-2 px-4 border">{{ comment.username }}</td>
            <td class="py-2 px-4 border">{{ comment.reportReason }}</td>
            <td class="py-2 px-4 border">{{ comment.reportedBy }}</td>
            <td class="py-2 px-4 border">{{ comment.reportedAt }}</td>
            <td class="py-2 px-4 border">
              <button @click="goToComment(comment.id)" class="m-2 px-2 py-1 bg-blue-500 text-white rounded">Go to Comment</button>
              <button @click="notifyUser(comment.username)" class="m-2 px-2 py-1 bg-green-500 text-white rounded">Notify User</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination mt-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-l"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-r"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reported-comments-page {
    position: relative;
    min-height: 80vh; 
    display: flex;
    flex-direction: column;
}

.table-container {
  overflow-x: auto;
  scroll-behavior: auto;
  flex: 1; 
}

.responsive-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  
  th, td {
    padding: 12px;
    border: 1px solid var(--accent);
    text-align: left;
  }

  .sticky-column {
    position: sticky;
    left: 0;
    background: var(--secondary);
    z-index: 1;
  }

  th.sticky-column {
    z-index: 2;
  }
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding: 1em;

    button {
        background-color: var(--primary);
        color: var(--accent);
        border: 1px solid var(--accent);
        cursor: pointer;
    }
    button:hover {
        background-color: var(--accent);
        color: var(--primary);
    }
    button:disabled {
        background-color: var(--secondary);
        color: var(--primary);
        cursor: not-allowed;
    }

    span {
        background-color: var(--background);
        color: var(--accent);
    }
}
</style>
