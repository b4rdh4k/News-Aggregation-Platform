<template>
  <div v-if="activePlan">
    <h1>{{ activePlan.name }}</h1>
    <p>{{ activePlan.description }}</p>
    <img :src="activePlan.imageUrl" alt="Plan image" />
    <p>Price: {{ activePlan.price }} {{ activePlan.currency }}</p>
    <button @click="startPaymentProcess">Subscribe Now</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSubscriptionStore } from '@/store/subscription';
import { fetchApi } from '@/utils/fetchApi';

const store = useSubscriptionStore();
const activePlan = ref(null);

onMounted(async () => {
  await store.fetchActivePlan();
  activePlan.value = store.activePlan;
});

const startPaymentProcess = async () => {
  if (activePlan.value) {
    try {
      alert('You have started the pay,emt, proceed with payment!');
      const response = await fetchApi('/payment/create', {
        method: 'POST',
      });

      // Assuming the backend returns the URL to redirect to Stripe
      localStorage.setItem('SubscriptionId', response.subscriptionId);

      // Redirect to Stripe Checkout URL
      setTimeout(() => {
        window.location.href = response.url; // Ensure 'url' is returned by the backend
      }, 2000);
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('An error occurred while reserving the ticket.');
    }
  }
};
</script>
