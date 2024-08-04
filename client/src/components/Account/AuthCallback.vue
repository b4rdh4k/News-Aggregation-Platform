<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Processing your login...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const accessToken = urlParams.get('accessToken')
  const refreshToken = urlParams.get('refreshToken')

  if (accessToken && refreshToken) {
    userStore.$patch({
      token: accessToken
    })
    localStorage.setItem('token', accessToken)

    // Optionally, you can also save the refresh token
     localStorage.setItem('refreshToken', refreshToken);

    // Redirect to the home page or dashboard
    router.push('/')
  } else {
    // Handle error or redirect to login if tokens are missing
    router.push('/login')
  }
})
</script>
