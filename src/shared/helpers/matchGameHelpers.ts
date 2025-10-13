import shuffle from "lodash.shuffle";

export interface WordPair {
  left: string;
  right: string;
}

export interface LevelData {
  id: number;
  level: number;
  pairs: WordPair[];
}
export const WORD_POOL: WordPair[] = [
  { left: 'Яблоко', right: 'Apple' },
  { left: 'Машина', right: 'Car' },
  { left: 'Дом', right: 'House' },
  { left: 'Собака', right: 'Dog' },
  { left: 'Кошка', right: 'Cat' },
  { left: 'Солнце', right: 'Sun' },
  { left: 'Луна', right: 'Moon' },
  { left: 'Река', right: 'River' },
  { left: 'Гора', right: 'Mountain' },
  { left: 'Книга', right: 'Book' },
  { left: 'Стол', right: 'Table' },
  { left: 'Море', right: 'Sea' },
  { left: 'Ветер', right: 'Wind' },
];


export function generateDynamicLevel(level: number, pairsCount: number = 5, wordPool?: WordPair[]): LevelData {
  const sourcePool = wordPool && wordPool.length > 0 ? wordPool : WORD_POOL;

  const shuffled = shuffle([...sourcePool]);
  const selected = shuffled.slice(0, pairsCount);


  return {
    id: Date.now(),
    level,
    pairs: selected,
  };
}




