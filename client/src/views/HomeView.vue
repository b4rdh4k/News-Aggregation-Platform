<template>
  <div>
    <WeatherWidget :apiKey="yourApiKeyHere" />
  </div>
  <div>
    <TopNews />
  </div>
</template>

<script>
import WeatherWidget from '@/components/HomePage/WeatherAPI.vue'; 
import TopNews from '@/components/HomePage/TopNews.vue';

export default {
  name: 'HomeView',
  components: {
    WeatherWidget,
    TopNews,
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
