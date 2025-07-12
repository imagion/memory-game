'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import { CardType } from '@/types/card';
import { shuffleArray } from '@/lib/shuffle';

export default function GameBoard() {
  // Генерируем и перемешиваем пары
  const generate = () =>
    shuffleArray(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        value: ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🍉', '🍍'][i],
        isFlipped: false,
        isMatched: false,
      })).flatMap((card) => [{ ...card }, { ...card }]),
    );

  const [cards, setCards] = useState<CardType[]>(generate());
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  // Сброс игры
  const resetGame = () => {
    setCards(generate());
    setMoves(0);
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  // Обработка сравнения
  useEffect(() => {
    if (first !== null && second !== null) {
      if (first === second) {
        setCards((prev) =>
          prev.map((c, i) => (i === first ? { ...c, isFlipped: false } : c)),
        );
        resetTurn();
        return;
      }

      setDisabled(true);
      const [c1, c2] = [cards[first], cards[second]];

      if (c1.value === c2.value) {
        setCards((prev) =>
          prev.map((c, idx) =>
            idx === first || idx === second ? { ...c, isMatched: true } : c,
          ),
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === first || idx === second ? { ...c, isFlipped: false } : c,
            ),
          );
          resetTurn();
        }, 800);
      }

      setMoves((m) => m + 1);
    }
  }, [second]);

  const handleClick = (idx: number) => {
    if (disabled) return;
    if (cards[idx].isFlipped || cards[idx].isMatched) return; // предотвращаем клик  на уже открытые или найденные пары

    setCards((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, isFlipped: true } : c)),
    );
    first === null ? setFirst(idx) : setSecond(idx);
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  return (
    <div className='flex w-full flex-col items-center p-4'>
      <button
        onClick={resetGame}
        className='mb-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
        New Game
      </button>
      <div className='grid w-full max-w-md grid-cols-4 gap-3'>
        {cards.map((card, i) => (
          <Card key={i} card={card} onClick={() => handleClick(i)} />
        ))}
      </div>
      <p className='mb-4 text-lg font-medium'>Ходы: {moves}</p>
    </div>
  );
}
