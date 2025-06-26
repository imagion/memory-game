import { CardType } from '@/types/card';

interface Props {
  card: CardType;
  onClick: () => void;
}

export default function Card({ card, onClick }: Props) {
  const { isFlipped, isMatched, value } = card;
  return (
    <div
      onClick={onClick}
      className={`
        w-full aspect-square select-none cursor-pointer rounded
        border-2 ${isMatched ? 'border-green-500' : 'border-gray-300'}
        ${isFlipped ? 'bg-white' : 'bg-blue-200'}
        flex items-center justify-center text-2xl font-bold
        transition-transform duration-200
        ${!isFlipped && !isMatched ? 'hover:scale-105' : ''}
      `}>
      {isFlipped || isMatched ? value : ''}
    </div>
  );
}
