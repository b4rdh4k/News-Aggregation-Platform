<template>
  <header class="bg-background dark:bg-dark-background text-text dark:text-dark-text p-4 sticky top-0 shadow-md z-10">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="h-12 flex-shrink-0">
        <img src="@/assets/Sapientia-Logo.png" alt="Logo" class="h-full cursor-pointer" />
      </router-link>
      
      <div class="hidden ">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            @keydown.enter="performSearch"
            placeholder="Search for topics, locations & sources"
            class="p-2 min-w-96 rounded bg-secondary dark:bg-dark-secondary text-background dark:text-dark-background "
          />
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <label class="md:hidden">
          <div class="w-9 h-10 cursor-pointer flex flex-col items-center justify-center" @click="toggleMenu">
            <input class="hidden peer" type="checkbox" />
            <div class="w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"></div>
            <div class="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
            <div class="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"></div>
          </div>
        </label>
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
        <ThemeToggle class="hidden md:block" />
        <svg class="hidden md:block w-6 h-6 ml-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.944 13.944 0 0112 15c3.86 0 7.305 1.564 9.879 4.09m-3.9-6.215A4.992 4.992 0 0012 10c-2.485 0-4.608 1.746-5.384 4.19M15 14a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
    </div>
      <div v-if="showSearch" class="relative md:hidden mt-4">
      <input type="text" v-model="searchQuery" @keydown.enter="performSearch" placeholder="Search for topics, locations & sources" class="p-2 rounded bg-secondary dark:bg-dark-secondary text-background dark:text-dark-background w-full">
    </div>
  </header>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue';

export default {
  name: 'AppHeader',
  components: {
    ThemeToggle,
  },
  data() {
    return {
      isMenuOpen: false,
      showSearch: false,
      searchQuery: '',
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    performSearch() {
      if (this.searchQuery) {
        // well do this when we get the backend code!!
        console.log(`Searching for: ${this.searchQuery}`);
      }
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .hidden {
    display: block !important;
  }
}
</style>