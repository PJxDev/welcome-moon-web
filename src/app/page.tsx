'use client';

import { useEffect } from 'react';
import socket from '@/lib/socket';

export default function HomePage() {
  useEffect(() => {
    socket.emit('mensaje', 'Hola desde Next.js');

    socket.on('respuesta', (msg) => {
      console.log('Respuesta del servidor:', msg);
    });

    return () => {
      // Limpieza al desmontar componente
      socket.off('respuesta');
    };
  }, []);

  return (
    <main>
      <h1>🧠 Conectado a Socket.io</h1>
    </main>
  );
}