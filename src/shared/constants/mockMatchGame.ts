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
  {
    level: 3,
    pairs: [
      { russian: "Книга", english: "Book" },
      { russian: "Стул", english: "Chair" },
      { russian: "Стол", english: "Table" },
      { russian: "Окно", english: "Window" },
      { russian: "Дверь", english: "Door" },
    ],
  },
  {
    level: 4,
    pairs: [
      { russian: "Солнце", english: "Sun" },
      { russian: "Луна", english: "Moon" },
      { russian: "Звезда", english: "Star" },
      { russian: "Небо", english: "Sky" },
      { russian: "Облако", english: "Cloud" },
    ],
  },
  {
    level: 5,
    pairs: [
      { russian: "Рыба", english: "Fish" },
      { russian: "Птица", english: "Bird" },
      { russian: "Лошадь", english: "Horse" },
      { russian: "Корова", english: "Cow" },
      { russian: "Свинья", english: "Pig" },
    ],
  },
  {
    level: 6,
    pairs: [
      { russian: "Красный", english: "Red" },
      { russian: "Синий", english: "Blue" },
      { russian: "Зеленый", english: "Green" },
      { russian: "Желтый", english: "Yellow" },
      { russian: "Черный", english: "Black" },
    ],
  },
  {
    level: 7,
    pairs: [
      { russian: "Большой", english: "Big" },
      { russian: "Маленький", english: "Small" },
      { russian: "Быстрый", english: "Fast" },
      { russian: "Медленный", english: "Slow" },
      { russian: "Высокий", english: "Tall" },
    ],
  },
  {
    level: 8,
    pairs: [
      { russian: "Еда", english: "Food" },
      { russian: "Напиток", english: "Drink" },
      { russian: "Хлеб", english: "Bread" },
      { russian: "Молоко", english: "Milk" },
      { russian: "Мясо", english: "Meat" },
    ],
  },
  {
    level: 9,
    pairs: [
      { russian: "Семья", english: "Family" },
      { russian: "Мать", english: "Mother" },
      { russian: "Отец", english: "Father" },
      { russian: "Сестра", english: "Sister" },
      { russian: "Брат", english: "Brother" },
    ],
  },
  {
    level: 10,
    pairs: [
      { russian: "Школа", english: "School" },
      { russian: "Учитель", english: "Teacher" },
      { russian: "Ученик", english: "Student" },
      { russian: "Урок", english: "Lesson" },
      { russian: "Домашнее задание", english: "Homework" },
    ],
  },
];
