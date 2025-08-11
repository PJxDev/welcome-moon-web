import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// genera algo como 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
const roomId = uuidv4();

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  autoConnect: true,
  transports: ['websocket'],
  query: {
    roomId,
    playerId: 'xyz',
    name: 'User44565',
  },
});

export default socket;
