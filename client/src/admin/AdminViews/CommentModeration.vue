<script setup>
import { ref, computed, onMounted } from 'vue'

import { useToast } from 'vue-toastification'

const reportedComments = ref([])
const currentPage = ref(1)
const commentsPerPage = 3
const totalPages = computed(() => Math.ceil(reportedComments.value.length / commentsPerPage))
const toast = useToast()

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * commentsPerPage
  const end = start + commentsPerPage
  return reportedComments.value.slice(start, end)
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

const deleteComment = (commentId) => {
  //spe di ku o
}

const fetchReportedComments = async () => {
  try {
    const url = 'https://api.sapientia.life/comment/getReported'

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Fetch error:', errorData)
      return toast.error('Failed to fetch reported comments')
    }

    const data = await response.json()
    console.log('Fetched data:', data)

    reportedComments.value = data.value.Value.map((report) => ({
      id: report.Id,
      commentText: 'Sample Comment Text', // duhet me ndrru
      username: 'Sample Username', // me ndrru
      reportReason: mapReportType(report.ReportType),
      reportedBy: report.UserId,
      reportedAt: new Date(report.CreatedAt).toLocaleDateString()
    }))
  } catch (error) {
    console.error('Error fetching reported comments:', error)
  }
}

const mapReportType = (reportType) => {
  const reasons = [
    { id: 1, text: 'Spam' },
    { id: 2, text: 'Inappropriate' },
    { id: 3, text: 'Hate Speech' },
    { id: 4, text: 'Violence' },
    { id: 5, text: 'Harassment' },
    { id: 6, text: 'False Information' },
    { id: 7, text: 'Other' }
  ]
  return reasons[reportType] || 'Unknown'
}

onMounted(() => {
  fetchReportedComments()
})
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
              <button
                @click="deleteComment(comment.id)"
                class="m-2 px-2 py-1 bg-blue-500 text-white rounded"
              >
                Delete Comment
              </button>
              <button @click="closeReport" class="m-2 px-2 py-1 bg-green-500 text-white rounded">
                Nothing
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination mt-4">
      <button @click="previousPage" :disabled="currentPage.value === 1" class="px-4 py-2 rounded-l">
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage.value }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage.value === totalPages.value"
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

  th,
  td {
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
