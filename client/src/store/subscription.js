import { defineStore } from 'pinia';
import { fetchApi } from '@/utils/fetchApi'; 

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    plans: [],
    subscription: null,
    paymentUrl: null,
  }),
  actions: {
    async fetchPlans() {
      try {
        const response = await fetchApi('GET', '/plans/getPlans');
        this.plans = response.data;
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    },
    async fetchSubscription(id) {
      try {
        const response = await fetchApi('GET', `/subscription/GetSubscriptionById/${id}`);
        this.subscription = response.data;
      } catch (error) {
        console.error('Failed to fetch subscription:', error);
      }
    },
    async createPayment(planId, stripeCustomerId) {
      try {
        const response = await fetchApi('POST', '/payment/CreatePayment', {
          PlanId: planId,
          StripeCustomerId: stripeCustomerId,
        });
        this.paymentUrl = response.data.url;
        window.location.href = this.paymentUrl; 
      } catch (error) {
        console.error('Failed to create payment:', error);
      }
    },
  },
});
