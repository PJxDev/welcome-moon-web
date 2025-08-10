import { io } from 'socket.io-client';

// reemplaza con tu URL real de Railway
// const socket = io('https://welcome-moon-back-production.up.railway.app', {
//   // Esto puede evitar el polling si prefieres WebSocket directo
//   // transports: ['websocket'], 
// });

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  autoConnect: true,
  transports: ['websocket'],
});

export default socket;
