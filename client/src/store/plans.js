import { defineStore } from 'pinia'
import { fetchApi } from '@/utils/fetchApi'
import { getStripe } from '@/utils/stripe'

export const usePlanStore = defineStore('planStore', {
  state: () => ({
    plans: [],
    plan: null,
    activePlans: []
  }),

  actions: {
    async fetchPlanById(id) {
      console.log(`Fetching plan with ID: ${id}`)
      try {
        const response = await fetchApi(`/plan/${id}`, { method: 'GET' })
        console.log('Response:', response)
        if (response && response.id) {
          this.plan = response
        } else {
          console.error('Invalid response format:', response)
        }
      } catch (error) {
        console.error('Error fetching plan by id:', error)
      }
    },

    async fetchAllPlans(range = '') {
      try {
        const response = await fetchApi(`/plan/all${range ? `?range=${range}` : ''}`, {
          method: 'GET'
        })
        this.plans = await response.json()
      } catch (error) {
        console.error('Error fetching all plans:', error)
      }
    },

    async fetchAllActivePlans() {
      try {
        const response = await fetchApi('/plan/allActive')
        if (!response || !Array.isArray(response.value)) {
          throw new Error('Invalid response format')
        }
        return response.value
      } catch (error) {
        console.error('Error fetching active plans:', error)
        throw error
      }
    },

    async createPlan(planData) {
      try {
        const response = await fetchApi('/plan/create', {
          method: 'POST',
          body: JSON.stringify(planData),
          headers: { 'Content-Type': 'application/json-patch+json' }
        })
        if (response.ok) {
          console.log('Plan created successfully')
          const newPlan = await response.json()
          this.plans.push(newPlan)
        }
      } catch (error) {
        console.error('Error creating plan:', error)
      }
    },

    async createPaymentSession(planId) {
      try {
        const response = await fetchApi('/payment/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId })
        })
        const data = await response.json()
        const stripe = await getStripe()
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      } catch (error) {
        console.error('Error creating payment session:', error)
      }
    }
  }
})
