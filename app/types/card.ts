export interface CardType {
  id: number; // уникальный идентификатор пары + индекс
  value: string; // здесь можно emoji или имя иконки
  isFlipped: boolean; // открыт сейчас
  isMatched: boolean; // уже найден в паре
}
