import { useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { ACK, RoomSummary } from '@/app/types';
import { v4 as uuidv4 } from 'uuid';


export function useLobbySocket(onJoinRoom: () => void ) {
  const [availableRooms, setAvailableRooms] = useState<RoomSummary[]>([]);
  const [inputRoom, setInputRoom] = useState('');

  useEffect(() => {
    const handleRoomsList = (rooms: RoomSummary[]) => {
      setAvailableRooms(rooms);
    };

    socket.on('roomsList', handleRoomsList);

    socket.emit('getRooms', {}, (ack: ACK & { rooms?: RoomSummary[] }) => {
      if (ack.ok && ack.rooms) setAvailableRooms(ack.rooms);
    });

    return () => {
      socket.off('roomsList', handleRoomsList);
    };
  }, []);

  const refreshRooms = () => {
    socket.emit('getRooms', {}, (ack: ACK & { rooms?: RoomSummary[] }) => {
      if (ack.ok && ack.rooms) setAvailableRooms(ack.rooms);
    });
  };

  const createRoom = () => {
    socket.emit('createRoom', (ack: ACK) => {
      if (!ack.ok) return alert(ack.error);
      console.log({ ack })
      setInputRoom(ack.roomId)
      onJoinRoom();
    });

  };
  
  

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', { roomId }, (ack: ACK) => {
      if (!ack.ok) return alert('Error al unirse a la sala');
      onJoinRoom();
    });
  };

  return {
    availableRooms,
    inputRoom,
    setInputRoom,
    refreshRooms,
    createRoom,
    joinRoom,
  };
}
