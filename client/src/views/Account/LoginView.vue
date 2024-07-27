<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import lottie from 'lottie-web'
import animationData from '@/assets/media/LoginAnimation.json'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const lottieContainer = ref(null)
const loading = ref(false)

onMounted(() => {
  lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData
  })
})

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!/\S+@\S+\.\S+/i.test(email.value)) {
    emailError.value = 'Email is invalid'
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  } else if (password.value.length < 6) {
    passwordError.value = 'Password is incorrect'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password.value)) {
    passwordError.value = 'Password is incorrect'
  }

  return !emailError.value && !passwordError.value
}

const login = async () => {
  if (!validateForm()) {
    toast.error('Please fill out all required fields correctly.')
    return
  }

  const normalizedEmail = email.value.toLowerCase()

  loading.value = true

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: normalizedEmail,
        password: password.value
      })
    })

    const data = await response.json()
    console.log('Login response:', data)

    if (response.ok) {
      userStore.$patch({
        token: data.accessToken,
        user: data.user
      })
      localStorage.setItem('token', data.accessToken)
      toast.success('Login successful!')
      router.push('/')
    } else {
      console.error('Login failed:', data)
      switch (data.code) {
        case 36:
          toast.error('User not found.')
          break;
          case 37:
          toast.error('Invalid password.')
          break;
          case 38:
          toast.error('Error creating acess token.')
          break;
          case 44:
          toast.error('Our system has detected multiple login attempts from your IP address     which is a violation of our Terms of Service. As a result     access from your IP has been temporarily blocked for 10 minutes. This measure helps protect our platform from unauthorized access and ensures a secure environment for all users.')
          break;
        default:
          toast.error('Failed to register user.')
      }
    }
  } catch (error) {
    console.error('Error logging in user:', error)
    if (error.message === 'Failed to fetch') {
      emailError.value = 'Failed to connect to server'
    }
    toast.error('Failed to connect to server.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text"
  >
    <div class="hidden md:flex flex-1 pl-4">
      <div ref="lottieContainer" class="h-full"></div>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div
        class="container max-w-lg mx-auto px-6 bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-lg"
      >
        <h1 class="text-4xl font-bold mb-4 text-center">Nice to see you again!</h1>
        <form @submit.prevent="login" autocomplete="on" novalidate>
          <div class="mb-4">
            <label for="email" class="block mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': emailError }"
              autocomplete="email"
            />
            <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': passwordError }"
              autocomplete="new-password"
            />
            <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
          </div>

          <button
            type="submit"
            class="w-full py-2 mb-4 px-4 bg-secondary dark:bg-dark-secondary text-text dark:text-dark-text rounded hover:bg-accent dark:hover:bg-dark-accent"
            :disabled="loading"
          >
            <span v-if="!loading">Log in</span>
            <span v-if="loading" class="spinner">
              Loading... <i class="fas fa-spinner fa-spin"></i>
            </span>
          </button>
        </form>
        <div class="mt-4 text-center text-lg">
          <p class="text-secondary dark:text-dark-secondary">Forgot password?</p>
          <p class="text-secondary dark:text-dark-secondary">
            Don't have an account?
            <router-link to="/register" class="text-accent dark:text-dark-accent"
              >Sign up</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  background-color: var(--secondary);
  border-color: var(--primary);
}
input:active {
  background-color: var(--secondary);
  border-color: var(--primary);
}
input {
  background-color: var(--primary);
  color: var (--text);
  border-color: var(--secondary);
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
