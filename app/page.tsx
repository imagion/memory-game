import GameBoard from '@/components/GameBoard';

export default function Home() {
  return (
    <div className='h-screen flex flex-col items-center justify-center p-4 bg-gray-50'>
      <h1 className='mb-6 text-2xl font-semibold'>Memory Game</h1>
      <GameBoard />
    </div>
  );
}
