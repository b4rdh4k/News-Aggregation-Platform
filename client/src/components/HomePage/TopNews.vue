<script setup>
import TopStories from "@/components/HomePage/TopNews/TopStories.vue";
import PicksForYou from "@/components/HomePage/TopNews/PicksForYou.vue";
</script>

<template>
  <div
    class="container mx-auto flex flex-col lg:flex-row xl:flex-row space-y-4 lg:space-y-0 xl:space-y-0 lg:space-x-4 xl:space-x-4 px-4"
  >
    <div class="w-full lg:w-3/4">
      <h2
        class="text-3xl text-accent dark:text-dark-accent font-bold mb-4 pb-2 border-b-[1px] border-accent dark:border-dark-accent"
      >
        Top stories
      </h2>
      <TopStories />
    </div>
    <div class="w-auto lg:w-1/4">
      <h2
        class="text-3xl text-accent dark:text-dark-accent font-bold mb-4 lg:ml-4 xl:ml-4"
      >
        Picks for you
      </h2>
      <PicksForYou />
    </div>
  </div>
</template>

<style scoped></style>
