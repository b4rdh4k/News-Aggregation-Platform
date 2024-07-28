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
        src="https://lottie.host/05a31154-e571-4eb4-aa95-04040c6c1879/SnQnmEa0Jj.lottie"
      />
    </div>
    <h4 class="text-accent dark:text-dark-secondary">Payment Cancelled</h4>
    <h5 class="text-secondary dark:text-dark-accent">Your payment was not successful.</h5>
    <p class="p-2">If circumstances change, we'll welcome you with open arms</p>
    <div class="flex flex-col md:flex-row gap-3 mt-2 mb-2">
      <router-link to="/subscription">
        <button
          class="bg-accent dark:bg-dark-accent hover:bg-secondary dark:hover:bg-dark-secondary text-text dark:text-dark-text p-3 rounded-xl"
        >
          Try again
        </button>
      </router-link>
      <router-link to="/">
        <button
          class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text p-3 rounded-xl"
        >
          Back to Home
        </button>
      </router-link>
    </div>
  </div>
</template>

