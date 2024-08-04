<script setup>
import { ref } from 'vue'
import ThemeToggle from '@/components/shared/Interactions/ThemeToggle.vue'
import { useUserStore } from '@/store/user'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const isSidebarOpen = ref(false)
const userStore = useUserStore()
const toast = useToast()
const router = useRouter()

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function closeSidebar() {
  isSidebarOpen.value = false
}
const handleLogout = async () => {
  await userStore.logout();
  toast.success('Logout successful!');
  router.push('/');
};
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
        <router-link to="/admin" class="nav-item" @click="closeSidebar">Home</router-link>
        <router-link to="/admin/users" class="nav-item" @click="closeSidebar">Users</router-link>
        <router-link to="/admin/comments" class="nav-item" @click="closeSidebar"
          >Comments</router-link
        >
        <router-link to="/profile" class="nav-item" @click="closeSidebar">Profile</router-link>
      </nav>
      <footer class="sidebar-footer">
        <router-link to="/">
          <button
            @click="handleLogout"
            class="block w-full border-b-[1px] border-accent dark:border-dark-accent px-4 py-2 text-left hover:bg-primary hover:rounded-t-md dark:hover:bg-dark-primary"
          >
            Log out
          </button>
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
        <div class="welcome-message">Happy working 💌</div>
        <router-link to="/" class="h-12 flex-shrink-0">
          <img src="@/assets/media/Sapientia-Logo.png" alt="Logo" class="h-full cursor-pointer" />
        </router-link>
        <ThemeToggle />
      </header>
      <section class="content p-4">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/admin/styles/main.scss';
</style>
