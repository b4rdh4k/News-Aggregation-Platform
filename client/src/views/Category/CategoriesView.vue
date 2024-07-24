<script setup>
import { ref, computed, onMounted } from 'vue'

const categories = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/categories.json')
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    categories.value = data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    // ERROR PER USERIN!!!!
  }
})

const limitedCategories = computed(() => {
  return categories.value.map((category) => ({
    ...category,
    articles: category.articles.slice(0, 4)
  }))
})
</script>

<template>
  <div class="container mx-auto p-2">
    <div class="b-4 pb-2 mb-4 border-b-2 border-dashed border-secondary dark:border-dark-secondary">
      <h3
        class="font-bold text-accent dark:text-dark-accent mb-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
      >
        Explore the News Universe
      </h3>
      <p class="text-secondary dark:text-dark-secondary font-thin italic text-base lg:text-lg">
        Embark on a journey through diverse topics and stay updated.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <div
        v-for="(category, index) in limitedCategories"
        :key="index"
        class="bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20 p-4 rounded-lg shadow-md flex flex-col"
      >
        <h5
          class="text-accent dark:text-dark-accent font-bold mb-4 pb-2 border-b-[1px] border-primary dark:border-dark-primary"
        >
          {{ category.name }}
        </h5>
        <div class="flex flex-col lg:flex-row gap-4 flex-grow">
          <div
            class="w-full lg:w-1/2 border-secondary dark:border-dark-secondary border-b-2 pb-2 lg:border-b-0 lg:border-r-2 lg:pr-2"
          >
            <a :href="category.articles[0].link" class="block hover:underline">
              <div class="flex flex-col items-start">
                <img
                  :src="category.articles[0].image"
                  alt="Article image"
                  class="w-full h-48 object-cover rounded"
                />
                <div class="mt-2">
                  <h3 class="text-lg font-semibold truncate-multiline">
                    {{ category.articles[0].title }}
                  </h3>
                  <router-link
                    :to="`/source/${category.articles[0].source}`"
                    class="mb-2"
                    @click.stop
                  >
                    <p
                      class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-primary dark:hover:text-dark-primary"
                    >
                      {{ category.articles[0].source }}
                    </p>
                  </router-link>
                  <p
                    class="text-text dark:text-dark-text text-sm sm:text-base md:text-base lg:text-lg xl:text-lg"
                  >
                    {{ category.articles[0].time }}
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div class="w-full lg:w-1/2 flex flex-col justify-between">
            <ul>
              <li
                v-for="(article, idx) in category.articles.slice(1)"
                :key="idx"
                class="mb-2 pb-2 border-b border-secondary dark:border-dark-secondary last:border-0"
              >
                <a :href="article.link" class="block hover:underline">
                  <h3 class="text-lg font-semibold truncate-multiline">
                    {{ article.title }}
                  </h3>
                  <router-link :to="`/source/${article.source}`" class="mb-2" @click.stop>
                    <p
                      class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-primary dark:hover:text-dark-primary"
                    >
                      {{ article.source }}
                    </p>
                  </router-link>
                  <p class="text-text dark:text-dark-text text-sm">{{ article.time }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-end pt-2 mt-auto">
          <router-link :to="`/category/${category.name}`">
            <button
              class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent text-text dark:text-dark-text p-3 rounded-xl"
            >
              More articles
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
