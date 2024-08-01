<template>
  <div v-if="article">
    <h1 class="text-3xl font-bold">{{ article.webTitle }}</h1>
    <div v-html="article.fields.body" class="mt-4"></div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/store/guardian-newsStore'

const route = useRoute()
const newsStore = useNewsStore()
const article = ref(null)

onMounted(async () => {
  const apiUrl = route.params.id
  article.value = await newsStore.fetchArticleDetails(apiUrl)
})
</script>
