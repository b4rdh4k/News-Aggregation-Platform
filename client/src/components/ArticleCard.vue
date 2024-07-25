<template>
    <div
      class="container mb-4 cursor-pointer"
      @click="handleClick"
    >
      <div class="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <img
          src="@/assets/Biden.webp"
          rel="preload"
          alt="News Story Image"
          class="items-start w-auto h-auto hover:animate-pulse rounded-lg sm:max-w-[350px] md:max-w-[400px] lg:max-w-[400px] xl:max-w-[400px] max-h[300px]"
        />
        <div
          class="flex flex-col justify-between sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 mt-2 md:mt-0 lg:mt-0 xl:mt-0"
        >
          <div>
            <router-link :to="`/category/${article.category}`" @click.stop>
              <button
                class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent px-2 -ml-1 rounded-xl"
              >
                <p class="text-text dark:text-dark-text">{{ article.category }}</p>
              </button>
            </router-link>
            <h4 class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">
              {{ article.title }}
            </h4>
          </div>
          <div>
            <router-link :to="`/source/${article.company}`" class="mb-2" @click.stop>
              <p
                class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-primary dark:hover:text-dark-primary"
              >
                {{ article.company }}
              </p>
            </router-link>
            <p
              class="text-text dark:text-dark-text text-sm sm:text-base md:text-base lg:text-lg xl:text-lg"
            >
              {{ article.time }}
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
  
  <style scoped></style>
  