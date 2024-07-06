<template>
    <div>
      <AppHeader />
      <main class="container mx-auto mt-4">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '../components/AppHeader.vue';
  import AppFooter from '../components/AppFooter.vue';
  
  export default {
    name: 'MainLayout',
    components: {
      AppHeader,
      AppFooter,
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  