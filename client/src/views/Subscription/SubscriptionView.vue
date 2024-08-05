<template>
  <div class="flex items-center">
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div class="mx-auto mb-8 max-w-screen-md lg:mb-12 text-center">
        <h2 class="mb-10 text-4xl font-bold tracking-tight text-text dark:text-dark-text">Pay and reach freedom</h2>
      </div>
      <div
        v-for="plan in plans"
        :key="plan.id"
        class="mx-auto flex max-w-lg space-y-8 items-start flex-col rounded-3xl border border-accent dark:border-dark-accent bg-primary dark:bg-dark-primary p-6 text-text dark:text-dark-text xl:p-8"
      >
        <h3 class="text-lg font-normal">{{ plan.name }}</h3>
        <div class="my-8 flex items-baseline justify-center">
          <span class="mr-2 text-5xl font-extrabold">{{ plan.price }}{{ plan.currency }}</span>
          <span class="text-text dark:text-dark-text">/month</span>
        </div>

        <p class="font-light text-text dark:text-dark-text sm:text-sm">
          {{ plan.description }}
        </p>
        <a
          class="cursor-pointer bg-gray-900 w-full rounded-md p-3 text-center text-sm font-semibold text-white shadow-sm hover:-translate-y-1"
          @click="subscribe(plan.id)"
        >Get started</a>
        <ul role="list" class="mb-8 space-y-4 text-left text-text dark:text-dark-text text-sm">
          <li class="flex items-center space-x-3">
            <svg
              class="h-5 w-5 flex-shrink-0 bg-gray-900 rounded-full p-0.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>10,000 visitors</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useSubscriptionStore } from '@/stores/useSubscriptionStore';
import { useUserStore } from '@/stores/useUserStore';

export default {
  name: 'SubscribeView',
  setup() {
    const subscriptionStore = useSubscriptionStore();
    const userStore = useUserStore();

    // Fetch plans on component mount
    subscriptionStore.fetchPlans();

    const subscribe = (planId) => {
      const stripeCustomerId = userStore.user.stripeCustomerId;
      subscriptionStore.createPayment(planId, stripeCustomerId);
    };

    return {
      plans: subscriptionStore.plans,
      subscribe,
    };
  },
};
</script>

<style scoped>
.plan {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
}
</style>
