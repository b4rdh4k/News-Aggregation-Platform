<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const picksForYou = ref([
  {
    id: 1,
    source: 'New York Times',
    title: 'Dead Online Shooter Refunds DrDisrespect Skins In The Worst Way',
    time: '23 hours ago',
    author: 'Author A'
  },
  {
    id: 2,
    source: 'The Guardian',
    title: 'Netflix’s next live event is a Joe Rogan comedy special',
    time: '1 hour ago',
    author: 'Author B'
  },
  {
    id: 3,
    source: 'The Washington Post',
    title: 'The 2022 NFL Draft is coming to Las Vegas',
    time: '2 hours ago',
    author: 'Author C'
  },
  {
    id: 4,
    source: 'The Wall Street Journal',
    title: 'The 2022 NFL Draft is coming to Las Vegas',
    time: '2 hours ago',
    author: 'Author D'
  },
]);

const goToNewsView = (pick) => {
  router.push({ name: 'News', params: { id: pick.id } });
};
</script>

<template>
  <div class="items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-2">
    <div
      v-for="(pick, index) in picksForYou"
      :key="pick.id"
      class="mb-4 ml-0 sm:ml-0 md:ml-4 lg:ml-4 xl:ml-4 cursor-pointer mr-1 lg:max-w-[300px]"
      @click="goToNewsView(pick)"
    >
      <router-link :to="`/source/${pick.source}`" class="mb-2" @click.stop>
        <p class="text-accent dark:text-dark-accent italic font-serif">
          {{ pick.source }}
        </p>
      </router-link>
      <h5 class="font-semibold text-lg md:text-xl lg:text-2xl text-pretty">{{ pick.title }}</h5>
      <p class="text-text dark:text-dark-text">{{ pick.time }} | {{ pick.author }}</p>
      <hr v-if="index !== picksForYou.length - 1" class=" border-t border-primary dark:border-dark-primary">
    </div>
  </div>
</template>
