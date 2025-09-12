'use client';

import { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import { CardType } from '@/types/card';
import { generateCards } from '@/lib/generateCards';

export default function GameBoard() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [first, setFirst] = useState<string | null>(null);
  const [second, setSecond] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);

  const isGameWon = useMemo(() => {
    return cards.length > 0 && cards.every((card) => card.isMatched);
  }, [cards]);

  useEffect(() => {
    setCards(generateCards());
    setIsLoading(false);
  }, []);

  const resetGame = () => {
    setMoves(0);
    setFirst(null);
    setSecond(null);
    setIsDisabled(false);
    // Небольшая задержка для плавности, чтобы игрок успел увидеть сброс
    setTimeout(() => setCards(generateCards()), 300);
  };

  const handleClick = (clickedCardId: string) => {
    const clickedCard = cards.find((c) => c.id === clickedCardId);
    if (
      isDisabled ||
      !clickedCard ||
      clickedCard.isFlipped ||
      clickedCard.isMatched
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((card) =>
        card.id === clickedCardId ? { ...card, isFlipped: true } : card,
      ),
    );

    if (first === null) {
      setFirst(clickedCardId);
    } else {
      setSecond(clickedCardId);
    }
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setIsDisabled(false);
  };

  // Обработка сравнения
  useEffect(() => {
    if (first && second) {
      setIsDisabled(true);
      setMoves((prev) => prev + 1);

      const cardOne = cards.find((c) => c.id === first);
      const cardTwo = cards.find((c) => c.id === second);

      // Если пара совпала (сравниваем по id пары, а не по value)
      if (cardOne && cardTwo && cardOne.pairId === cardTwo.pairId) {
        setCards((prev) =>
          prev.map((card) =>
            card.pairId === cardOne.pairId
              ? { ...card, isMatched: true }
              : card,
          ),
        );
        resetTurn();
      } else {
        // Если пара не совпала, переворачиваем обратно с задержкой
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first || card.id === second
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [second]); // eslint-disable-line react-hooks/exhaustive-deps -- этот эффект должен зависеть только от выбора второй карты

  if (isLoading) {
    return <div className='p-4 text-center text-lg'>Загрузка игры...</div>;
  }

  return (
    <div className='flex w-full flex-col items-center p-4'>
      <div className='mb-4 flex items-center justify-between gap-6'>
        <p className='mb-4 text-lg font-medium'>Ходы: {moves}</p>
        <button
          onClick={resetGame}
          className='mb-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700'>
          Новая игра
        </button>
      </div>

      <div className='grid w-full max-w-md grid-cols-4 gap-3'>
        {isGameWon && (
          <div className='absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-black/70 text-white'>
            <h2 className='text-4xl font-bold'>Победа!</h2>
            <p className='mt-2 text-lg'>Вы справились за {moves} ходов</p>
            <button
              onClick={resetGame}
              className='mt-4 rounded bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700'>
              Сыграть еще раз
            </button>
          </div>
        )}
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}
