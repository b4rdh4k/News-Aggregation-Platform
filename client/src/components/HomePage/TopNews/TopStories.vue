<template>
      <div v-for="story in topStories" :key="story.id" class="mb-4" @click="goToNewsView(story)">
        <img :src="story.image" alt="" class="w-full h-48 object-cover mb-2">
        <h3 class="font-semibold">{{ story.title }}</h3>
        <p class="text-gray-500">{{ story.time }} • {{ story.authors }}</p>
      </div>
</template>

<script>
export default {
  data() {
    return {
      topStories: [
        {
          id: 1,
          image: 'https://via.placeholder.com/400x200',
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
  methods: {
    goToNewsView(story) {
      console.log(story); // Debugging line
      if (story && story.id) {
        this.$router.push({ name: 'News', params: { id: story.id } });
      } else {
        console.error('Missing story ID'); 
      }   
    },
  },
};
</script>

<style scoped>
</style>
