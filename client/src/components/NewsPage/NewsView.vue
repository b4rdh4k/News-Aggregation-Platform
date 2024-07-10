<template>
    <div>
      <h1 class="text-2xl font-bold">{{ news.title }}</h1>
      <p>{{ news.time }} • {{ news.authors }}</p>
      <img :src="news.image" alt="" class="w-full h-48 object-cover mb-2">
      <p>{{ news.content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewsView',
    data() {
      return {
        newsId: this.$route.params.id,
        news: {},
      };
    },
    methods: {
      fetchNewsDetails(id) {
        // Simulated API call - replace this with your actual API call
        const allNews = [
          {
            id: 1,
            title: 'Ukraine Looms Over NATO Summit, and Biden Is Defiant on Running',
            time: '5 hours ago',
            authors: 'Julian E. Barnes, Ian Stewart',
            image: 'https://via.placeholder.com/400x200',
            content: 'Detailed content about the Ukraine NATO summit...',
          },
          {
            id: 2,
            title: 'Congressional Democrats',
            time: '1 hour ago',
            authors: 'Anders Hagstrom',
            image: 'https://via.placeholder.com/400x200',
            content: 'Detailed content about Congressional Democrats...',
          },
        ];
  
        this.news = allNews.find(newsItem => newsItem.id === parseInt(id));
      },
    },
    watch: {
      '$route.params.id': {
        handler(newId) {
          this.newsId = newId;
          this.fetchNewsDetails(newId);
        },
        immediate: true,
      },
    },
    created() {
      this.fetchNewsDetails(this.newsId);
    },
  };
  </script>
  
  <style scoped></style>
  