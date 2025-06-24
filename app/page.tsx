import Card from '@/components/Card';

export default function Home() {
  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-8 p-8 font-(family-name:--font-geist-sans)'>
      <header className='h-16 flex items-center justify-center'>
        <button className='cursor-pointer rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
          Start Game
        </button>
      </header>
      <main className=' items-center grid grid-cols-4 gap-2 w-full max-w-screen-md'>
        {Array(16)
          .fill(null)
          .map((_, i) => (
            <Card key={i} />
          ))}
      </main>
      <footer className='h-16 flex items-center justify-center'>
        Score: 0
      </footer>
    </div>
  );
}
