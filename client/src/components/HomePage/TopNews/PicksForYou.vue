<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const picksForYou = ref([
  {
    id: 1,
    source: "New York Times",
    title: "Dead Online Shooter Refunds DrDisrespect Skins In The Worst Way",
    time: "23 hours ago",
  },
  {
    id: 2,
    source: "The Guardian",
    title: "Netflix’s next live event is a Joe Rogan comedy special",
    time: "1 hour ago",
  },
  {
    id: 3,
    source: "The Washington Post",
    title: "The 2022 NFL Draft is coming to Las Vegas",
    time: "2 hours ago",
  },
  {
    id: 4,
    source: "The Wall Street Journal",
    title: "The 2022 NFL Draft is coming to Las Vegas",
    time: "2 hours ago",
  },
]);

const goToNewsView = (pick) => {
  router.push({ name: "News", params: { id: pick.id } });
};
</script>

<template>
  <div
    class="bg-primary dark:bg-dark-primary rounded-lg p-2 ml-0 sm:ml-0 lg:ml-3 xl:ml-3 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-2"
  >
    <div
      v-for="(pick, index) in picksForYou"
      :key="pick.id"
      class="mb-1 cursor-pointer mr-1"
      @click="goToNewsView(pick)"
    >
      <router-link :to="`/source/${pick.source}`" class="mb-2" @click.stop>
        <p
          class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-secondary dark:hover:text-dark-secondary"
        >
          {{ pick.source }}
        </p>
      </router-link>
      <h4 class="text-lg lg:text-xl xl:text-xl">{{ pick.title }}</h4>
      <p class="text-text dark:text-dark-text text-sm mt-1">
        {{ pick.time }}
      </p>
      <hr
        v-if="index < picksForYou.length - 1"
        class="border-b mt-4 border-secondary dark:border-dark-secondary"
      />
    </div>
  </div>
</template>
