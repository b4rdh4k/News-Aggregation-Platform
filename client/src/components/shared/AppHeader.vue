<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/store/user'
import ThemeToggle from '@/components/shared/ThemeToggle.vue'

const userStore = useUserStore()

const dropdownOpen = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')

const isLoggedIn = computed(() => !!userStore.token)
console.log('Token:', userStore.token)
console.log('Is Logged In:', isLoggedIn.value)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) {
    document.addEventListener('click', closeDropdownOnClickOutside)
  } else {
    document.removeEventListener('click', closeDropdownOnClickOutside)
  }
}

const closeDropdownOnClickOutside = (event) => {
  const dropdown = dropdownRef.value
  if (dropdown && !dropdown.contains(event.target)) {
    dropdownOpen.value = false
    document.removeEventListener('click', closeDropdownOnClickOutside)
  }
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
}

const performSearch = () => {
  if (searchQuery.value) {
    console.log(`Searching for: ${searchQuery.value}`)
  }
}

const handleLogout = async () => {
  await userStore.logout();
};

const dropdownRef = ref(null)

onMounted(() => {
  if (dropdownOpen.value) {
    document.addEventListener('click', closeDropdownOnClickOutside)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>

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
            class="p-2 min-w-96 rounded bg-primary dark:bg-dark-primary text-text placeholder-text dark:placeholder-dark-text outline-none dark:text-dark-text"
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
        <div class="relative" ref="dropdownRef">
          <button @click="toggleDropdown" class="flex items-center space-x-2">
            <img
              src="@/assets/user-icon.svg"
              class="max-h-8 max-w-8 cursor-pointer"
              alt="User Icon"
            />
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-background border-[1px] border-accent dark:border-dark-accent dark:bg-dark-background rounded-md shadow-lg z-20"
          >
            <ul>
              <li v-if="!isLoggedIn">
                <router-link
                  to="/login"
                  class="block w-full border-b-[1px] border-accent dark:border-dark-accent px-4 py-2 text-left hover:bg-primary hover:rounded-t-md dark:hover:bg-dark-primary"
                  >Login</router-link
                >
              </li>
              <li v-if="!isLoggedIn">
                <router-link
                  to="/register"
                  class="block w-full border-b-[1px] border-accent dark:border-dark-accent px-4 py-2 text-left hover:bg-primary hover:rounded-t-md dark:hover:bg-dark-primary"
                  >Register</router-link
                >
              </li>
              <li v-if="isLoggedIn">
                <button
                  @click="handleLogout"
                  class="block w-full border-b-[1px] border-accent dark:border-dark-accent px-4 py-2 text-left hover:bg-primary hover:rounded-t-md dark:hover:bg-dark-primary"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <ThemeToggle class="md:block" />
      </div>
    </div>
    <div v-if="showSearch" class="relative md:hidden mt-4">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="performSearch"
        placeholder="Search for topics, locations & sources"
        class="p-2 rounded bg-primary dark:bg-dark-primary w-full"
      />
    </div>
  </header>
</template>

<style scoped>
@media (min-width: 768px) {
  .hidden {
    display: block !important;
  }
}
</style>
