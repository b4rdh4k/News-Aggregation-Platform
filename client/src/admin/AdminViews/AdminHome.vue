<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>
<template>
  <div>
    <div class="welcome-section">
      <div>
        <h3 class="text-2xl font-semibold">Welcome back Emri</h3>
        <p>Here's what's happening with our platform today</p>
      </div>
      <div class="welcome-animation">
        <DotLottieVue
          autoplay
          loop
          src="https://lottie.host/3ee910b1-e9cb-4c8d-aaec-0200067256ef/FcxaWo9YEF.lottie"
        />
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
