<script setup>
import { ref } from 'vue'

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
      <div class="sidebar-header flex justify-between items-center mb-4">
        <div class="logo">Dashboard</div>
        <button @click="toggleSidebar" class="lg:hidden close-btn">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <nav class="flex flex-col">
        <router-link to="/admin" class="nav-item" @click="closeSidebar">Home</router-link>
        <router-link to="/admin/users" class="nav-item" @click="closeSidebar">Users</router-link>
        <router-link to="/admin/comments" class="nav-item" @click="closeSidebar">Comments</router-link>
      </nav>
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
        <div>Welcome, Admin</div>
        <router-link to="/">
          <button class="bg-primary text-white py-2 px-4 rounded">Logout</button>
        </router-link>
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
