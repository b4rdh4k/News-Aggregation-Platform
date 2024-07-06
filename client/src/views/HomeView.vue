<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Welcome to the News Aggregation Platform</h1>
    <NewsList />
  </div>
</template>

<script>
import NewsList from '../components/NewsList.vue';

export default {
  name: 'HomeView',
  components: {
    NewsList,
  },
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
