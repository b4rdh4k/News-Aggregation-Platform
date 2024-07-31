<template>
  <div v-if="activePlan">
    <h1>{{ activePlan.name }}</h1>
    <p>{{ activePlan.description }}</p>
    <img :src="activePlan.imageUrl" alt="Plan image" />
    <p>Price: {{ activePlan.price }} {{ activePlan.currency }}</p>
    <StripeCheckoutButton
      :sessionId="checkoutSessionId"
      @success="handleSuccess"
      @cancel="handleCancel"
    >
      Subscribe Now
    </StripeCheckoutButton>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSubscriptionStore } from '@/store/subscription';
import { useRouter } from 'vue-router';
import { StripeCheckoutButton } from '@vue-stripe/vue-stripe';
import { fetchApi } from '@/utils/fetchApi';
const store = useSubscriptionStore();
const router = useRouter();
const activePlan = ref(null);
const checkoutSessionId = ref('');

onMounted(async () => {
  await store.fetchActivePlan();
  activePlan.value = store.activePlan;

  if (activePlan.value) {
    try {
      const response = await fetchApi('/payment/create', {
        method: 'POST',
        body: JSON.stringify({
          subscriptionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          amount: activePlan.value.price,
          currency: activePlan.value.currency,
          paymentMethod: 'stripe',
          paymentStatus: 'pending',
          paymentGateway: 'stripe',
          paymentReference: 'unique-reference-id',
          paymentDescription: activePlan.value.name,
          paymentDate: new Date().toISOString(),
        }),
      });

      checkoutSessionId.value = response.subscriptionId;
    } catch (error) {
      console.error('Error fetching checkout session ID:', error);
    }
  }
});

const handleSuccess = (response) => {
  console.log('Payment successful:', response);
  // Optionally redirect or show success message
};

const handleCancel = () => {
  console.log('Payment cancelled.');
  // Optionally handle cancellation or redirect
};
</script>
