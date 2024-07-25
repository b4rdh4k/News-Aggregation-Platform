<template>
  <div>
    <ArticleCard
      v-for="article in articles"
      :key="article.id"
      :article="article"
      @click="emitClick(article)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ArticleCard from './ArticleCard.vue' // Adjust path as necessary

const props = defineProps({
  articles: {
    type: Array,
    default: () => [] // Default to an empty array if no articles are provided
  }
})

const emit = defineEmits(['click'])

const emitClick = (article) => {
  emit('click', article)
}
</script>
