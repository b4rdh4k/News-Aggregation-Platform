<script setup>
import AppHeader from "../components/shared/AppHeader.vue";
import AppFooter from "../components/shared/AppFooter.vue";
</script>
<template>
  <div>
    <AppHeader />
    <main class="container mx-auto mt-4">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
