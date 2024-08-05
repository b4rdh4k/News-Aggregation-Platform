<template>
  <div
    v-if="isVisible"
    class="fixed bottom-0 right-0 m-4 p-4 bg-accent dark:bg-dark-accent text-text dark:text-dark-text rounded shadow-lg cursor-pointer"
  >
    <button @click="scrollToTop">
      <i class="fa fa-arrow-circle-up"></i></button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import debounce from 'lodash/debounce';

const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > window.innerHeight;
};

const handleDebouncedScroll = debounce(handleScroll, 100);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener('scroll', handleDebouncedScroll);
  handleScroll(); 
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleDebouncedScroll);
});
</script>

<style scoped>
.fixed {
  position: fixed;
  z-index: 1000;
}
</style>
