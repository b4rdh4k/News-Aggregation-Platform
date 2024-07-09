<template>
  <div>
    <WeatherWidget :apiKey="yourApiKeyHere" />
  </div>
  <div>
    <h1 class="text-2xl font-bold mb-4">Welcome to the News Aggregation Platform</h1>
    <NewsList />
  </div>
</template>

<script>
import WeatherWidget from '@/components/HomePage/WeatherAPI.vue'; 
import NewsList from '@/components/NewsList.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherWidget,
    NewsList,
  },
  data() {
    return {
      yourApiKeyHere: '3220b3cdee7947d4b2a00531240907'
    };
  },
};
</script>

<style scoped>
</style>
