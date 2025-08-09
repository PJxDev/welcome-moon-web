'use client';

import { useEffect, useState } from "react"
import Image from 'next/image'
import socket from '@/lib/socket';

type Icon =
  | 'astronaut'
  | 'water'
  | 'robot'
  | 'calendar'
  | 'lightning'
  | 'plant'
  | 'wildcard'
type IconForPile = Exclude<Icon, 'wildcard'>
type Pile = { number: number; icon: IconForPile }

type Reward =
  | { type: 'rocket'; amount: number; active?: boolean }
  | { type: 'rocket:conditional'; amount: number; active: boolean }
  | { type: 'arrow' }
  | { type: 'cross' }
  | { type: 'incident'; id: string } // incidencias tienen un identificador para no repetirse

type Cell = {
  filled: boolean
  value?: number // número de la carta pintada (si aplica)
}

type Room = {
  cells: Cell[]
  completed: boolean
  rewards: Reward[]
}

type Board = {
  rooms: Room[] // Todas las habitaciones en orden de arriba a abajo
}

type PlayerState = {
  id: string
  name: string
  socketId: string
  connected: boolean
  board: Board
  rockets: number
  incidences: string[]
  incidentsFired: Set<string> // para saber si ya recibió la incidencia
  hasChosen: boolean
  score: number // puntos (derivados del total de cohetes)
}

type PublicState = {
  roomId: string
  state: 'waiting' | 'in_progress' | 'ended'
  round: number
  piles: Pile[]
  players: PlayerState[]
}


type ACK = { ok: boolean, error: string }


const iconsPile = {
  astronaut: '👩🏽‍🚀',
  water: '💧',
  robot: '🤖',
  calendar: '📅',
  lightning: '⚡',
  plant: '🌱',
  wildcard: '📀',
}

export default function HomePage() {

  const [round, setRound] = useState(0)
  const [piles, setPiles] = useState<Pile[]>([])
  const [board, setBoard] = useState<Board>()
  const [selectedCell, setSelectedCell] = useState<{ roomIndex: number; cellIndex: number } | null>(null)
  const [gameState, setGameState] = useState<PublicState | null>(null)
  
  useEffect(() => {
    socket.on('newRound', ({ round, piles }) => {
      setRound(round)
      setPiles(piles)
      setSelectedCell(null)
    })

    socket.on('state', (state) => {
      setGameState(state)
      const me = state.players.find((p: PlayerState) => p.id === socket.id)
      if (me) setBoard(me.board)
    })
    
    // socket.emit('joinGame') // o el evento que uses para entrar

    return () => {
      socket.off("newRound")
      socket.off("state")
    }
  }, [])
  
  const selectPile = (pileIndex: number) => {
    if (!selectedCell) return alert('Selecciona una celda primero')
    socket.emit('submitChoice', { pileIndex, target: selectedCell }, (ack: ACK) => {
      if (!ack.ok) alert('Error al enviar elección')
    })
  }
  const startGame = () => {
    socket.emit('startGame', (ack: ACK) => {
      if (!ack.ok) alert('Error al enviar elección')
      console.log('Se inicio el juego')
    })
  }

  // (gameState && gameState.state === 'in_progress') ?
  return (
    (true) ?
    (<main style={{ padding: 20 }}>
      <h1>🚀 Ronda {round}</h1>
      
      <div className="flex">
        <section>
            <Image src="/img/boards/1.png" alt="" width={800} height={600} />
        </section>

        <section style={{ marginTop: 40 }}>
          <h2>🃏 Pilas disponibles</h2>
          <div className="flex flex-col">
            {piles.map((pile: Pile, index: number) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: 10 }}>
                <p>Número: {pile.number}</p>
                <p>Icono: {iconsPile[pile.icon]}</p>
                <button onClick={() => selectPile(index)}>Elegir esta</button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2>📊 Estado del juego</h2>
          {gameState?.players?.map((p: PlayerState) => (
            <div key={p.id}>
              {p.name} — {p.hasChosen ? '✅ Ya eligió' : '⏳ Esperando'}
            </div>
          ))}
        </section>
      </div>
    </main>
    )
    : (
      <main>
        <button onClick={() => startGame()}>Iniciar Partida</button>
      </main>
    )
  )
}