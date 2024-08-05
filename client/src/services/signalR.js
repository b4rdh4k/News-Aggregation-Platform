import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useNotificationsStore } from '@/store/notifications';

let connection = null;

export const startConnection = async () => {
  connection = new HubConnectionBuilder()
    .withUrl('https://your-api-endpoint/notifications')
    .configureLogging(LogLevel.Information)
    .build();

  connection.on('ReceiveNotification', (notification) => {
    const notificationsStore = useNotificationsStore();
    notificationsStore.addNotification(notification);
  });

  try {
    await connection.start();
    console.log('SignalR Connected.');
  } catch (err) {
    console.error('Error establishing SignalR connection:', err);
    setTimeout(startConnection, 5000); // Retry after 5 seconds
  }
};

export const stopConnection = async () => {
  if (connection) {
    await connection.stop();
    console.log('SignalR Disconnected.');
  }
};
