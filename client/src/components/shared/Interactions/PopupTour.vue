
<script setup>
import { ref, onMounted } from 'vue'
import { tour } from '@/tour/GuidedTour'

const show = ref(false)

const checkFirstTime = () => {
  const hasSeenPopup = localStorage.getItem('hasSeenPopup')
  if (!hasSeenPopup) {
    show.value = true
    localStorage.setItem('hasSeenPopup', 'true')
  }
}

const startTour = () => {
  tour.start()
  closePopup()
}

const closePopup = () => {
  show.value = false
}

onMounted(() => {
  checkFirstTime()
})
</script>

<template>
  <div v-if="show" class="popup-overlay z-50 bg-primary bg-opacity-30" @click="closePopup">
    <div class="popup-content" @click.stop>
      <h3>Welcome to Our Application</h3>
      <p>Would you like a quick tour of the main features?</p>
      <button @click="startTour">Start Tour</button>
      <button @click="closePopup">No, thanks</button>
    </div>
  </div>
</template>
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: var(--secondary);
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}

.popup-content button {
  margin: 10px;
 background-color: var(--accent);
  color: var(--background);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.popup-content button:hover {
  background-color: var(--secondary);
}
.popup-content button:last-of-type {
  background-color: var(--primary);
}
</style>
