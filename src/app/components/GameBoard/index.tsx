import { ACK, Board, Pile, PlayerState, PublicState } from '@/app/types'
import socket from '@/lib/socket'
import Image from 'next/image'
import { useEffect, useState } from 'react'


const iconsPile = {
  astronaut: '👩🏽‍🚀',
  water: '💧',
  robot: '🤖',
  calendar: '📅',
  lightning: '⚡',
  plant: '🌱',
  wildcard: '📀'
}

export default function GameBoard() {
  const [round, setRound] = useState(0)
  const [piles, setPiles] = useState<Pile[]>([])
  const [board, setBoard] = useState<Board>()
  const [selectedCell, setSelectedCell] = useState<{
    roomIndex: number
    cellIndex: number
  } | null>(null)
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

    return () => {
      socket.off('newRound')
      socket.off('state')
    }
  }, [])

  const selectPile = (pileIndex: number) => {
      if (!selectedCell) return alert('Selecciona una celda primero')
      socket.emit(
        'submitChoice',
        { pileIndex, target: selectedCell },
        (ack: ACK) => {
          if (!ack.ok) alert('Error al enviar elección')
        }
      )
    }
  
  return (
    <main style={{ padding: 20 }}>
      <h1>🚀 Ronda {round}</h1>
      <div className='flex'>
        <section>
          <Image src='/img/boards/1.png' alt='' width={800} height={600} />
        </section>

        <section style={{ marginTop: 40 }}>
          <h2>🃏 Pilas disponibles</h2>
          <div className='flex flex-col'>
            {piles.map((pile: Pile, index: number) => (
              <div
                key={index}
                style={{ border: '1px solid #ccc', padding: 10 }}
              >
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
}