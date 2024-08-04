<script setup>
import { ref, defineEmits } from 'vue'
import { useToast } from 'vue-toastification' // Importing toast functionality

const emit = defineEmits(['closeModal', 'submitReport'])

const reasons = ['Spam', 'Offensive Language', 'Harassment', 'Other']
const selectedReason = ref(reasons[0])
const reportComment = ref('')
const toast = useToast() // Use toast functionality

function clearReport() {
  selectedReason.value = reasons[0]
  reportComment.value = ''
}

function submitReport() {
  if (!selectedReason.value || !reportComment.value.trim()) {
    alert('Please select a reason and provide a comment.')
    return
  }

  // Emit the report data to the parent component
  emit('submitReport', {
    reason: selectedReason.value,
    comment: reportComment.value,
  })
  
  // Clear the form and show success toast
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
        @click="$emit('closeModal')"
      >
        &times;
      </button>
      <h2 class="text-2xl font-semibold mb-4">Report Comment</h2>
      <div class="mb-4">
        <label for="reason" class="block font-semibold mb-2">Reason for Report</label>
        <select
          id="reason"
          v-model="selectedReason"
          class="w-full p-2 border text-text border-gray-300 rounded-md"
        >
          <option v-for="reason in reasons" :key="reason" :value="reason">{{ reason }}</option>
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
