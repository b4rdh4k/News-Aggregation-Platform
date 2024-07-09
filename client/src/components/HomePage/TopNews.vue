<template>
  <div class="flex space-x-4">
    <div class="w-2/3">
      <h2 class="text-xl font-bold mb-4">Top stories</h2>
      <TopStories />
    </div>
    <div class="w-1/3">
      <h2 class="text-xl font-bold mb-4">Picks for you</h2>
      <PicksForYou />
    </div>
  </div>
</template>

<script>
import  TopStories  from '@/components/HomePage/TopNews/TopStories.vue'
import  PicksForYou  from '@/components/HomePage/TopNews/PicksForYou.vue'

export default {
  components: {
    TopStories,
    PicksForYou
  }
}
</script>

<style scoped></style>
