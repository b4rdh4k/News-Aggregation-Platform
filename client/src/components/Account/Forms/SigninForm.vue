<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const emit = defineEmits(['closeModal']);

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const userStore = useUserStore();
const router = useRouter();

const validateForm = () => {
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Email is invalid';
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password.value)) {
    passwordError.value = 'Password must contain at least one uppercase letter, one lowercase letter, one symbol, and one number';
  }

  return !emailError.value && !passwordError.value;
};

const submitForm = async () => {
  if (validateForm()) {
    const success = await userStore.login(email.value, password.value);
    if (success) {
      emit('closeModal');
      router.push('/');
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  }
};
</script>
<template>
  <div class="flex p-2 rounded-lg bg-background dark:bg-dark-background dark:text-dark-text text-text">
    <div class="flex flex-1 justify-center items-center mt-4">
      <div class="w-full max-w-sm pt-2">
        <h1 class="text-4xl font-bold mb-4 text-center">Sign in</h1>
        <form @submit.prevent="submitForm" class="w-full" autocomplete="on" novalidate>
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
          >
            Sign in
          </button>
        </form>
        <div class="mt-4 text-center">
          <p class="text-secondary dark:text-dark-secondary">
            Forgot password?
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
input:active{
  background-color: var(--secondary);
  border-color: var(--primary);
}
input{
  background-color: var(--primary);
  color: var(--text);
  border-color: var(--secondary);
}
</style>
