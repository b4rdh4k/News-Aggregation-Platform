<template>
  <div class="flex min-h-screen bg-background text-text">
    <div class="flex flex-1 justify-center items-start mt-4">
      <div v-if="shouldShowIllustration" class="flex flex-1 justify-center items-start ">
      <img
        src="@/assets/Signup-svg.svg"
        alt="Sign Up Illustration"
        class="svg-illustration w-full max-w-md"
      />
    </div>
      <div class="w-full max-w-sm pt-2">
        <h1 class="text-4xl font-bold mb-4 text-center">Sign up</h1>
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
        <form @submit.prevent="submitForm" class="w-full">
          <div class="mb-4">
            <label for="email" class="block mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-dark-accent text-white rounded hover:bg-accent"
          >
            Sign up
          </button>
        </form>
        <div class="mt-4 text-center">
          <p class="text-secondary">
            Already have an account?
            <span @click="goToSignIn" class="text-primary cursor-pointer">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      shouldShowIllustration: true
    }
  },
  methods: {
    submitForm() {
      // form submission logic
    },
    goToSignIn() {
      this.$router.push('/sign-in');
    },
    updateIllustrationVisibility() {
      this.shouldShowIllustration = window.innerWidth > 1020;
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateIllustrationVisibility);
    this.updateIllustrationVisibility();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIllustrationVisibility);
  }
}
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
.dark .svg-illustration {
  filter: invert(93%) sepia(4%) saturate(10%) hue-rotate(35deg) brightness(99%) contrast(87%);
}
</style>
