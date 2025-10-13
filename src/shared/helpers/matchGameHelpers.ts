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

const WORD_POOL: WordPair[] = [
  { left: "Яблоко", right: "Apple" },
  { left: "Машина", right: "Car" },
  { left: "Дом", right: "House" },
  { left: "Собака", right: "Dog" },
  { left: "Кошка", right: "Cat" },
  { left: "Солнце", right: "Sun" },
  { left: "Луна", right: "Moon" },
  { left: "Река", right: "River" },
  { left: "Гора", right: "Mountain" },
  { left: "Книга", right: "Book" },
  { left: "Стол", right: "Table" },
  { left: "Море", right: "Sea" },
  { left: "Ветер", right: "Wind" },
];

export function generateDynamicLevel(level: number, pairsCount: number = 5): LevelData {
  const shuffled = shuffle([...WORD_POOL]);
  const selected = shuffled.slice(0, pairsCount);

  return {
    id: Date.now(),
    level,
    pairs: selected,
  };
}




