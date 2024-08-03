<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useViewHistoryStore } from '@/store/viewHistoryStore'; 

const router = useRouter()
const viewHistoryStore = useViewHistoryStore();
const picksForYou = ref([]); 

const goToNewsView = (pick) => {
  router.push({ name: 'News', params: { id: pick.id } })
}

onMounted(async () => {
  try {
    await viewHistoryStore.fetchViewHistory(); 
    picksForYou.value = viewHistoryStore.viewHistory.slice(0, 4);
  } catch (error) {
    console.error('Error fetching view history:', error);
  }
});
</script>

<template>
  <div
    class="bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20 rounded-lg p-2 ml-0 sm:ml-0 lg:ml-3 xl:ml-3 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-2"
  >
    <div
      v-for="(pick, index) in picksForYou"
      :key="index"
      class="mb-1 cursor-pointer mr-1"
      @click="goToNewsView(pick)"
    >
      <router-link :to="`/source/${pick.source}`" class="mb-2" @click.stop>
        <p
          class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-secondary dark:hover:text-dark-secondary"
        >
          {{ pick.source }}
        </p>
      </router-link>
      <h4 class="text-lg lg:text-xl xl:text-xl">{{ pick.title }}</h4>
      <p class="text-text dark:text-dark-text text-sm mt-1">
        {{ pick.time }}
      </p>
      <hr
        v-if="index < picksForYou.length - 1"
        class="border-b mt-4 border-secondary dark:border-dark-secondary"
      />
    </div>
  </div>
</template>
