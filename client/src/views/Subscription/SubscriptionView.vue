<script setup>
import { ref, onMounted } from 'vue'
import { usePlanStore } from '@/store/plans'
import { useRouter } from 'vue-router'

const planStore = usePlanStore()
const essentialPlan = ref(null)
const basicPlan = ref(null)
const router = useRouter()

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

const goBack = () => {
  router.go(-1)
}

const subscribe = async (planId) => {
  await planStore.createPaymentSession(planId)
}

onMounted(() => {
  fetchPlans()
})
</script>

<template>
  <div class="relative flex flex-col min-h-screen p-4">
    <button @click="goBack" class="btn-go-back">
      <i class="fa fa-arrow-left" aria-hidden="true"></i>
      <span class="ml-2">Go Back</span>
    </button>

    <div class="mx-auto max-w-screen-xl mt-12 flex-grow">
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
            @click="subscribe(essentialPlan.id)"
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
            @click="subscribe(basicPlan.id)"
            >Get started</a
          >
          <ul role="list" class="mb-8 space-y-4 text-left text-sm">
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.relative {
  display: flex;
  flex-direction: column;
}

.btn-go-back {
  position: absolute;
  bottom: 10%;
  left: 1rem;
  background-color: var(--primary);
  color: var(--text);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.btn-go-back:hover {
  background-color: var(--accent);
}

.btn-go-back i {
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .btn-go-back {
    bottom: 0.5rem;
    left: 0.5rem;
    font-size: 14px;
  }
}
</style>