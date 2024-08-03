<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
</script>

<template>
  <div class="min-h-screen px-2 flex flex-col items-center text-center">
    <div>
      <DotLottieVue
        style="width: 350px; height: 300px"
        autoplay
        loop
        src="https://lottie.host/2ad01616-dd5a-412c-b1c4-43fa03841793/8dnrOmAzRR.lottie"
      />
    </div>
    <h4 class="text-accent dark:text-dark-secondary">Congratulations!</h4>
    <h5 class="text-secondary dark:text-dark-accent">Your payment was successful!</h5>
    <p class="mt-2 p-2">You're now officially the coolest Sapientian ever!</p>
    <router-link to="/">
      <button
        class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text p-3 rounded-xl mt-4"
      >
        Back to Home
      </button>
    </router-link>
  </div>
</template>