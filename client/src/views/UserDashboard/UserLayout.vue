<script setup>
import { ref } from 'vue'
import ThemeToggle from '@/components/shared/Interactions/ThemeToggle.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}
</script>

<template>
  <div class="dashboard">
    <aside :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <div class="sidebar-header">
        <div class="description">Dashboard</div>
        <button @click="toggleSidebar" class="lg:hidden close-btn">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <nav class="flex mt-4 flex-col">
        <router-link to="/profile" class="nav-item" @click="closeSidebar">Home</router-link>
        <router-link to="/bookmarks" class="nav-item" @click="closeSidebar">Bookmarks</router-link>
        <router-link to="/mfa" class="nav-item" @click="closeSidebar"
          >Multi-factor Auth</router-link
        >
      </nav>
      <footer class="sidebar-footer">
        <router-link to="/">
          <button class="button py-2 px-4 rounded">Logout</button>
        </router-link>
      </footer>
    </aside>

    <main class="main-content">
      <header class="header">
        <button @click="toggleSidebar" class="hamburger lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <router-link to="/" class="h-12 flex-shrink-0">
          <img src="@/assets/media/Sapientia-Logo.png" alt="Logo" class="h-full cursor-pointer" />
        </router-link>
        <ThemeToggle />
      </header>
      <section>
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/views/UserDashboard/styles/main.scss';
</style>
