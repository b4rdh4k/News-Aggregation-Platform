<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const topStories = reactive([
  {
    id: 1,
    category: 'World',
    title: 'Ukraine Looms Over NATO Summit, and Biden Is Defiant on Running',
    time: '5 hours ago',
    authors: 'Julian E. Barnes, Ian Stewart',
    company: 'The New York Times'
  },
  {
    id: 2,
    category: 'Politics',
    title: 'Congressional Democrats',
    time: '1 hour ago',
    authors: 'Anders Hagstrom',
    company: 'The Daily Caller'
  },
  {
    id: 3,
    category: 'Business',
    title: 'The 2022 NFL Draft is coming to Las Vegas',
    time: '2 hours ago',
    authors: 'Author C',
    company: 'The Washington Post'
  },
  {
    id: 4,
    category: 'Technology',
    title: 'The 2022 NFL Draft is coming to Las Vegas',
    time: '2 hours ago',
    authors: 'Author D',
    company: 'The Wall Street Journal'
  }
])

const goToNewsView = (story) => {
  if (story && story.id) {
    router.push({ name: 'News', params: { id: story.id } })
  } else {
    console.error('Missing story ID')
  }
}
</script>

<template>
  <div
    v-for="story in topStories"
    :key="story.id"
    class="container mb-4 cursor-pointer"
    @click="goToNewsView(story)"
  >
    <div class="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
      <img
        src="@/assets/Biden.webp"
        alt="News Story Image"
        class="items-start w-auto h-auto rounded-lg sm:max-w-[350px] md:max-w-[550px] max-h[300px]"
      />
      <div class="flex flex-col justify-between sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 mt-2 md:mt-0 lg:mt-0 xl:mt-0">
        <div>
          <router-link :to="`/category/${story.category}`" class="mb-2" @click.stop>
            <button class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent px-2 rounded-xl">
              <p class="text-text dark:text-dark-text">{{ story.category }}</p>
            </button>
          </router-link>
          <h4 class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            {{ story.title }}
          </h4>
        </div>
        <div>
          <p class="text-text dark:text-dark-text">{{ story.time }} | {{ story.authors }}</p>
          <router-link :to="`/source/${story.company}`" class="mb-2" @click.stop>
            <p
              class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-primary dark:hover:text-dark-primary"
            >
              {{ story.company }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
