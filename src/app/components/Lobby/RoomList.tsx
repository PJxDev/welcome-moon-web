import { RoomSummary } from "@/app/types";

interface RoomListProps { availableRooms: RoomSummary[]; refreshRooms: () => void; onJoinRoom: (roomId: string) => void; }

export default function RoomList({ availableRooms, refreshRooms, onJoinRoom }: RoomListProps) {
  return (
    <section className= 'mt-8 text-white' >
      <div className='flex items-center justify-between mb-4' >
        <h2 className='text-xl font-bold' >🎮 Salas disponibles </h2>
        <button onClick = { refreshRooms } className = 'px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition text-sm' > 🔄 Refrescar </button>
      </div >
      {availableRooms.length === 0 ? (
        <p>No hay salas activas por ahora.</p > 
      ) : (
        <ul className= 'space-y-2' >
          {availableRooms.map(({ roomId, state, playerCount }) => (
            <li key= { roomId } className = 'flex justify-between items-center bg-white/10 p - 4 rounded - xl' >
              <div>
                <div className='font - semibold' > Sala ID: { roomId } </div>
                <div className='text - sm text - white / 70' > Jugadores: {playerCount} · Estado: {state === 'waiting' ? 'Esperando' : state === 'in_progress' ? 'En curso' : 'Finalizada'} </div>
              </div>
            <button onClick = { () => onJoinRoom(roomId)} className = 'px - 4 py - 2 bg - green - 500 rounded - full hover: bg - green - 600 transition' > Unirse </button>
            </li>
          ))}
          </ul>
      )}
    </section > 
  );
}