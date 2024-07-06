<template>
    <header class="bg-background text-white p-4">
      <div class="container mx-auto">
        <h1 class="text-xl text-text font-bold">News Aggregation Platform</h1>
        <nav>
          <router-link to="/" class="mr-4">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
    name: 'Header',
  };
  </script>
  
  <style scoped>
  </style>
  