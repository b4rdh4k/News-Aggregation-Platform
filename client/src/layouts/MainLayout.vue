<script setup>
import AppHeader from "../components/common/AppHeader.vue";
import AppFooter from "../components/common/AppFooter.vue";
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
