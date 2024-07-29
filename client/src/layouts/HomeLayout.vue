<script setup>
import AppHeader from "../components/shared/Navigation/AppHeader.vue";
import AppFooter from "../components/shared/Navigation/AppFooter.vue";
</script>

<template>
  <div>
    <AppHeader />
    <div class="mx-auto mt-4">
      <main class="flex-1">
        <router-view />
        
      </main>
    </div>
    <AppFooter />
  </div>
</template>

