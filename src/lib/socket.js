import { io } from 'socket.io-client';

// reemplaza con tu URL real de Railway
const socket = io('https://welcome-moon-back-production.up.railway.app');

export default socket;
