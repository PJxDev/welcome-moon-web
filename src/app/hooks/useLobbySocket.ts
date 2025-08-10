import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { ACK, RoomSummary } from '@/app/types';

export function useLobbySocket(onJoinRoom: (roomId?: string) => void) {
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
    // genera algo como 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
    const roomId = uuidv4();
    
    socket.emit('createRoom', {roomId}, (ack: ACK & { roomId?: string }) => {
      if (!ack.ok) return alert(ack.error);
      onJoinRoom(ack.roomId);
    });
  };

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', { roomId }, (ack: ACK) => {
      if (!ack.ok) return alert('Error al unirse a la sala');
      onJoinRoom(roomId);
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
