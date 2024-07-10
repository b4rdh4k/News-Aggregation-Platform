<template>
    <div>
      <BaseHeader />
      <main class="container">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import BaseHeader from '@/components/common/BasicHeader.vue';
  
  export default {
    name: 'MainLayout',
    components: {
        BaseHeader,
    },
  };
  </script>

  