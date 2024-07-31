// stores/subscription.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchApi } from '@/utils/fetchApi'; // Correct import syntax

export const useSubscriptionStore = defineStore('subscription', () => {
  const activePlan = ref(null);

  const fetchActivePlan = async () => {
    try {
      const response = await fetchApi('/plan/allActive?range=1');
      if (response.value.statusCode === 200) {
        activePlan.value = response.value.value.plans[0];
      }
    } catch (error) {
      console.error('Error fetching active plan:', error);
    }
  };

  return { activePlan, fetchActivePlan };
});
