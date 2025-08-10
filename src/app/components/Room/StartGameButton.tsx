export function StartGameButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='mt-6 px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition'
    >
      🚀 Iniciar partida
    </button>
  );
}
