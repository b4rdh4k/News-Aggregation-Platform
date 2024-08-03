<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useMFA } from '@/composables/user/useMFA'
import { useRouter } from 'vue-router'

const mfaCode = ref('')
const toast = useToast()
const router = useRouter()
const { setupMFA } = useMFA()

const setup = async () => {
  try {
    await setupMFA({ code: mfaCode.value })
    toast.success('MFA setup successful!')
    router.push('/')
  } catch (error) {
    toast.error('MFA setup failed.')
  }
}
</script>

<template>
  <div class="container">
    <h1>MFA Setup</h1>
    <input v-model="mfaCode" placeholder="Enter MFA Code" />
    <button @click="setup">Setup MFA</button>
  </div>
</template>
