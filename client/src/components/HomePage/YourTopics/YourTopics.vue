<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import TopicModal from './TopicModal.vue';
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  router.push('/');
};

const router = useRouter()

const categories = reactive([
  {
    title: 'U.S.',
    items: [
      {
        id: 1,
        source: 'BBC',
        title: 'Gaza war: US says floating aid pier to shut down soon',
        time: '4 hours ago',
        authors: 'Paul Adams'
      },
      {
        id: 2,
        source: 'CNBC',
        title:
          "10 states with America's worst infrastructure, and most to gain from billions in federal dollars",
        time: '7 hours ago',
        authors: 'Scott Cohn'
      },
      {
        id: 3,
        source: 'Al Jazeera',
        title: 'Russia says US missiles in Germany signal return of Cold War',
        time: '3 hours ago',
        authors: 'Author Name'
      }
    ]
  },
  {
    title: 'Entertainment',
    items: [
      {
        id: 4,
        source: 'The Washington Post',
        title: 'Shelley Duvall, a beguiling face of 1970s film, dies at 75',
        time: '47 minutes ago',
        authors: 'Harrison Smith'
      },
      {
        id: 5,
        source: 'AP',
        title:
          'Alec Baldwin’s lawyer grills crime scene tech over search for live ammo at his shooting trial',
        time: '1 hour ago',
        authors: 'Morgan Lee & Andrew D. Dalton'
      },
      {
        id: 6,
        source: 'Rolling Stone',
        title: 'We Had Breakfast With Hawk Tuah Girl, the National Hero We Need',
        time: '8 hours ago',
        authors: 'Joseph Hudak'
      }
    ]
  },
  {
    title: 'Sports',
    items: [
      {
        id: 7,
        source: 'ESPN',
        title: "Skenes throws 7 no-hit IP, K's 11 in Pirates' win",
        time: '2 hours ago',
        authors: 'Author Name'
      },
      {
        id: 8,
        source: 'The Washington Post',
        title: 'Thanks, Obama: USA Basketball survives rust, roster drama in exhibition win',
        time: '2 minutes ago',
        authors: 'Ben Golliver'
      },
      {
        id: 9,
        source: 'Author Name',
        title: 'Former NFL defensive coordinator Monte Kiffin has died',
        time: '1 hour ago',
        authors: 'Charean Williams'
      }
    ]
  },
  {
    title: 'Technology',
    items: [
      {
        id: 10,
        source: 'The Wall Street Journal',
        title: 'The 2022 NFL Draft is coming to Las Vegas',
        time: '2 hours ago',
        authors: 'Author D'
      },
      {
        id: 11,
        source: 'The Washington Post',
        title: 'The 2022 NFL Draft is coming to Las Vegas',
        time: '2 hours ago',
        authors: 'Author C'
      },
      {
        id: 12,
        source: 'The Guardian',
        title: 'The 2022 NFL Draft is coming to Las Vegas',
        time: '2 hours ago',
        authors: 'Author B'
      }
    ]
  },
  {
    title: 'Business',
    items: [
      {
        id: 13,
        source: 'The Wall Street Journal',
        title: 'The 2022 NFL Draft is coming to Las Vegas',
        time: '2 hours ago',
        authors: 'Author D'
      },
      {
        id: 14,
        source: 'The Washington Post',
        title: 'The 2022 NFL Draft is coming to Las Vegas',
        time: '2 hours ago',
        authors: 'Author C'
      },
      {
        id: 15,
        source: 'The Guardian',
        title: 'The 2022 NFL Draft is coming to Las Vegas',
        time: '2 hours ago',
        authors: 'Author B'
      }
    ]
  }
])

const goToNewsView = (story) => {
  if (story && story.id) {
    router.push({ name: 'News', params: { id: story.id } })
  } else {
    console.error('Missing story ID')
  }
}

</script>
<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl text-accent dark:text-dark-accent font-bold">Your topics</h1>
      <div class="relative">
        <button @click="openModal" class="text-primary">Open Modal</button>

        <TopicModal v-if="isModalOpen" @closeModal="closeModal"/>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="category in categories"
        :key="category.title"
        class="p-4 rounded-lg shadow-md"
      >
        <router-link :to="`/category/${category.title}`" class="mb-2" @click.stop>
          <button
            class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent px-2 rounded-xl"
          >
            <p class="text-text dark:text-dark-text">{{ category.title }}</p>
          </button>
        </router-link>
        <ul>
          <li
            v-for="(item, index) in category.items"
            :key="item.id"
            class="mb-4 mt-4 cursor-pointer"
            @click="goToNewsView(item)"
          >
            <router-link :to="`/source/${item.source}`" class="mb-2" @click.stop>
              <p
                class="text-accent dark:text-dark-accent italic font-serif cursor-pointer hover:text-secondary dark:hover:text-dark-secondary"
              >
                {{ item.source }}
              </p>
            </router-link>
            <h6 class="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {{ item.title }}
            </h6>
            <p class="text-text dark:text-dark-text">{{ item.time }} | {{ item.authors }}</p>
            <hr v-if="index < category.items.length - 1" class="border-b mt-4 border-secondary dark:border-dark-secondary" />
          </li>
        </ul>
      </div>
    </div>
  </div>'
</template>
