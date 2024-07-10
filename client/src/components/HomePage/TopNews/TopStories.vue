<template>
      <div v-for="story in topStories" :key="story.id" class="mb-4">
        <img :src="story.image" alt="" class="object-cover mb-2">
        <h3 class="font-semibold">{{ story.title }}</h3>
        <p class="text-text dark:text-dark-text">{{ story.time }} • {{ story.authors }}</p>
      </div>
</template>

<script>
export default {
  data() {
    return {
      topStories: [
        {
          id: 1,
          image: 'https://placehold.co/300x200',
          title: 'Ukraine Looms Over NATO Summit, and Biden Is Defiant on Running',
          time: '5 hours ago',
          authors: 'Julian E. Barnes, Ian Stewart',
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/400x200',
          title: 'Congressional Democrats',
          time: '1 hour ago',
          authors: 'Anders Hagstrom',
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
