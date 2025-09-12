/**
 * Перемешивает массив в случайном порядке, используя алгоритм Фишера-Йейтса.
 * @param array Исходный массив для перемешивания.
 * @returns Новый массив с перемешанными элементами.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
