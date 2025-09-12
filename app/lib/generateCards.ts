import { CardType } from '@/types/card';
import { shuffleArray } from '@/lib/shuffleArray';

const EMOJIS = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🍉', '🍍'];

/**
 * Генерирует и перемешивает массив карт для новой игры.
 * @returns {CardType[]} Массив из 16 перемешанных карт.
 */
export const generateCards = (): CardType[] => {
  // Создаем 8 "шаблонов" карт, используя индекс как временный ID пары
  const cardTemplates = EMOJIS.map((value, pairId) => ({
    pairId,
    value,
    isFlipped: false,
    isMatched: false,
  }));

  // Удваиваем шаблоны и присваиваем каждой карте уникальный id
  const allCards: CardType[] = cardTemplates.flatMap((template) => [
    { ...template, id: `${template.pairId}-a` },
    { ...template, id: `${template.pairId}-b` },
  ]);

  // Добавляем начальные состояния и перемешиваем
  const finalCards = allCards.map((card) => ({
    ...card,
    isFlipped: false,
    isMatched: false,
  }));

  return shuffleArray(finalCards);
};
