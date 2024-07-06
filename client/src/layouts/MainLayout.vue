<template>
    <div>
      <Header />
      <main class="container mx-auto mt-4">
        <router-view />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      // eslint-disable-next-line vue/no-reserved-component-names
      Header,
      // eslint-disable-next-line vue/no-reserved-component-names
      Footer,
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  