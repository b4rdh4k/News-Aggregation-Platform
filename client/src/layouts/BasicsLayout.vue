<script setup>
import BaseHeader from "@/components/common/BasicHeader.vue";
</script>

<template>
  <div>
    <BaseHeader />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>
