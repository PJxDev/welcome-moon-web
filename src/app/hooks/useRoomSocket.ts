import { useEffect, useState } from 'react';
import socket from '@/lib/socket';
import { ACK, Player } from '@/app/types';

export function useRoomSocket(onStartGame: () => void) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    socket.on('requestState', (ack) => {
      if (!ack.ok) return alert(ack.error)
      const { state } = ack
      console.log({ack})
      setPlayers(state.players);
      setRoomId(state.roomId);
    });

    socket.on('playerJoined', ({ playerId, name }) => {
      setPlayers((prev) => [...prev, { id: playerId, name, connected: true }]);
    });

    socket.on('playerDisconnected', ({ playerId }) => {
      setPlayers((prev) =>
        prev.map((p) => (p.id === playerId ? { ...p, connected: false } : p))
      );
    });

    return () => {
      socket.off('requestState');
      socket.off('playerJoined');
      socket.off('playerDisconnected');
    };
  }, [roomId]);

  const startGame = () => {
    socket.emit('startGame', (ack: ACK) => {
      if (!ack.ok) return alert('Error al iniciar el juego');
      console.log('Se inició el juego');
      onStartGame();
    });
  };

  return { players, startGame, roomId };
}
