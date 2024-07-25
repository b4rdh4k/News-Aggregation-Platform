<script setup>
import WeatherWidget from '@/components/HomePage/YourBriefing.vue'
import TopStories from '@/components/HomePage/TopNews/TopStories.vue'
import PicksForYou from '@/components/HomePage/TopNews/PicksForYou.vue'
import YourTopics from '@/components/HomePage/YourTopics/YourTopics.vue'
import SubscriptionCta from '@/components/HomePage/SubscriptionCta.vue'
</script>

<template>
  <div class="container mx-auto">
    <WeatherWidget />
  </div>
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
      <h2 class="text-3xl text-accent dark:text-dark-accent font-bold mb-4 lg:ml-4 xl:ml-4">
        Picks for you
      </h2>
      <PicksForYou />
    </div>
  </div>
  <div class="container mx-auto">
    <YourTopics />
  </div>
  <div
    class="w-full py-4 bg-gradient-to-tr from-accent via-primary to-accent dark:from-dark-accent dark:via-dark-primary dark:to-dark-accent min-h-dvh flex flex-col justify-center items-center"
  >
    <div class="text-center">
      <h2 class="text-background dark:text-dark-background font-bold">Curiosity killed the cat</h2>
      <h4 class="text-accent dark:text-dark-accent max-w-[800px] font-thin italic mx-auto lg:mx-0">
        However, the human mind thrives on information.
      </h4>
    </div>
    <div
      class="container mt-4 pt-4 border-t-2 border-dotted border-accent dark:border-dark-accent mx-auto w-full flex flex-col items-center lg:flex-row xl:flex-row"
    >
      <div class="w-full lg:w-1/2 lg:justify-end hidden lg:flex">
        <div class="animation">
          <SubscriptionCta />
        </div>
      </div>
      <div
        class="w-full lg:w-1/2 px-4 lg:pr-20 flex flex-col items-center justify-center lg:items-start"
      >
        <p class="text-justify text-lg mb-2 text-text dark:text-dark-text lg:text-left">
          We offer many ways to find news, but if your curiosity goes hand-in-hand with the need for
          efficiency, we have something for you.
        </p>
        <p class="text-justify text-lg text-text dark:text-dark-text lg:text-left">
          Join our premium subscription and decide what you want to read, when you want to read it.
          For just $9.99 a month, you can have access to a personalized feed, cultivated just for
          you.
        </p>
        <button
          class="bg-accent dark:bg-dark-accent hover:bg-secondary dark:hover:bg-dark-secondary text-text dark:text-dark-text text-lg p-6 px-8 rounded-md mt-4"
        >
          LEARN MORE
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
