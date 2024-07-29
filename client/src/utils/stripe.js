import { loadStripe } from '@stripe/stripe-js'

let stripeInstance

export const getStripe = async () => {
  if (!stripeInstance) {
    stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  }
  return stripeInstance
}
