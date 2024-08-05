<script setup>
import { ref, onMounted } from 'vue';
import { usePersonalizedAdsStore } from '@/store/adStore';

const personalizedAdsStore = usePersonalizedAdsStore();
const ads = ref([]);

onMounted(async () => {
  try {
    await personalizedAdsStore.fetchPersonalizedAds();
    ads.value = personalizedAdsStore.ads.slice(0, 5);
  } catch (error) {
    console.error('Error fetching personalized ads:', error);
  }
});
</script>

<template>
  <aside class="container mx-auto pl-4 pt-4">
    <h6 class="text-accent dark:text-dark-accent font-bold mb-4">Sponsored</h6>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-1 gap-3">
      <div v-for="ad in ads" :key="ad.id" class="p-4 rounded-lg">
        <a :href="ad.redirectUrl" target="_blank" rel="noopener noreferrer">
          <img :src="ad.imageUrl" alt="Ad image" class="w-auto h-auto object-cover rounded-lg" />
        </a>
      </div>
    </div>
  </aside>
</template>
