<script setup>
import AppHeader from "../components/shared/Navigation/AppHeader.vue";
import AppFooter from "../components/shared/Navigation/AppFooter.vue";
import AdsComponent from "../components/shared/AdsAside.vue";
</script>

<template>
  <div>
    <AppHeader />
    <div class="container mx-auto mt-4 flex flex-col lg:flex-row">
      <main class="flex-1 w-full lg:w-5/6 xl:w-5/6 2xl:w-5/6">
        <router-view />
      </main>
      <AdsComponent class="w-full lg:w-1/6 xl:w-1/6 2xl:w-1/6" />
    </div>
    <AppFooter />
  </div>
</template>

