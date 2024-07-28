<script setup>
import { ref, onMounted } from 'vue'
import lottie from 'lottie-web'
import animationData from '@/assets/media/AdminAnimation.json'
const lottieContainer = ref(null)
onMounted(() => {
  lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData
  })
})
</script>
<template>
  <div>
    <div
      class="welcome-section flex items-center justify-between "
    >
      <div>
        <h3 class="text-2xl font-semibold">Welcome back Emri</h3>
        <p>Here's what's happening with our platform today</p>
      </div>
      <div class="welcome-animation">
        <div ref="lottieContainer" class="h-full"></div>
      </div>
    </div>
    <div class="card-grid">
      <div class="card">Reports to be processed</div>
      <div class="card">New subscriptions</div>
      <div class="card">Trending news</div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/admin/styles/main.scss';
</style>
