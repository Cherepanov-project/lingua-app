export interface WordPair {
  left: string;
  right: string;
}

export interface GameLevel {
  level: number;
  pairs: WordPair[];
}

export const gameLevels: GameLevel[] = [
  {
    level: 1,
    pairs: [
      { left: "Яблоко", right: "Apple" },
      { left: "Машина", right: "Car" },
      { left: "Дом", right: "House" },
      { left: "Собака", right: "Dog" },
      { left: "Кошка", right: "Cat" },
    ],
  },
  {
    level: 2,
    pairs: [
      { left: "Вода", right: "Water" },
      { left: "Огонь", right: "Fire" },
      { left: "Земля", right: "Earth" },
      { left: "Воздух", right: "Air" },
      { left: "Дерево", right: "Tree" },
    ],
  },
  {
    level: 3,
    pairs: [
      { left: "Книга", right: "Book" },
      { left: "Стул", right: "Chair" },
      { left: "Стол", right: "Table" },
      { left: "Окно", right: "Window" },
      { left: "Дверь", right: "Door" },
    ],
  },
  {
    level: 4,
    pairs: [
      { left: "Солнце", right: "Sun" },
      { left: "Луна", right: "Moon" },
      { left: "Звезда", right: "Star" },
      { left: "Небо", right: "Sky" },
      { left: "Облако", right: "Cloud" },
    ],
  },
  {
    level: 5,
    pairs: [
      { left: "Рыба", right: "Fish" },
      { left: "Птица", right: "Bird" },
      { left: "Лошадь", right: "Horse" },
      { left: "Корова", right: "Cow" },
      { left: "Свинья", right: "Pig" },
    ],
  },
  {
    level: 6,
    pairs: [
      { left: "Красный", right: "Red" },
      { left: "Синий", right: "Blue" },
      { left: "Зеленый", right: "Green" },
      { left: "Желтый", right: "Yellow" },
      { left: "Черный", right: "Black" },
    ],
  },
  {
    level: 7,
    pairs: [
      { left: "Большой", right: "Big" },
      { left: "Маленький", right: "Small" },
      { left: "Быстрый", right: "Fast" },
      { left: "Медленный", right: "Slow" },
      { left: "Высокий", right: "Tall" },
    ],
  },
  {
    level: 8,
    pairs: [
      { left: "Еда", right: "Food" },
      { left: "Напиток", right: "Drink" },
      { left: "Хлеб", right: "Bread" },
      { left: "Молоко", right: "Milk" },
      { left: "Мясо", right: "Meat" },
    ],
  },
  {
    level: 9,
    pairs: [
      { left: "Семья", right: "Family" },
      { left: "Мать", right: "Mother" },
      { left: "Отец", right: "Father" },
      { left: "Сестра", right: "Sister" },
      { left: "Брат", right: "Brother" },
    ],
  },
  {
    level: 10,
    pairs: [
      { left: "Школа", right: "School" },
      { left: "Учитель", right: "Teacher" },
      { left: "Ученик", right: "Student" },
      { left: "Урок", right: "Lesson" },
      { left: "Домашнее задание", right: "Homework" },
    ],
  },
];
