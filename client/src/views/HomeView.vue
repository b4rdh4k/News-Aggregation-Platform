<script setup>
  import WeatherWidget from '@/components/HomePage/WeatherAPI.vue'; 
  import TopNews from '@/components/HomePage/TopNews.vue';
  import YourTopics from '@/components/HomePage/YourTopics/YourTopics.vue';
</script>

<template>
  <div>
    <WeatherWidget />
  </div>
  <div>
    <TopNews />
  </div>
  <div>
    <YourTopics />
  </div>
</template>



<style scoped>
</style>
