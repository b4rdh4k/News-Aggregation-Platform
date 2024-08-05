<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useSearchStore } from '@/store/search';
import { useUserStore } from '@/store/user';
import ThemeToggle from '@/components/shared/Interactions/ThemeToggle.vue';
import TabsHeader from '@/components/shared/Navigation/TabsHeader.vue';
import router from '@/router';
import { useToast } from 'vue-toastification';
import { startConnection , stopConnection} from '@/services/signalR';
import { useNotificationsStore } from '@/store/notifications';


const searchStore = useSearchStore();
const userStore = useUserStore();
const showSearch = ref(false);
const searchQuery = ref('');
const isLoggedIn = computed(() => !!userStore.token);
const searchInputRef = ref(null);
const searchInputRefSmall = ref(null);
const toast = useToast();
const showNotifications = ref(false);
const notificationsStore = useNotificationsStore();

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  nextTick(() => {
    if (showSearch.value) {
      if (window.innerWidth < 1024) {
        searchInputRefSmall.value?.focus();
      } else {
        searchInputRef.value?.focus();
      }
    }
  });
};

const performSearch = () => {
  if (searchQuery.value) {
    searchStore.search(searchQuery.value);
  }
};


const handleKeydown = (event) => {
  if (event.key === '/') {
    event.preventDefault();
    toggleSearch();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  if (userStore.token) {
    startConnection();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (userStore.token) {
    stopConnection();
  }
});

watch(searchQuery, (newValue) => {
  if (newValue) {
    performSearch();
    console.log('Search results:', searchStore.searchResults);
  }
});

const handleResultClick = (id) => {
  console.log('Navigating to:', id);
  router.push(`/news/${id}`).then(() => {
    showSearch.value = false;
  });
};

const redirectToProfileOrAdmin = () => {
  const userRole = userStore.decodedToken?.role?.toLowerCase();
  console.log('User Role:', userRole);

  if (userRole === 'admin' || userRole === 'premium') {
    router.push('/admin');
  } else {
    router.push('/profile');
  }
};
</script>

<template>
  <header class="bg-background dark:bg-dark-background text-text dark:text-dark-text pb-0 sticky top-0 shadow-md z-10">
    <div class="container mx-auto flex flex-wrap justify-around items-center p-4">
      <router-link to="/" class="h-12 flex-shrink-0">
        <img src="@/assets/media/Sapientia-Logo.png" alt="Logo" class="h-full cursor-pointer" />
      </router-link>
      <div class="hidden lg:block relative">
        <input
          type="text"
          v-model="searchQuery"
          @keydown.enter="performSearch"
          placeholder="Search for topics, locations & sources"
          ref="searchInputRef"
          class="p-2 min-w-96 rounded bg-primary dark:bg-dark-primary text-text placeholder-text dark:placeholder-dark-text outline-none dark:text-dark-text"
        />
        <div
          v-if="searchQuery && searchStore.searchResults.length"
          class="absolute z-20 bg-background dark:bg-dark-background shadow-lg rounded mt-1 w-full max-h-60 overflow-y-auto"
        >
          <ul>
            <li
              v-for="result in searchStore.searchResults"
              :key="result.id"
              class="p-2 hover:bg-secondary dark:hover:bg-dark-secondary cursor-pointer"
            >
              <router-link :to="`/news/${result.id}`" class="block">
                {{ result.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          @click="toggleSearch"
          class="w-6 h-6 ml-4 cursor-pointer lg:hidden"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m-3.15 1.85a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9z"
          />
        </svg>
  <div v-if="isLoggedIn" class="flex flex-row">
    <img
      src="@/assets/media/user-icon.svg"
      class="max-h-8 max-w-8 cursor-pointer"
      alt="User Icon"
      @click="redirectToProfileOrAdmin"
    />
    <!-- Notifications Button -->
    <button @click="toggleNotifications" class="relative">
      <img
        src="@/assets/15782384.png"
        class="w-10 h-10 cursor-pointer"
        alt="Notifications Icon"
      />
      <!-- Notifications Dropdown -->
      <div
        v-show="showNotifications"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-background border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20"
      >
        <div class="p-2">
          <p
            v-for="(notification, index) in notificationsStore.notifications"
            :key="index"
            class="text-gray-800 dark:text-gray-200"
          >
            {{ notification.message }}
          </p>
          <p v-if="notificationsStore.notifications.length === 0" class="text-gray-800 dark:text-gray-200">
            No new notifications
          </p>
        </div>
      </div>
    </button>
  </div>
        <div>
          <div v-if="!isLoggedIn">
            <router-link
              to="/login"
              class="login-button block w-full border-b-[1px] border-accent dark:border-dark-accent px-4 py-2 text-left hover:bg-primary hover:rounded-t-md dark:hover:bg-dark-primary"
            >
              Login
            </router-link>
          </div>
          <div v-if="isLoggedIn" class="flex flex-row">
            <img
              src="@/assets/media/user-icon.svg"
              class="max-h-8 max-w-8 cursor-pointer"
              alt="User Icon"
              @click="redirectToProfileOrAdmin"
            />
          </div>
        </div>
        <ThemeToggle class="md:block" />
      </div>
    </div>
    <div v-if="showSearch" class="relative lg:hidden mt-4 mx-2">
      <input
        type="text"
        v-model="searchQuery"
        @keydown.enter="performSearch"
        placeholder="Search for topics, locations & sources"
        ref="searchInputRefSmall"
        class="p-2 rounded bg-primary dark:bg-dark-primary w-full"
      />
      <div
        v-if="searchQuery && searchStore.searchResults.length"
        class="absolute z-20 bg-background dark:bg-dark-background shadow-lg rounded mt-1 w-full max-h-60 overflow-y-auto"
      >
        <ul>
          <li
            v-for="result in searchStore.searchResults"
            :key="result.id"
            @click="() => handleResultClick(result.id)"
            class="p-2 hover:bg-secondary dark:hover:bg-dark-secondary cursor-pointer"
          >
            <router-link :to="`/news/${result.id}`">
              {{ result.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <TabsHeader />
  </header>
</template>

<style>
button.relative {
  position: relative;
}

button.relative .absolute {
  display: none;
}

button.relative:hover .absolute {
  display: block;
}
</style>
