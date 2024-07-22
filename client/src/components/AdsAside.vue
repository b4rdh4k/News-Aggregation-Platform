<script setup>
  import { ref, onMounted } from 'vue';
  
  const ads = ref([]);
  
  onMounted(async () => {
    const response = await fetch('/ads.json');
    const data = await response.json();
    ads.value = data;
  });
  </script>

<template>
    <aside class="container mx-auto pl-4 pt-4">
    <h6 class=" text-accent dark:text-dark-accent font-bold mb-4">Sponsored</h6>
      <div class="grid grid-cols-1 gap-4">
        <div v-for="(ad, index) in ads" :key="index" class="p-4 rounded-lg shadow-md bg-gray-100">
          <a :href="ad.link" target="_blank" rel="noopener noreferrer">
            <img :src="ad.image" alt="Ad image" class="w-full h-auto object-cover rounded-lg">
          </a>
        </div>
      </div>
    </aside>
  </template>