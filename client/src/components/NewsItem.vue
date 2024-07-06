<template>
    <div class="news-item border-b border-gray-300 p-4">
      <h2 class="text-xl font-bold">{{ news.title }}</h2>
      <p>{{ news.content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewsItem',
    props: {
      news: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  