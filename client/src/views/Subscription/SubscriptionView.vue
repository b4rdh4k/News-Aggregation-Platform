<template>
  <div class="flex items-center justify-center p-4">
    <div class="mx-auto max-w-screen-xl">
      <div class="mx-auto mb-8 max-w-screen-md lg:mb-12 text-center">
        <h2 class="mb-10 text-4xl font-bold tracking-tight">You pay, we provide ❤️</h2>
      </div>
      <div class="space-y-8 lg:grid md:grid-cols-2 lg:space-y-0 lg:gap-10">
        <div
          v-if="essentialPlan"
          class="order-2 lg:order-1 mx-auto flex max-w-lg space-y-8 items-start flex-col rounded-3xl bg-accent dark:bg-dark-accent p-6 xl:p-8"
        >
          <h3 class="text-lg font-normal">{{ essentialPlan.name }}</h3>
          <div class="my-8 flex items-baseline justify-center">
            <span class="mr-2 text-5xl font-extrabold">{{ essentialPlan.price }}€</span>
            <span>/month</span>
          </div>
          <p class="font-light sm:text-sm">{{ essentialPlan.description }}</p>
          <a
            class="cursor-pointer bg-secondary dark:bg-dark-secondary w-full rounded-md p-3 text-center text-sm font-semibold text-white shadow-sm hover:-translate-y-1"
            >Get started</a
          >
          <ul role="list" class="mb-8 space-y-4 text-left text-sm">
          </ul>
        </div>
        <div
          v-if="basicPlan"
          class="order-1 lg:order-2 mx-auto flex max-w-lg space-y-8 items-start flex-col rounded-3xl border border-accent bg-background dark:border-dark-accent dark:bg-dark-background p-6 xl:p-8"
        >
          <h3 class="text-lg font-normal">{{ basicPlan.name }}</h3>
          <div class="my-8 flex items-baseline justify-center">
            <span class="mr-2 text-5xl font-extrabold">{{ basicPlan.price }}€</span>
            <span>/month</span>
          </div>
          <p class="font-light sm:text-sm">{{ basicPlan.description }}</p>
          <a
            class="cursor-pointer bg-secondary dark:bg-dark-secondary w-full rounded-md p-3 text-center text-sm font-semibold text-white shadow-sm hover:-translate-y-1"
            >Get started</a
          >
          <ul role="list" class="mb-8 space-y-4 text-left text-sm">
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePlanStore } from '@/store/plans'

const planStore = usePlanStore()
const essentialPlan = ref(null)
const basicPlan = ref(null)

const fetchPlans = async () => {
  try {
    const plans = await planStore.fetchAllActivePlans()
    if (plans.length > 0) {
      essentialPlan.value = plans[0]
      if (plans.length > 1) {
        basicPlan.value = plans[1]
      }
    } else {
      console.error('No active plans found')
    }
  } catch (error) {
    console.error('Error fetching active plans:', error)
  }
}

onMounted(() => {
  fetchPlans()
})
</script>

<style scoped></style>
