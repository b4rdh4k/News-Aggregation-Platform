<template>
  <div class="article-card container mb-4 cursor-pointer" @click="handleClick">
    <div class="flex flex-col sm:flex-row">
      <img
        :src="article.imageUrl"
        alt="News Story Image"
        class="article-image w-full sm:w-1/3 h-auto rounded-lg shadow-md"
      />
      <div class="article-content flex flex-col justify-between mt-2 sm:mt-0 sm:ml-4">
        <div>
          <router-link :to="`/category/${article.category}`" @click.stop>
            <button class="category-btn px-2 py-1 rounded-xl">
              <p class="text-text dark:text-dark-text">{{ article.category }}</p>
            </button>
          </router-link>
          <h4 class="article-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mt-2 sm:mt-0">
            {{ article.title }}
          </h4>
        </div>
        <div>
          <router-link :to="`/source/${article.company}`" class="mb-2" @click.stop>
            <p class="article-source text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-primary dark:hover:text-dark-primary">
              {{ article.company }}
            </p>
          </router-link>
          <p class="article-time text-text dark:text-dark-text text-sm sm:text-base">
            {{ new Date(article.publishedAt).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.article)
}
</script>

<style scoped>
.article-card {
  transition: transform 0.2s ease-in-out;
}
.article-card:hover {
  transform: translateY(-5px);
}
.article-image {
  object-fit: cover;
}
.category-btn {
  background-color: var(--primary-color);
  color: var(--text-color);
  transition: background-color 0.3s ease;
}
.category-btn:hover {
  background-color: var(--accent-color);
}
.article-title {
  font-weight: bold;
}
.article-source {
  transition: color 0.3s ease;
}
.article-source:hover {
  color: var(--primary-color);
}
.article-time {
  color: var(--text-color-secondary);
}
</style>
