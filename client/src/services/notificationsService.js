import * as signalR from '@microsoft/signalr';
import { useToast } from 'vue-toastification';
import { useNotificationsStore } from '@/store/notifications';

const notificationsStore = useNotificationsStore();
const toast = useToast();

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_API_URL}/notificationHub`) 
  .withAutomaticReconnect()
  .build();

connection.on('ReceiveArticleNotification', (article) => {
  console.log('New article received:', article);
  notificationsStore.addNotification(article);
  toast.success('New article received');
});

export function startConnection() {
  return connection.start()
    .then(() => console.log('SignalR connected'))
    .catch(err => console.error('SignalR connection error:', err));
}

export function stopConnection() {
  return connection.stop()
    .then(() => console.log('SignalR disconnected'))
    .catch(err => console.error('SignalR disconnection error:', err));
}
