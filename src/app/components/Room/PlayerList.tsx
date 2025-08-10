import { Player } from '@/app/types';

export function PlayerList({ players }: { players: Player[] }) {
  return (
    <ul className='space-y-2'>
      {players.map((p) => (
        <li key={p.id} className='flex justify-between items-center bg-white/5 p-3 rounded'>
          <span>{p.name}</span>
          <span className={`text-sm ${p.connected ? 'text-green-400' : 'text-red-400'}`}>
            {p.connected ? 'Conectado' : 'Desconectado'}
          </span>
        </li>
      ))}
    </ul>
  );
}
