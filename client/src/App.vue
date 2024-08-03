<template>
  <div>
    <router-view></router-view> 
    <ScrollToTopButton /> 
  </div>
</template>

<script setup>
import ScrollToTopButton from './components/shared/ScrollToTopButton.vue';
</script>

