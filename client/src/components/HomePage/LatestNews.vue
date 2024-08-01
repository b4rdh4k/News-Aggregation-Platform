<script setup>
import { onMounted, nextTick } from 'vue'
import LoadingAnimation from '@/components/shared/Interactions/LoadingAnimation.vue'
import NewsCard from '@/components/shared/NewsCard.vue'
import { useNewsStore } from '@/store/newsStore.js'

const newsStore = useNewsStore()

onMounted(async () => {
  await nextTick()
  newsStore.fetchAllStories()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <router-link to="articles">
      <h2 class="text-3xl text-accent dark:text-dark-accent font-bold mb-4 pb-2 border-b-[1px] border-accent dark:border-dark-accent hover:underline">
        Latest News  <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
      </h2>
    </router-link>  

    <div v-if="newsStore.hasNews">
      <NewsCard :articles="newsStore.visibleNews" />
    </div>

    <div v-else class="flex justify-center p-4">
      <LoadingAnimation />
    </div>
  </div>
</template>
