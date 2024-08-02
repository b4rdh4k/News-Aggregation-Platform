<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (tab) => {
  return route.name === tab
}
</script>

<template>
  <div
    class="flex flex-wrap text-base text-secondary dark:text-dark-secondary lg:text-xl xl:text-xl 2xl:text-xl mt-2"
  >
    <router-link :to="{ name: 'Home' }" class="tab-button tabs-home" :class="{ active: isActive('Home') }">
      <h6 class="font-semibold">Home</h6>
    </router-link>
    <router-link
      :to="{ name: 'ForYou' }"
      class="tab-button tabs-foryou"
      :class="{ active: isActive('ForYou') }"
    >
      <h6>Personal</h6>
    </router-link>
    <router-link
      :to="{ name: 'Categories' }"
      class="tab-button tabs-categories"
      :class="{ active: isActive('Categories') }"
    >
      <h6>Categories</h6>
    </router-link>
  </div>
</template>

<style scoped>
.tab-button {
  flex: 1;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.tab-button::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px;
  background-color: var(--accent);
  transform: translateX(-101%);
  transition: transform 0.3s ease-in;
}

.tab-button.active::after {
  transform: translateX(0);
}

.tab-button.active {
  color: var(--accent);
  font-weight: bolder;
}

@media (min-width: 640px) {
  .tab-button {
    padding: 12px;
  }
}

@media (min-width: 768px) {
  .tab-button {
    padding: 14px;
  }
}

@media (min-width: 1024px) {
  .tab-button {
    padding: 16px;
  }
}
</style>
