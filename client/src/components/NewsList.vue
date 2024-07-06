<template>
    <div class="news-list">
      <NewsItem
        v-for="news in newsItems"
        :key="news.id"
        :news="news"
      />
    </div>
  </template>
  
  <script>
  import NewsItem from './NewsItem.vue';
  
  export default {
    name: 'NewsList',
    components: {
      NewsItem,
    },
    data() {
      return {
        newsItems: [
          { id: 1, title: 'News Item 1', content: 'Content for news item 1' },
          { id: 2, title: 'News Item 2', content: 'Content for news item 2' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  