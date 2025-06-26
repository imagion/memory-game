'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import { CardType } from '@/types/card';
import { shuffleArray } from '@/lib/shuffle';

export default function GameBoard() {
  // Шаг 1: генерируем и перемешиваем пары
  const initialCards: CardType[] = shuffleArray(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      value: ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🍉', '🍍'][i],
      isFlipped: false,
      isMatched: false,
    })).flatMap((card) => [{ ...card }, { ...card }]), // дублируем
  );

  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  // Шаг 2: обработка сравнения
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
        }, 1000);
      }

      setMoves((m) => m + 1);
    }
  }, [second]);

  function handleClick(idx: number) {
    if (disabled) return;
    if (cards[idx].isFlipped || cards[idx].isMatched) return; // предотвращаем клик  на уже открытые или найденные пары

    setCards((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, isFlipped: true } : c)),
    );
    first === null ? setFirst(idx) : setSecond(idx);
  }

  function resetTurn() {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  }

  // Шаг 3: рендер
  return (
    <div className='flex flex-col items-center'>
      <p className='mb-4 text-lg'>Moves: {moves}</p>
      <div
        className='
        grid grid-cols-4 gap-2
        w-full max-w-lg
      '>
        {cards.map((card, i) => (
          <Card key={i} card={card} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}
