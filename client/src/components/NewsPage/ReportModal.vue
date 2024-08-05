<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  commentId: String 
})

const emit = defineEmits(['closeModal', 'submitReport'])

const reasons = [
  { id: 1, text: 'Spam' },
  { id: 2, text: 'Inappropriate' },
  { id: 3, text: 'Hate Speech' },
  { id: 4, text: 'Violence' },
  { id: 5, text: 'Harassment' },
  { id: 6, text: 'False Information' },
  { id: 7, text: 'Other' }
]

const selectedReason = ref(reasons[0].id)
const reportComment = ref('')
const toast = useToast()

function clearReport() {
  selectedReason.value = reasons[0].id
  reportComment.value = ''
}

const reportCommentForm = (commentId) => {
  fetch('https://89xx7tdx-5095.euw.devtunnels.ms/comment/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json-patch+json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      commentId: commentId,
      reportType: selectedReason.value
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      if (text) {
        try {
          const json = JSON.parse(text);
          console.log("Response JSON:", json);
        } catch (e) {
          console.error("Failed to parse JSON:", e);
        }
      }
      clearReport()
      emit('closeModal')
      toast.success('Report submitted successfully!')
    })
    .catch((error) => {
      console.error(error)
      toast.error('Failed to submit report. Please try again.')
    })
}

function submitReport() {
  if (!selectedReason.value || !reportComment.value.trim()) {
    alert('Please select a reason and provide a comment.')
    return
  }

  const commentId = props.commentId
  reportCommentForm(commentId)

  clearReport()
  emit('closeModal')
  toast.success('Report submitted successfully!')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-primary dark:bg-dark-primary bg-opacity-60 dark:bg-opacity-60"
  >
    <div class="rounded-lg shadow-lg w-full max-w-4xl bg-white dark:bg-dark-background p-6 relative">
      <button
        class="absolute top-4 right-4 rounded-md bg-dark-background dark:bg-background dark:text-dark-accent py-2 px-4 text-accent hover:text-secondary"
        @click="emit('closeModal')"
      >
        &times;
      </button>
      <h2 class="text-2xl font-semibold mb-4">Reporting Comment</h2>
      <div class="mb-4">
        <label for="reason" class="block font-semibold mb-2">Reason for Reporting</label>
        <select
          id="reason"
          v-model="selectedReason"
          class="w-full p-2 border text-text border-gray-300 rounded-md"
        >
          <option v-for="reason in reasons" :key="reason.id" :value="reason.id">{{ reason.text }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="comment" class="block font-semibold mb-2">Additional Comments</label>
        <textarea
          id="comment"
          v-model="reportComment"
          class="w-full p-2 border text-text border-gray-300 rounded-md"
          rows="4"
          placeholder="Add your issue here..."
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button
          @click="submitReport"
          class="mr-2 px-6 py-2 bg-accent dark:bg-dark-accent text-white rounded-md hover:bg-opacity-80 dark:hover:bg-opacity-80"
        >
          Submit
        </button>
        <button
          @click="clearReport"
          class="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-opacity-80"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
textarea {
  resize: none;
}
</style>
