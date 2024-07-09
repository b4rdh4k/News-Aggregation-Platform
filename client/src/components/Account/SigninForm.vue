<template>
  <div class="flex min-h-screen bg-background dark:bg-dark-background dark:text-dark-text text-text">
    <div class="flex flex-1 justify-center items-center mt-4">
      <div class="w-full max-w-sm pt-2">
        <h1 class="text-4xl font-bold mb-4 text-center">Sign in</h1>
        <button
          class="w-full py-2 px-4 mb-4 border border-gray-300 rounded flex items-center justify-center text-dark-background bg-white hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            class="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>
        <div class="text-text mb-4 text-center">or use e-mail instead</div>
        <form @submit.prevent="submitForm" class="w-full" autocomplete="on">
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

          <button
            type="submit"
            class="w-full py-2 px-4 bg-dark-accent text-white rounded hover:bg-accent"
          >
            Sign in
          </button>
        </form>
        <div class="mt-4 text-center">
          <p class="text-secondary">
            Forgot password?
          </p>
        </div>
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
        const success = await userStore.register(email.value, password.value);
        if (success) {
          emit('closeModal');
          router.push('/');
        }
      }
    };

    const goToSignUp = () => {
      router.push('/sign-up');
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      submitForm,
      goToSignUp,
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
