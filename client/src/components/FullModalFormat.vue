<script setup>
import { defineEmits } from 'vue';
defineEmits(['closeModal']);
</script>
<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-text bg-opacity-90">
      <div class="bg-background rounded-lg shadow-lg w-full">
        <button class="absolute top-4 right-4 rounded-md bg-dark-background dark:bg-background dark:text-dark-accent py-2 px-4 text-accent hover:text-secondary" @click="$emit('close')">&times;</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <style scoped>
  </style>
  