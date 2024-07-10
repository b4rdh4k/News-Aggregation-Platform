<script setup>
import  TopStories  from '@/components/HomePage/TopNews/TopStories.vue'
import  PicksForYou  from '@/components/HomePage/TopNews/PicksForYou.vue'
</script>

<template>
  <div class="flex flex-col w-full justify-center md:flex-row lg:flex-row xl:flex-row space-x-4 mx-4">
    <div class="w-2/3">
      <h2 class="text-xl font-bold mb-4">Top stories</h2>
      <TopStories />
    </div>
    <div class="w-1/3">
      <h2 class="text-xl font-bold mb-4 ml-4">Picks for you</h2>
      <PicksForYou />
    </div>
  </div>
</template>



<style scoped></style>
