<template>
  <div class="container mx-auto p-4">
    <div class="bg-background dark:bg-dark-background p-6 rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
      <div v-if="user" class="flex items-center space-x-4 mb-4">
        <img
          :src="userIcon"
          alt="User Icon"
          class="w-24 h-24 rounded-full border-2 border-primary dark:border-dark-primary"
        />
        <div>
          <h3 class="text-xl font-semibold">{{ user.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
        </div>
      </div>
      <div v-if="user">
        <h4 class="text-lg font-semibold mb-2">Account Details</h4>
        <ul>
          <li>
            <strong>Username:</strong> {{ user.username }}
          </li>
          <li>
            <strong>Email:</strong> {{ user.email }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
      <div class="mt-6">
        <button @click="handleLogout" class="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { useToast } from 'vue-toastification';
import router from '@/router';

const userStore = useUserStore();
const toast = useToast();

const user = computed(() => userStore.user);
const userIcon = '@/assets/media/user-icon.svg';

const handleLogout = async () => {
  await userStore.logout();
  toast.success('Logout successful!');
  router.push('/');
};

onMounted(async () => {
  console.log('Fetching user info...');
  await userStore.getUserInfo();
  console.log('User info:', user.value);
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
