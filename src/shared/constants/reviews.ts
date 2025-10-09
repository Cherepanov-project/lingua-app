interface Review {
  id: number;
  name: string;
  avatar?: string;
  text: string;
  date: string;
  stars: number;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Александр Черепанов",
    text: "Отличная платформа для тех, кто хочет улучшить свой английский",
    date: "2 дня назад",
    stars: 5,
  },
  {
    id: 2,
    name: "Егор Петров",
    text: "Даже не знаю что сказать",
    date: "4 дня назад",
    stars: 4,
  },
];
