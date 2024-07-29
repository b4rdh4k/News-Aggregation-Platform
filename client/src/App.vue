<!-- src/App.vue -->
<template>
  <div>
    <router-view></router-view> <!-- This is where your routed components will be rendered -->
    <ScrollToTopButton /> <!-- The scroll-to-top button will be rendered on top of all pages -->
  </div>
</template>

<script setup>
import ScrollToTopButton from './components/shared/ScrollToTopButton.vue';
</script>

