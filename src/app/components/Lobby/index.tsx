'use client'

import { ChangeEventHandler, FormEventHandler } from 'react'
import { LobbyProps } from '@/app/types'
import RoomForm from './RoomForm';
import RoomList from './RoomList'
import { useLobbySocket } from '@/app/hooks/useLobbySocket'


export default function Lobby({ onJoinRoom }: LobbyProps) {

  const {
    availableRooms,
    inputRoom,
    setInputRoom,
    refreshRooms,
    createRoom,
    joinRoom,
  } = useLobbySocket(onJoinRoom);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target
    setInputRoom(value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!inputRoom.trim()) {
      alert('Por favor, ingresa un nombre de sala');
      return;
    }
    joinRoom(inputRoom)
  }

  return (
    <main className= 'flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-900' >
      <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-10 space-y-8 max-w-md w-full text-center text-white shadow-2xl' >
        <h1 className='text-3xl font-extrabold mb-4' > ¡Bienvenido a la partida!</h1>
        <button
          onClick={createRoom}
          className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl'
          title="Crear una nueva sala">
          Crear Sala
        </button>
        <RoomForm inputRoom = { inputRoom } handleChange = { handleChange } handleSubmit = { handleSubmit }/>
      </div>
      <RoomList availableRooms = { availableRooms } refreshRooms = { refreshRooms } onJoinRoom = { joinRoom } />
    </main> 
  )
}