'use client'

import { PlayerList } from './PlayerList';
import { StartGameButton } from './StartGameButton';
import { RoomHeader } from './RoomHeader';
import { RoomProps } from '@/app/types';
import { useRoomSocket } from '@/app/hooks/useRoomSocket';

export default function Room({ onStartGame }: RoomProps) {
  const { players, startGame, roomId } = useRoomSocket(onStartGame);

  return (
    <div className='p-6 bg-white/10 rounded-xl'>
      <RoomHeader roomId={roomId} />
      <PlayerList players={players} />
      <StartGameButton onClick={startGame} />
    </div>
  );
}
