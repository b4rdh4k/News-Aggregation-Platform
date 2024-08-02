import * as signalR from '@microsoft/signalr';
//import { useToast } from 'vue-toastification';

//const toast = useToast();

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_API_URL}/notificationHub`) 
  .withAutomaticReconnect()
  .build();

connection.on('ReceiveArticleNotification', (article) => {
  console.log('New article received:', article);
    //toast.success('New article received');
});

export function startConnection() {
  return connection.start()
    .then(() => console.log('SignalR connected'))
    .catch(err => console.error('SignalR connection error:', err));
}
