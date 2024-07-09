<template>
  <div class="flex md:max-h-[90vh] lg:max-h-[90vh] max-h-screen rounded-lg p-2 sm:p-0 overflow-y-scroll bg-background dark:bg-dark-background dark:text-dark-text text-text">
    <div class="flex flex-1 justify-center items-center md:mt-14 lg:mt-24 mt-40">
      <div class="w-full max-w-sm bg-background">
        <h1 class="text-4xl font-bold mb-4 md:mt-18 lg:mt-24 mt-40 text-center">Sign up</h1>
        <button
          class="w-full py-2 px-4 mb-4 border border-gray-300 rounded flex items-center justify-center text-dark-background bg-white hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            class="w-6 h-6 mr-2"
          />
          Sign up with Google
        </button>
        <div class="text-text mb-4 text-center">or use e-mail instead</div>
        <form @submit.prevent="submitForm" class="w-full" autocomplete="on">
          <div class="mb-4">
            <label for="username" class="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="w-full p-2 border border-gray-300 rounded"
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
              class="w-full p-2 border border-gray-300 rounded"
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
              class="w-full p-2 border border-gray-300 rounded"
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
              class="w-full p-2 border border-gray-300 rounded"
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
              class="w-full p-2 border border-gray-300 rounded"
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
              class="w-full p-2 border border-gray-300 rounded"
              :class="{ 'border-red-500': confirmPasswordError }"
              autocomplete="new-password"
            />
            <p v-if="confirmPasswordError" class="text-red-500 text-sm">{{ confirmPasswordError }}</p>
          </div>
          <button
            type="submit"
            class="w-full py-2 mb-4 px-4 bg-dark-accent text-white rounded hover:bg-accent"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export default {
  emits: ['closeModal'],
  setup(props, { emit }) {
    const email = ref('');
    const username = ref('');
    const fullName = ref('');
    const birthdate = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const emailError = ref('');
    const usernameError = ref('');
    const fullNameError = ref('');
    const birthdateError = ref('');
    const passwordError = ref('');
    const confirmPasswordError = ref('');
    const userStore = useUserStore();
    const router = useRouter();

    const validateForm = () => {
      emailError.value = ''
      usernameError.value = ''
      fullNameError.value = ''
      birthdateError.value = ''
      passwordError.value = ''
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
        if (age < 18 || age > 100) {
          birthdateError.value = 'You must be between 18 and 100 years old'
        }
      }

      if (!password.value) {
        passwordError.value = 'Password is required'
      } else if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters'
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
        !usernameError.value &&
        !fullNameError.value &&
        !birthdateError.value &&
        !passwordError.value &&
        !confirmPasswordError.value
      )
    }
    const submitForm = async () => {
  if (validateForm()) {
    const success = await userStore.register(email.value, password.value, username.value, fullName.value, birthdate.value);
    if (success) {
      emit('closeModal');
      router.push('/');
    }
  }
};


    return {
      email,
      username,
      fullName,
      birthdate,
      password,
      confirmPassword,
      emailError,
      usernameError,
      fullNameError,
      birthdateError,
      passwordError,
      confirmPasswordError,
      submitForm
    };
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(145, 139, 120, 0.3);
}
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.3);
}
</style>
