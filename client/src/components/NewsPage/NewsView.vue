<template>
  <div>
    <h1 class="text-2xl font-bold">{{ news.title }}</h1>
    <p>{{ news.time }} • {{ news.authors }}</p>
    <img :src="news.image" alt="" class="w-full h-48 object-cover mb-2" />
    <p>{{ news.content }}</p>
  </div>
</template>

<script>
export default {
  name: "NewsView",
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
          title: "Ukraine Looms Over NATO Summit, and Biden Is Defiant on Running",
          time: "5 hours ago",
          authors: "Julian E. Barnes, Ian Stewart",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the Ukraine NATO summit...",
        },
        {
          id: 2,
          title: "Congressional Democrats",
          time: "1 hour ago",
          authors: "Anders Hagstrom",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about Congressional Democrats...",
        },
        {
          id: 3,
          title: "The 2022 NFL Draft is coming to Las Vegas",
          time: "2 hours ago",
          authors: "Author C",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the 2022 NFL Draft...",
        },
        {
          id: 4,
          title: "The 2022 NFL Draft is coming to Las Vegas",
          time: "2 hours ago",
          authors: "Author D",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the 2022 NFL Draft...",
        },
        {
          id: 5,
          title: "Dead Online Shooter Refunds DrDisrespect Skins In The Worst Way",
          time: "23 hours ago",
          authors: "Author A",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the Dead Online Shooter...",
        },
        {
          id: 6,
          title: "Netflix’s next live event is a Joe Rogan comedy special",
          time: "1 hour ago",
          authors: "Author B",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the Netflix live event...",
        },
        {
          id: 7,
          title: "The 2022 NFL Draft is coming to Las Vegas",
          time: "2 hours ago",
          authors: "Author C",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the 2022 NFL Draft...",
        },
        {
          id: 8,
          title:
            "Thanks, Obama: USA Basketball survives rust, roster drama in exhibition win",
          time: "2 minutes ago",
          authors: "Ben Golliver",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about the USA Basketball exhibition win...",
        },
        {
          id: 9,
          title: "Former NFL defensive coordinator Monte Kiffin has died",
          time: "1 hour ago",
          authors: "Charean Williams",
          image: "https://via.placeholder.com/400x200",
          content: "Detailed content about Monte Kiffin...",
        },
      ];

      this.news = allNews.find((newsItem) => newsItem.id === parseInt(id));
    },
  },
  watch: {
    "$route.params.id": {
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
