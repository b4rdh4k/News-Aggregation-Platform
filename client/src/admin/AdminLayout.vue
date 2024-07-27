<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="logo">Admin Dashboard</div>
      <nav class="flex flex-col">
        <router-link to="/admin/home" class="nav-item">Home</router-link>
        <router-link to="/admin/users" class="nav-item">Users</router-link>
        <router-link to="/admin/settings" class="nav-item">Settings</router-link>
        <router-link to="/admin/logout" class="nav-item">Logout</router-link>
      </nav>
    </aside>
    <main class="main-content">
      <header class="header">
        <div>Welcome, Admin</div>
        <button class="bg-primary text-white py-2 px-4 rounded">Logout</button>
      </header>
      <section class="content">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/admin/styles/main.scss';
</style>
