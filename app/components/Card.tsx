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
      className={`w-full aspect-square rounded select-none cursor-pointer 
        border-2 ${isMatched ? 'border-green-500' : 'border-gray-400'} 
        ${isFlipped ? 'bg-white' : 'bg-blue-200'}
        dark:bg-gray-800 dark:border-gray-600 
        flex items-center justify-center text-3xl transition-transform duration-200
       ${!isFlipped && !isMatched ? 'hover:scale-105' : ''}`.replace(
        /\s+/g,
        ' ',
      )}>
      {isFlipped || isMatched ? value : ''}
    </div>
  );
}
