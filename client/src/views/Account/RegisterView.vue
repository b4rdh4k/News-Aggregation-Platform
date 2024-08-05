<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import lottie from 'lottie-web'
import animationData from '@/assets/media/SignupAnimation.json'
import { useToast } from 'vue-toastification'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const username = ref('')
const fullName = ref('')
const birthdate = ref('')
const emailError = ref('')
const usernameError = ref('')
const fullNameError = ref('')
const birthdateError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const loading = ref(false)
const lottieContainer = ref(null)

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

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
  usernameError.value = ''
  fullNameError.value = ''
  birthdateError.value = ''
  confirmPasswordError.value = ''

  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Email is invalid'
  }

  if (!username.value) {
    usernameError.value = 'Username is required'
  } else if (!/^[a-zA-Z0-9_.]{6,12}$/.test(username.value)) {
    usernameError.value =
      'Username must be between 6 and 12 characters and can only contain letters, numbers, underscores, and dots'
  }

  if (!fullName.value) {
    fullNameError.value = 'Full Name is required'
  } else if (fullName.value.split(' ').length < 2) {
    fullNameError.value = 'Full Name must have at least two words'
  }

  if (!birthdate.value) {
    birthdateError.value = 'Birthdate is required'
  } else {
    const today = new Date()
    const selectedDate = new Date(birthdate.value)
    const age = today.getFullYear() - selectedDate.getFullYear()
    if (age < 18) {
      birthdateError.value = 'You must be of legal age to register an account'
    } else if (age > 120) {
      birthdateError.value = "You can't be older than humanly possible"
    }
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password.value)) {
    passwordError.value =
      'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number'
  }

  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Confirm Password is required'
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = 'Passwords do not match'
  }

  return (
    !emailError.value &&
    !passwordError.value &&
    !usernameError.value &&
    !fullNameError.value &&
    !birthdateError.value &&
    !confirmPasswordError.value
  )
}

const register = async () => {
  if (!validateForm()) {
    toast.error('Please fill out all required fields correctly.')
    return
  }

  loading.value = true

  try {
    await userStore.register({
      username: username.value,
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      firstLogin: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      connectingIp: '127.0.0.1',
      birthdate: new Date(birthdate.value).toISOString(),
      language: navigator.language,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    
    toast.success('Registration was successful!')
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error.message)
    toast.error('Failed to register user.')
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div
    class="flex flex-col md:flex-row min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text"
  >
    <div class="hidden md:flex  flex-1 pl-4">
      <div ref="lottieContainer" class="h-full"></div>
    </div>
    <div
      class="flex-1 flex items-start lg:items-center xl:items-center 2xl:items-center justify-center"
    >
      <div
        class="container max-w-lg mx-auto px-6 bg-background dark:bg-dark-background text-text dark:text-dark-text rounded-lg"
      >
        <h3 class="text-text dark:text-dark-text font-bold mb-4 text-center">Join the community</h3>
        <form @submit.prevent="register" class="w-full" autocomplete="on" novalidate>
          <div class="mb-4">
            <label for="username" class="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': usernameError }"
              autocomplete="username"
            />
            <p v-if="usernameError" class="text-red-500 text-sm">{{ usernameError }}</p>
          </div>
          <div class="mb-4">
            <label for="fullName" class="block mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              v-model="fullName"
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': fullNameError }"
              autocomplete="name"
            />
            <p v-if="fullNameError" class="text-red-500 text-sm">{{ fullNameError }}</p>
          </div>
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
            <label for="birthdate" class="block mb-2">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              v-model="birthdate"
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': birthdateError }"
              autocomplete="off"
            />
            <p v-if="birthdateError" class="text-red-500 text-sm">{{ birthdateError }}</p>
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
          <div class="mb-4">
            <label for="confirmPassword" class="block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full p-2 border rounded"
              :class="{ 'border-red-500': confirmPasswordError }"
              autocomplete="new-password"
            />
            <p v-if="confirmPasswordError" class="text-red-500 text-sm">
              {{ confirmPasswordError }}
            </p>
          </div>
          <button
            type="submit"
            class="w-full py-2 mb-4 px-4 bg-secondary dark:bg-dark-secondary text-text dark:text-dark-text rounded hover:bg-accent dark:hover:bg-dark-accent"
            :disabled="loading"
          >
            <span v-if="loading"> Registering... <i class="fas fa-spinner fa-spin"></i></span>
            <span v-else>Sign Up</span>
          </button>
          <p class="text-center mb-8">
            Already have an account?
            <router-link to="/login" class="text-xl text-secondary dark:text-dark-secondary underline"
              >Log In</router-link
            >
          </p>
        </form>
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
  color: var(--text);
  border-color: var(--secondary);
}
</style>
