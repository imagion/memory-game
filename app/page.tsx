import GameBoard from '@/components/GameBoard';

export default function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-50 p-4 dark:bg-neutral-600'>
      <h1 className='mb-6 text-2xl font-semibold'>Memory Game</h1>
      <GameBoard />
    </div>
  );
}
