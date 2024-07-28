<script setup>
import ThemeToggle from "@/components/shared/Interactions/ThemeToggle.vue";
</script>

<template>
  <div>
    <header class="bg-background dark:bg-dark-background text-text dark:text-dark-text p-4 m-0">
      <div class="container mx-auto flex justify-between">
        <router-link to="/" class="h-12 flex-shrink-0">
          <img src="@/assets/media/Sapientia-Logo.png" alt="Logo" class="h-full cursor-pointer" />
        </router-link>

        <div class="flex items-center space-x-4">
          <ThemeToggle class="md:block" />
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
