<template>
  <header
    class="bg-background dark:bg-dark-background text-text dark:text-dark-text p-4 sticky top-0 shadow-md z-10"
  >
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="h-12 flex-shrink-0">
        <img src="@/assets/Sapientia-Logo.png" alt="Logo" class="h-full cursor-pointer" />
      </router-link>

      <div class="hidden md:block">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keydown.enter="performSearch"
            placeholder="Search for topics, locations & sources"
            class="p-2 min-w-96 rounded bg-secondary dark:bg-dark-secondary text-background dark:text-dark-background"
          />
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleSearch"
          class="w-6 h-6 ml-4 cursor-pointer md:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m-3.15 1.85a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z"
          />
        </svg>
        <div class="relative" ref="dropdown">
          <button @click="toggleDropdown" class="flex items-center space-x-2">
            <img src="@/assets/user-icon.svg" class="max-h-8 max-w-8 cursor-pointer" alt="User Icon" />
          </button>
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-background border-[1px] border-accent dark:bg-dark-background rounded-md shadow-lg z-20"
          >
            <button
              @click="openSignInModal"
              class="block w-full border-b-[1px] border-accent px-4 py-2 text-left hover:bg-primary hover:rounded-t-md dark:hover:bg-dark-primary"
            >
              Sign In
            </button>
            <button
              @click="openRegisterModal"
              class="block w-full px-4 py-2 text-left hover:bg-primary hover:rounded-b-md dark:hover:bg-dark-primary"
            >
              Register
            </button>
          </div>
        </div>
        <ThemeToggle class=" md:block" />
      </div>
    </div>

    <div v-if="showSearch" class="relative md:hidden mt-4">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="performSearch"
        placeholder="Search for topics, locations & sources"
        class="p-2 rounded bg-secondary dark:bg-dark-secondary text-background dark:text-dark-background w-full"      />
    </div>

    <SignInModal v-if="showSignInModal" @close="showSignInModal = false" />
    <RegisterModal v-if="showRegisterModal" @close="showRegisterModal = false" />
  </header>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue'
import SignInModal from '@/components/Account/SigninModal.vue'
import RegisterModal from '@/components/Account/SignupModal.vue'

export default {
  name: 'AppHeader',
  components: {
    ThemeToggle,
    SignInModal,
    RegisterModal
  },
  data() {
    return {
      showSearch: false,
      searchQuery: '',
      isDropdownOpen: false,
      showSignInModal: false,
      showRegisterModal: false
    }
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch
    },
    performSearch() {
      if (this.searchQuery) {
        console.log(`Searching for: ${this.searchQuery}`)
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
      if (this.isDropdownOpen) {
        document.body.addEventListener('click', this.closeDropdownOnClickOutside)
      } else {
        document.body.removeEventListener('click', this.closeDropdownOnClickOutside)
      }
    },
    openSignInModal() {
      this.showSignInModal = true
      this.isDropdownOpen = false
    },
    openRegisterModal() {
      this.showRegisterModal = true
      this.isDropdownOpen = false
    },
    closeDropdownOnClickOutside(event) {
      const dropdown = this.$refs.dropdown
      if (!dropdown.contains(event.target)) {
        this.isDropdownOpen = false
        document.body.removeEventListener('click', this.closeDropdownOnClickOutside)
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
  .hidden {
    display: block !important;
  }
}
</style>
