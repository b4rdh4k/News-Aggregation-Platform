// src/store/notifications.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([]);
  const newNotificationCount = ref(0);

  const addNotification = (notification) => {
    notifications.value.push(notification);
    newNotificationCount.value++;
  };

  const clearNotifications = () => {
    notifications.value = [];
    newNotificationCount.value = 0;
  };

  return {
    notifications,
    newNotificationCount,
    addNotification,
    clearNotifications
  };
});
