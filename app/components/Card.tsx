'use client';

import { cn } from '@/lib/cn';
import { CardType } from '@/types/card';

interface Props {
  card: CardType;
  onClick: () => void;
}

export default function Card({ card, onClick }: Props) {
  const { isFlipped, isMatched, value } = card;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const lightPatternUrl = `${basePath}/pattern.svg`;
  const darkPatternUrl = `${basePath}/pattern-dark.svg`;

  return (
    <div
      onClick={onClick}
      className={cn('aspect-square w-full perspective-[1000px]')}>
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-500 transform-3d',
          isFlipped || isMatched ? 'rotate-y-180' : '',
        )}>
        {/* Лицевая сторона */}
        <div className='absolute inset-0 flex rotate-y-180 items-center justify-center rounded border-2 border-gray-300 bg-white text-2xl font-bold shadow-md backface-hidden dark:border-zinc-600 dark:bg-neutral-300'>
          {value}
        </div>

        {/* Рубашка */}
        <div
          className='absolute inset-0 flex items-center justify-center rounded border-2 border-gray-300 bg-[image:var(--bg-pattern-light)] bg-[length:50%_50%] bg-repeat text-transparent shadow-md backface-hidden dark:border-zinc-600 dark:bg-blue-400 dark:bg-[image:var(--bg-pattern-dark)]'
          style={
            {
              '--bg-pattern-light': `url(${lightPatternUrl})`,
              '--bg-pattern-dark': `url(${darkPatternUrl})`,
            } as React.CSSProperties
          }></div>
      </div>
    </div>
  );
}
