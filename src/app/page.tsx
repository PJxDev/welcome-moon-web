import Room from './components/Room';
import GameBoard from './components/GameBoard';
import { useState } from 'react';
import Lobby from './components/Lobby';

export default function HomePage() {
  const [view, setView] = useState<'lobby' | 'room' | 'game'>('lobby');

  return (
    <>
      {view === 'lobby' && <Lobby onJoinRoom={() => setView('room')} />}
      {view === 'room' && <Room onStartGame={() => setView('game')} />}
      {view === 'game' && <GameBoard />}
    </>
  );
}