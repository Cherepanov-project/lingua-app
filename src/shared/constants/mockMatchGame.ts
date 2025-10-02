export interface WordPair {
  russian: string;
  english: string;
}

export interface GameLevel {
  level: number;
  pairs: WordPair[];
}

export const gameLevels: GameLevel[] = [
  {
    level: 1,
    pairs: [
      { russian: "Яблоко", english: "Apple" },
      { russian: "Машина", english: "Car" },
      { russian: "Дом", english: "House" },
      { russian: "Собака", english: "Dog" },
      { russian: "Кошка", english: "Cat" },
    ],
  },
  {
    level: 2,
    pairs: [
      { russian: "Вода", english: "Water" },
      { russian: "Огонь", english: "Fire" },
      { russian: "Земля", english: "Earth" },
      { russian: "Воздух", english: "Air" },
      { russian: "Дерево", english: "Tree" },
    ],
  },
];
